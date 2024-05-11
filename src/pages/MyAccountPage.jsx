import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useUserContext } from '../hooks/AuthProvider'
import { ArrowBack, ChangeCircle, PhotoCamera } from '@mui/icons-material';
import AvatarComponent from '../components/myaccount/AvatarComponent';
import EmailDialog from '../components/myAccounts/EmailDialog'
import UsernameDialog from '../components/myAccounts/UsernameDialog'
import PasswordDialog from '../components/myAccounts/PasswordDialog';
import CountryDialog from '../components/myAccounts/CountryDialog';
import { Link } from 'react-router-dom';

export default function MyAccount() {
    const { user } = useUserContext()
    const [showIcon, setShowIcon] = useState(false);
    const [emailChange, setEmailChange] = useState(false)
    const [usernameChange, setUsernameChange] = useState(false)
    const [passwordChange, setPasswordChange] = useState(false)
    const [countryChange, setCountryChange] = useState(false)


    const handleClickEmailChange = () => {
        setEmailChange(true);
    };
    const handleCloseEmailChange = () => {
        setEmailChange(false);
    };
    const handleClickUsernameChange = () => {
        setUsernameChange(true);
    };
    const handleCloseUsernameChange = () => {
        setUsernameChange(false);
    };
    const handleClickPasswordChange = () => {
        setPasswordChange(true);
    };
    const handleClosePasswordChange = () => {
        setPasswordChange(false);
    };
    const handleClickCountryChange = () => {
        setCountryChange(true);
    };
    const handleCloseCountryChange = () => {
        setCountryChange(false);
    };


    console.log(user)
    return (
        <>
            <PasswordDialog handleClickPassowordChange={handleClickPasswordChange} handleClosePassowordChange={handleClosePasswordChange} passowordChange={passwordChange} />
            <UsernameDialog handleClickUsernameChange={handleClickUsernameChange} handleCloseUsernameChange={handleCloseUsernameChange} usernameChange={usernameChange} />
            <EmailDialog handleClickEmailChange={handleClickEmailChange} handleCloseEmailChange={handleCloseEmailChange} emailChange={emailChange} />
            <CountryDialog handleClickCountryChange={handleClickCountryChange} handleCloseCountryChange={handleCloseCountryChange} countryChange={countryChange} />
            <Container maxWidth="md" sx={{ mt: 15 }}>

                <Grid container bgcolor="white" borderRadius={3} p={2} spacing={2} >
                    <Stack>
                        <Link to="/home">

                            <Button startIcon={<ArrowBack />} variant='outlined'>Back</Button></Link>
                    </Stack>
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
                                
                            </Stack>

                            <Divider></Divider>
                            <Typography variant='body2' color={"gray"}>
                                Password:
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography>****************</Typography>
                                <Button startIcon={<ChangeCircle />} variant='contained' onClick={handleClickPasswordChange}>Change Password</Button>
                            </Stack>

                            <Divider></Divider>
                            <Typography variant='body2' color={"gray"}>
                                Country:
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography>{user.country}</Typography>
                                <Button startIcon={<ChangeCircle />} variant='contained' onClick={handleClickCountryChange}>Change Country</Button>
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
