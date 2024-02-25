import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { changeUsername } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';
import { Circle } from '@mui/icons-material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function UsernameDialog({ handleClickUsernameChange, handleCloseUsernameChange, usernameChange }) {
    const [username,setUsername] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const {user,token} = useUserContext()
    const [loading,setLoading] = useState(false)
    const changeUsernameFatch = async()=>{
        try {
            setLoading(true)
            const response = await changeUsername(token,username)
            window.location.reload(false)
        } catch (error) {
            setErrorMessage(error.response.data)
        } finally {
            setLoading(false)
        }
    }
    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={handleCloseUsernameChange}
                aria-labelledby="customized-dialog-title"
                open={usernameChange}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Username change
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseUsernameChange}
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
                        <Typography>You're about to change your username. Please enter your new username and confirm it. Your username must be unique and must be greater than 6 letters.</Typography>
                        <TextField fullWidth size='small' placeholder='alex434,helloworld,etc...' onChange={(e)=>setUsername(e.target.value)}/>
                        <Typography>{errorMessage}</Typography>
                        <Button startIcon={()=>{return loading && <CircularProgress/>}} variant='contained' onClick={changeUsernameFatch} disabled={username.length <= 0 || username.length < 6 || loading}>Change</Button>
                    </Stack>

                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
