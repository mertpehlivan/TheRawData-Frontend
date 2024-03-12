import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function FriendComponent({fullname,imageUrl,uniqueName}) {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL
  
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <Avatar  src={`${API_BASE_URL}/api/v1/auth/profileImage/${imageUrl}`} sx={{width:"25px",height:"25px",zIndex:2}}/>
        {uniqueName && <Link to={`/users/${uniqueName}`}><Typography variant='body2'>{fullname}</Typography></Link>}
        {!uniqueName && <Typography variant='body2'>{fullname}</Typography>}
    </Stack>
  )
}
