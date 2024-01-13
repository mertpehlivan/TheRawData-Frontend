import { Icon } from '@iconify/react';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUserBox } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';
import { useDispatch } from 'react-redux';
import { update } from '../../store/userSlice';

export default function UserComponent() {
  const [user, setUser] = useState({
    id:null,
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    image:""
  });

  const [loading, setLoading] = useState(true);

  const { token } = useUserContext();
  const dispatch = useDispatch()

  useEffect(() => {
    getUserBox(token)
      .then((res) => {
        console.log(res.data);
        dispatch(update({data:res.data}))
        setUser({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          country: res.data.country,
          image: res.data.profileImageName
        });
      })
      .catch(() => { })
      .finally(() => {
        setLoading(false); 
      });
  }, [token]);

  return (
    <Stack direction="row" spacing={2} bgcolor="background.default" borderRadius={3} p={2}>
      {loading ? (
        <Skeleton variant="circular" width={50} height={50} />
      ) : (
        <Avatar src={`http://localhost:8080/api/v1/auth/profileImage/${user.image}`} sx={{ width: '50px', height: '50px' }} />
      )}

      <Stack>
        <Typography variant="h6">
          {loading ? <Skeleton width={100} /> : `${user.firstname} ${user.lastname}`}
        </Typography>
        <Typography color="gray" fontSize="sm">
          {loading ? <Skeleton width={80} /> : "Professor"}
        </Typography>
        <Typography color="gray">
          {loading ? <Skeleton width={200} /> : "in Civil Engineering Professor (Full)"}
        </Typography>
        <Typography color="gray">
          {loading ? <Skeleton width={250} /> : "at Erzincan Binali Yildirim University"}
        </Typography>
        <Stack direction="row">
          <Icon icon="mdi:location" />
          <Typography color="gray">
            {loading ? <Skeleton width={100} /> : user.country}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
