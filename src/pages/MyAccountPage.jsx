import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useUserContext } from '../hooks/AuthProvider'
import { ChangeCircle, PhotoCamera } from '@mui/icons-material';
import AvatarComponent from '../components/myaccount/AvatarComponent';
import EmailDialog from '../components/myAccounts/EmailDialog'

export default function MyAccount() {
    const { user } = useUserContext()
    const [showIcon, setShowIcon] = useState(false);
    const [emailChange, setEmailChange] = useState(false)



    const handleClickEmailChange = () => {
        setEmailChange(true);
    };
    const handleCloseEmailChange = () => {
        setEmailChange(false);
    };



    console.log(user)
    return (
        <>
            <EmailDialog handleClickEmailChange={handleClickEmailChange} handleCloseEmailChange={handleCloseEmailChange} emailChange={emailChange}/>
            <Container maxWidth="md" sx={{ mt: 15 }}>

                <Grid container bgcolor="white" borderRadius={3} p={2} spacing={2} >

                    <Grid item xs="12" >
                        <AvatarComponent />
                    </Grid>
                    <Grid item xs="12" alignItems="center" justifyContent="center" >

                        <Stack mx={5} padding={5} border="1px solid" spacing={1} borderRadius={3} borderColor="primary.main">
                            <Typography variant='body2' color={"primary.main"}>
                                Full Name:
                            </Typography>
                            <Typography>{user.firstname} {user.lastname}</Typography>
                            <Divider></Divider>
                            <Typography variant='body2' color={"gray"}>
                                E-mail:
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography>{user.email}</Typography>
                                <Button startIcon={<ChangeCircle />} variant='contained' onClick={handleClickEmailChange}>Change E-mail</Button>
                            </Stack>

                            <Divider></Divider>
                            <Typography variant='body2' color={"gray"}>
                                Username:
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography>{user.uniqueName}</Typography>
                                <Button startIcon={<ChangeCircle />} variant='contained'>Change Username</Button>
                            </Stack>

                            <Divider></Divider>
                            <Typography variant='body2' color={"gray"}>
                                Password:
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography>****************</Typography>
                                <Button startIcon={<ChangeCircle />} variant='contained'>Change Password</Button>
                            </Stack>

                            <Divider></Divider>
                            <Typography variant='body2' color={"gray"}>
                                Country:
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography>{user.country}</Typography>

                            </Stack>

                            <Divider></Divider>

                        </Stack>
                    </Grid>

                </Grid>
                <Stack justifyContent="center" >



                </Stack>

            </Container>
        </>
    )
}
