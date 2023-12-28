import { Avatar, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function InvitationBox() {
  return (
    <Stack spacing={2}>
        <Stack direction="row" p={2} spacing={1}>
            <Stack>
            <Avatar sx={{width:"20px",height:"20px"}}/>
            <Typography fontSize="9px"><Link>Ahmet Çetinkaya</Link> added you to the company test report titled Share Values</Typography>
            </Stack>
            
            <Stack>
                <Button sx={{height:"25px",fontSize:"9px"}} variant='contained' color='success' size='small'>admit it</Button>
                <Button sx={{height:"25px",fontSize:"9px"}} size='small'>reject</Button>
            </Stack>
            
        </Stack>

    </Stack>
  )
}
