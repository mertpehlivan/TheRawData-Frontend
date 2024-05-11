import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { invite } from '../../services/userAuthentication';
import { Dangerous, PersonAdd } from '@mui/icons-material';
import { useUserContext } from '../../hooks/AuthProvider';

function InviteAuthor({ onInvite, setInviteBox }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {token} = useUserContext()
  const [invitationDetails, setInvitationDetails] = useState({
    id: '',
    firstname: '',
    lastname: '',
    username:'invite',
    email: '',
    profileImageName: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvitationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  useEffect(() => {
    // This code will run after the state has been updated
    console.log(invitationDetails);
  }, [invitationDetails]); // Only run this effect when invitationDetails changes

  const handleClick = () => {
    setLoading(true);
    setMessage('');

    invite(invitationDetails,token)
      .then((response) => {
        console.log(response.data);
        setInvitationDetails((prevDetails) => ({
          ...prevDetails,
          id: response.data
        }));
        onInvite({ ...invitationDetails, id: response.data });
        setInviteBox(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
          setMessage(error.response.data.message);
        } else {
          
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Stack maxWidth={400} p={3} spacing={1}>
      {loading ? (
        <Stack justifyContent="center">
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Stack direction={'row'} spacing={1}>
            <TextField
              size="small"
              type="text"
              label="First name"
              name="firstname"
              value={invitationDetails.firstname}
              onChange={handleChange}
            />
            <TextField
              size="small"
              type="text"
              label="Last name"
              name="lastname"
              value={invitationDetails.lastname}
              onChange={handleChange}
            />
          </Stack>
          <TextField
            size="small"
            type="email"
            label="Email"
            name="email"
            value={invitationDetails.email}
            onChange={handleChange}
          />
          <Stack direction="row">
            { message && <Dangerous color="error" />}
            <Typography color="error">{message}</Typography>
          </Stack>

          <Button startIcon={<PersonAdd/>} variant="contained" onClick={handleClick}>
            Invite
          </Button>
        </>
      )}
    </Stack>
  );
}

export default InviteAuthor;
