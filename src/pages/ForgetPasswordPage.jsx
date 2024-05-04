import { Backdrop, Box, Button, CircularProgress, Container, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Logo from "../assets/logo.svg"
import { ArrowBack, Home, Login, NoBackpack, Send } from '@mui/icons-material'
import VerificationInput from 'react-verification-input'
import { changePassword, sendCodeForget, verificationForgetCode } from '../services/forgetpasswordService'
import { Link } from 'react-router-dom'

function ForgetPasswordPage() {
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [count, setCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("")
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async () => {
        // Burada şifreleri kontrol edebilir ve gerekli işlemleri gerçekleştirebilirsiniz
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else {
            const response = await changePassword(email, code, newPassword)
            setPage(3)
            setErrorMessage('');
            // Örneğin, şifreleri bir API'ye gönderebilirsiniz
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            if (count > 0) {
                const counter = count - 1;
                setCount(counter);
            } else {
                return
            }


        }, 1000);
        return () => clearTimeout(timer);
    }, [count]);


    const verficationCode = async () => {
        try {
            setLoading(true)
            const response = await verificationForgetCode(email, code);
            setPage(2)
            setErrorMessage("")
        } catch (error) {
            setErrorMessage(error.response)
        } finally {
            setLoading(false)
        }
    }
    const sendRepeat = async () => {
        try {
            setCount(60)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const sendCode = async () => {
        try {
            setLoading(true)
            const response = await sendCodeForget(email)
            setPage(1)
            setErrorMessage("")
        } catch (error) {
            setErrorMessage(error.response)
        } finally {
            setLoading(false)
        }
    }
    const sendCodeAgain = async () => {
        try {
            setLoading(true)
            const response = await sendCodeForget(email)
            setCount(60)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <Container maxWidth="sm">
            <Stack bgcolor="white" p={2} mt={2} borderRadius={3} spacing={2}>
                <Stack alignItems="center">
                    <Box
                        component="img"
                        src={Logo}
                        width={200}
                    />
                    <Divider />
                </Stack>
                {page != 3 &&
                    <Stack>

                        <Stack spacing={1}>
                            <Typography variant='h4' color="primary.main">Forget Password</Typography>
                            <Typography>If you have forgotten your password, please enter your e-mail address here. You can then set a new password by confirming the verification code sent to you.</Typography>
                        </Stack>
                        <Divider />
                    </Stack>
                }
                {loading &&
                    <Stack justifyContent="center" alignItems="center" p={3}>
                        <CircularProgress />
                    </Stack>

                }
                {
                    page == 0 && !loading &&
                    <Stack key={0} spacing={1}>
                        <Typography variant='h6' color="pirmary.main"> Your current e-mail address</Typography>
                        <TextField size='small' placeholder='rawdata@xyz.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errorMessage && (
                            <Typography>{errorMessage.data}</Typography>
                        )}
                        <Button onClick={sendCode} startIcon={<Send />} variant='contained'>Send code</Button>
                    </Stack>
                }
                {
                    page == 1 && !loading &&
                    <Stack key={1} spacing={2}>

                        <Stack spacing={1} justifyContent="center" alignItems="center">
                            <Typography variant='h6'>Email Verfication Code</Typography>
                            <VerificationInput
                                value={code}
                                onChange={(value) => (setCode(value))}
                                classNames={{
                                    container: "container",
                                    character: "character",
                                    characterInactive: "character--inactive",
                                    characterSelected: "character--selected",
                                    characterFilled: "character--filled",
                                }}
                            />
                            {errorMessage && (
                                <Typography>{errorMessage.data}</Typography>
                            )}
                            <Button disabled={count != 0} onClick={sendCodeAgain}> Send the code again {count != 0 && count}</Button>
                        </Stack>
                        <Stack justifyContent="space-between" direction="row">
                            <Button onClick={() => setPage(0)} startIcon={<ArrowBack />} color='info' variant='outlined'>Change E-mail</Button>
                            <Link><Button color='error' variant='outlined'>Cancel</Button></Link>
                            <Button onClick={verficationCode} startIcon={<Send />} variant='contained'>Verify code</Button>

                        </Stack>

                    </Stack>
                }
                {
                    page == 2 && !loading &&
                    <Stack key={2} spacing={1}>

                        <TextField
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            fullWidth
                            margin="normal"
                        />
                        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>

                    </Stack>
                }
                {
                    page == 3 && !loading &&
                    <Stack key={2} spacing={1} alignItems="center">

                        <Typography variant='h5'>Password change process Successful</Typography>
                        <Stack direction="row"  justifyContent="space-between" spacing={1}>
                            <Link to={"/login"}><Button startIcon={<Login />} variant='contained'>Go login</Button></Link>
                            <Link to={"/"}><Button startIcon={<Home />} variant='contained'>Go home</Button></Link>
                        </Stack>


                    </Stack>
                }
            </Stack>
        </Container>
    )
}

export default ForgetPasswordPage
