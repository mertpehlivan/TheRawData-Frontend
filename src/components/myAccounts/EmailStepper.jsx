import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
import VerificationInput from 'react-verification-input';
import { useState } from 'react';
import { useUserContext } from '../../hooks/AuthProvider';
import { Refresh } from '@mui/icons-material';

const EmailCode = () => {
    const [code, setCode] = useState("")
    const {user} = useUserContext()
    
    return (
        <Stack spacing={1} m={2}>
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
            <Stack direction="row" spacing={1}>
                <Button disabled={code.length < 6} variant='outlined' color='success'>Confirm</Button>
                <Button startIcon={<Refresh/>} color='error'>send again</Button>
            </Stack>

        </Stack>
    )
}






const steps = [
    {
        label: 'Are you sure you want to change your email address?',
        description: `Before changing your email address, you will need to enter the code that comes to your current email address.`,
    },
    {
        label: 'Confirmation code sent to e-mail address',
        description: <EmailCode />,
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
];
function EmailStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [confirm,setConfirm] = useState(false)
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
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        disabled={activeStep == 1 && confirm === false}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
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

export default EmailStepper
