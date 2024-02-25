
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CircularProgress, Stack, TextField } from '@mui/material';
import VerificationInput from 'react-verification-input';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../hooks/AuthProvider';
import { Refresh } from '@mui/icons-material';
import { sendCode, sendEmailCode } from '../../services/emailCodeService';
import NewEmail from './NewEmail';

const EmailCode = ({ success, setSuccess }) => {
    const [code, setCode] = useState("")
    const { setUser, user, token } = useUserContext()
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60); // Initial timer value in seconds
    const [isResendEnabled, setIsResendEnabled] = useState(false);
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

    const sendAgian = async (email) => {
        try {
            setTimer(60)
            setLoading(true)
            await sendEmailCode(token, email);
            setLoading(false)
        } catch (error) {
            console.error(error)
        }

    }

    const handleVerifyClick = async () => {
        setLoading(true);
        await sendCode(token, user.email, code).then(res => {
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

    useEffect(() => {
        const sendEmailCodeFetch = async () => {

            try {
                setLoading(true)
                const response = await sendEmailCode(token, user.email);
                console.log("Mail send")
            } catch (error) {

            } finally {
                setLoading(false)
            }

        }
        sendEmailCodeFetch();
    }, []);
    if (loading) {
        return (
            <Stack justifyContent="center" alignItems="center" p={1}>
                <CircularProgress />
            </Stack>
        )
    }
    return (
        <Stack spacing={1} m={2}>

            {!success && <Stack spacing={1} >
                <Typography>Enter the code sent to <b>{user.email}</b> email address.</Typography>
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
                <Typography color="error">{errorMessage}</Typography>
                <Stack direction="row" spacing={1}>
                    <Button onClick={handleVerifyClick} disabled={code.length < 6} variant='outlined' color='success'>Confirm</Button>
                    <Button fullWidth color='info' variant='' disabled={!isResendEnabled || loading} onClick={()=>sendAgian(user.email)}>
                        {isResendEnabled ? 'Resend Code' : `Resend Code (${timer}s)`}
                    </Button>
                </Stack>

            </Stack>
            }

        </Stack>
    )
}








function EmailStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [confirm, setConfirm] = useState(false)
    const [success, setSuccess] = useState(false)
    const steps = [
        {
            label: 'Are you sure you want to change your email address?',
            description: `Before changing your email address, you will need to enter the code that comes to your current email address.`,
        },
        {
            label: 'Confirmation code sent to e-mail address',
            description: <EmailCode success={success} setSuccess={setSuccess} />,
        },
        {
            label: 'New E-mail',
            description: <NewEmail success={success} setSuccess={setSuccess} />
        },
    ];





    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    {!(index === steps.length - 1) && <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        disabled={activeStep == 1 && success === false}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>}
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default EmailStepper;
