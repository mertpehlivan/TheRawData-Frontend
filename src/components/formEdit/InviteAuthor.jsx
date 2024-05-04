import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { invite } from '../../services/userAuthentication';
import { Dangerous } from '@mui/icons-material';

function InviteAuthor({ onInvite, setInviteBox }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [invitationDetails, setInvitationDetails] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: ''
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

    invite(invitationDetails)
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
          setMessage('An error occurred.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Stack maxWidth={400} p={3} spacing={1} border="1px solid" borderRadius={3}>
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
              label="Firstname"
              name="firstname"
              value={invitationDetails.firstname}
              onChange={handleChange}
            />
            <TextField
              size="small"
              type="text"
              label="Lastname"
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
            <Dangerous color="error" />
            <Typography color="error">{message}</Typography>
          </Stack>

          <Button variant="outlined" onClick={handleClick}>
            Invite
          </Button>
        </>
      )}
    </Stack>
  );
}

export default InviteAuthor;
