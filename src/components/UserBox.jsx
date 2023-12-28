import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import ProfilePhoto from '../assets/logo192.png'
export default function UserBox() {
  return (
    <Stack width={"400px"} direction="row" alignItems="center" bgcolor="background.default">
        <Avatar src={ProfilePhoto} alt='profil'/>
        <Typography>User Name</Typography>
    </Stack>
  )
}
