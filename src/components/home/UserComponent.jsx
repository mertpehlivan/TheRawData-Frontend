import { Icon } from '@iconify/react';
import { Avatar, Button, CircularProgress, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUserBox } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';
import { useDispatch } from 'react-redux';
import { update } from '../../store/userSlice';
import { createUniversity } from '../../services/universityService';
import axios from 'axios';

export default function UserComponent() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [universityLoading,setUniversityLoading] =useState(false)

  


  const { token, user } = useUserContext();
  const dispatch = useDispatch()
  const sliceTre = (string) => {
    if (string) {
      const str = ""
      let index = string.split("-"); // " - " ifadesinin bitiş konumu
      let result = index[1]
      console.log(result)
      return result
    } else {
      return ""
    }
  }
  return (
    <Stack direction="row" spacing={2} bgcolor="background.default" borderRadius={3} p={2}>
      {loading ? (
        <Skeleton variant="circular" width={50} height={50} />
      ) : (
        <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${user.profileImageName}`} sx={{ width: '50px', height: '50px' }} />
      )}

      <Stack spacing={1}>
        <Stack>
          
          <Typography variant="h6">
            {loading ? <Skeleton width={100} /> : `${user.firstname} ${user.lastname}`}

          </Typography>
          <Typography variant='body1' bgcolor="primary.main" color="white" borderRadius={3} px={1}>
            {`@${user.uniqueName}`}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>

          {loading ? <Skeleton width={15} /> : <img
            loading="lazy"
            width="20"
            height="15"
            srcSet={`https://flagcdn.com/w40/${sliceTre(user.country).toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${sliceTre(user.country).toLowerCase()}.png`}
            alt=""
          />}
          <Typography color="gray">

            {loading ? <Skeleton width={100} /> : user.country}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
