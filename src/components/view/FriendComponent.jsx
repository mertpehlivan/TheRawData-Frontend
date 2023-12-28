import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'

export default function FriendComponent({fullname,imageUrl}) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <Avatar  src="https://baligongbuckettest.s3.eu-west-1.amazonaws.com/33416397-7424-4094-af66-05e12283ea95.png" sx={{width:"25px",height:"25px",zIndex:2}}/>
        <Typography variant='body2'>{fullname}</Typography>
    </Stack>
  )
}
