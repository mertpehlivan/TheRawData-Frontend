import { Box, Button, Container, CircularProgress, Grid, Stack, Typography, Link } from '@mui/material';
import React, { useState, useEffect } from 'react';
import VerificationInput from 'react-verification-input';
import '../styles/EmailVerification.css';
import { useUserContext } from '../hooks/AuthProvider';
import { sendCode } from '../services/emailCodeService';
import { useNavigate } from 'react-router-dom';
import { ForwardToInbox, MarkEmailRead } from '@mui/icons-material';
import NotificationPopover from '../components/view/NotificationPopover';
import EnvelopeBox from '../components/view/EnvelopeBox';
import { getInvitations } from '../services/notificationService';

function EmailVerificationPage() {
    const { setUser, user, token } = useUserContext();
    const [timer, setTimer] = useState(120); // Initial timer value in seconds
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [endMessagess, setEndMessages] = useState([])
    const navigate = useNavigate()

    const [page, setPage] = useState(0)
   
  
    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setIsResendEnabled(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleVerifyClick = () => {
        setLoading(true);
        sendCode(token, user.email, code).then(res => {
            setLoading(false);
            if (res.data) {
                setSuccess(true)
            } else {
                setErrorMessage("Code entered is not correct could not be verified");
            }
        }).catch(() => {
            setLoading(false);
            setErrorMessage("Code entered is not correct could not be verified");
        });
    }

    const handleResendClick = () => {

        setTimer(120); // Reset the timer
        setIsResendEnabled(false); // Disable resend button
    };

    return (
        <Container sx={{ mt: 15 }} maxWidth="sm">
            <Stack bgcolor="white" p={3} spacing={2} borderRadius={3}>
                {
                    !success ?
                        <>
                            <Stack direction="row" spacing={1}>
                                <ForwardToInbox sx={{ width: 35, height: 35, color: "primary.main" }} />
                                <Typography variant='h4' color="primary.main">Email Verification</Typography>
                            </Stack>

                            <Typography>
                                Please verify your e-mail address by entering the six-digit code sent to your e-mail <b>{user.email}</b>
                            </Typography>

                            <Stack direction="row" justifyContent="center" p={1}>
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
                            </Stack>
                            <Typography>{loading && <CircularProgress size={20} />}</Typography>
                            <Typography color="red"><b>{errorMessage}</b></Typography>

                            <Stack>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Button fullWidth color='info' variant='' disabled={!isResendEnabled || loading} onClick={handleResendClick}>
                                            {isResendEnabled ? 'Resend Code' : `Resend Code (${timer}s)`}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={handleVerifyClick} fullWidth variant='contained' disabled={loading}>
                                            Verify
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Stack>
                                    <Typography>
                                        {isResendEnabled ? '' : `You can resend the code in ${timer} seconds.`}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </> : <>{page == 0 &&
                            <Stack spacing={1}>
                                <Stack direction="row" spacing={1}>
                                    <MarkEmailRead sx={{ width: 35, height: 35, color: "primary.main" }} />
                                    <Typography color="primary.main" variant='h4'>
                                        Mail Verification Successful
                                    </Typography>

                                </Stack>
                                <Typography>Welcome to <Link>The Raw Data Library</Link> community <b>{user.firstname} {user.lastname}</b></Typography>
                                {endMessagess && <Button>{ }</Button>}
                                <Button href='/' variant='contained'>Explore research</Button>
                            </Stack>}

                        </>
                }
                {page == 1 &&
                    <Stack>
                    
                    </Stack>
                }


            </Stack>
        </Container>
    );
}

export default EmailVerificationPage;
