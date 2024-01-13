import { Avatar, Box, Button, Container, Grid, IconButton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useUserContext } from '../hooks/AuthProvider'
import { PhotoCamera } from '@mui/icons-material';
import AvatarComponent from '../components/myaccount/AvatarComponent';

export default function MyAccount() {
    const { user } = useUserContext()
    const [showIcon, setShowIcon] = useState(false);
    return (
        <Container maxWidth="md" sx={{ mt: 15 }}>
            <Grid container bgcolor="white" borderRadius={3} p={2} spacing={2}>
                <Grid item xs="12" >
                    <AvatarComponent/>
                </Grid>
                <Grid item xs="12" alignItems="center" justifyContent="center">
                    <Stack direction="row" spacing={5} alignItems="center" justifyContent="center">
                        <TextField defaultValue={user.firstname} />
                        <TextField defaultValue={user.lastname} />
                    </Stack>

                </Grid>
                <Grid item xs="12">
                    <Stack spacing={2} sx={{ mx: 23.5 }}>
                        <TextField label="password" />
                    </Stack>
                </Grid>
                <Grid item xs="12">
                    <Stack spacing={2} sx={{ mx: 23.5 }}>
                        <TextField label="password" />
                    </Stack>
                </Grid>
                <Grid item xs="12">
                    <Stack spacing={2} sx={{ mx: 23.5 }}>
                        <TextField label="password" />
                    </Stack>
                </Grid>
                <Grid item xs="12">
                    <Stack spacing={2} sx={{ mx: 23.5, mb: 5 }}>
                        <Button variant='contained'>Save</Button>
                    </Stack>
                </Grid>
            </Grid>
            <Stack justifyContent="center" >



            </Stack>

        </Container>
    )
}
