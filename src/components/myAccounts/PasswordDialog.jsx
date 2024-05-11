import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress, InputAdornment, OutlinedInput, Stack, TextField } from '@mui/material';
import { changePassword, changeUsername } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function PasswordDialog({ handleClickPassowordChange, handleClosePassowordChange, passowordChange }) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [firstPassword, setFirstPassword] = useState("")
    const [lastPassword, setLastPassword] = useState("")
    const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(false)
    const [firstPasswordVisibility, setFirstPasswordVisibility] = useState(false)
    const [lastPasswordVisibility, setLastPasswordVisibility] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { user, token } = useUserContext()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setCurrentPassword("")
        setFirstPassword("")
        setLastPassword("")
        setCurrentPasswordVisibility(true)
        setFirstPasswordVisibility(true)
        setLastPasswordVisibility(true)
        setErrorMessage("");
    }, [passowordChange]);
    const visibility = (status) => {
        return status ? 'password' : 'text';
    }
    const visibilityIcon = (status) => {
        return status ? <VisibilityOff /> : <Visibility /> ;
    }
    const passwordsMatch = firstPassword === lastPassword ? false : true ;
    const changePasswordFatch = async () => {
        setErrorMessage("");
        try {
            setLoading(true)
            const response = await changePassword(token,{currentPassword,firstPassword,lastPassword});
            window.location.reload(false)
        } catch (error) {
            setErrorMessage(error.response.data)
        } finally {
            setLoading(false)
        }
    }
    const dissableButton = () => {
        if (currentPassword.length <= 0 || currentPassword.length < 6 || firstPassword.length <= 0 || firstPassword.length < 6 || lastPassword.length <= 0 || lastPassword.length < 6 || loading) {
            return false
        }
    }

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={handleClosePassowordChange}
                aria-labelledby="customized-dialog-title"
                open={passowordChange}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Password change
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClosePassowordChange}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>

                    <Stack padding={3} spacing={2}>
                        <Typography>You're about to change your password. Please enter your new password and confirm it. </Typography>
                        <Stack>
                            <Typography variant='body2'>Current Password:</Typography>
                            <OutlinedInput
                                type={visibility(currentPasswordVisibility)}
                                value={currentPassword}
                                onChange={(e)=>setCurrentPassword(e.target.value)}
                                size='small'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setCurrentPasswordVisibility(prev => !prev)}
                                            edge="end"
                                        >
                                            {currentPasswordVisibility ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="Current Password"
                                autoComplete="none"
                                
                            />
                        </Stack>

                        <Stack>
                            <Typography variant='body2'>New Password:</Typography>
                            <OutlinedInput
                                type={visibility(firstPasswordVisibility)}
                                fullWidth size='small'
                                placeholder='New Password'
                                onChange={(e) => setFirstPassword(e.target.value)}
                                value={firstPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setFirstPasswordVisibility(prev => !prev)}
                                            edge="end"
                                        >
                                            {firstPasswordVisibility ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Stack>
                        <Stack>
                        <Typography variant='body2'>Confirm Password:</Typography>
                            <OutlinedInput
                                type={visibility(lastPasswordVisibility)}
                                fullWidth size='small'
                                placeholder='Confirm Password'
                                value={lastPassword}
                                onChange={(e) => setLastPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setLastPasswordVisibility(prev => !prev)}
                                            edge="end"
                                        >
                                            {lastPasswordVisibility ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Stack>
                        <Typography color="error">{ passwordsMatch && "Your new password and confirm password must be the same"}</Typography>
                        
                        <Typography>{errorMessage}</Typography>
                        <Button startIcon={() => {loading && <CircularProgress /> }} variant='contained' onClick={changePasswordFatch}>Change</Button>
                    </Stack>

                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
