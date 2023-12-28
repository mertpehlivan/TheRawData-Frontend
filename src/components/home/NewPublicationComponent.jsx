import {  Avatar, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NewPublicationComponent() {
  return (
    <Stack bgcolor="background.default" spacing={2} p={2} borderRadius={3}>
        <Typography variant='h5'>New Publications</Typography>
        <Divider/>
        <Stack direction={"row"} spacing={1}>
            <Avatar sx={{width:"20px", height:"20px"}}/>
            <Typography><Link>Hasan Ali</Link> shared a new publication called <Link>the flight of birds</Link></Typography>
        </Stack>
        <Stack direction={"row"} spacing={1}>
            <Avatar sx={{width:"20px", height:"20px"}}/>
            <Typography><Link>Hasan Ali</Link> shared a new publication called <Link>the flight of birds</Link></Typography>
        </Stack>
        <Stack direction={"row"} spacing={1}>
            <Avatar sx={{width:"20px", height:"20px"}}/>
            <Typography><Link>Hasan Ali</Link> shared a new publication called <Link>the flight of birds</Link></Typography>
        </Stack>
    </Stack>
  )
}
