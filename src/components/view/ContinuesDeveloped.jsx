import React from 'react';
import { Stack, Typography } from '@mui/material';
import { IntegrationInstructions } from '@mui/icons-material';
// Example component, adjust according to your project

export default function ContinuesDeveloped() {
    return (
        <Stack>
            <Stack direction="row">
                <IntegrationInstructions />
                <Typography variant='h5'>Continues to be Developed</Typography>
            </Stack>

            <Typography>The software for this page is still under development and we apologize for the delay.</Typography>
            <Typography>It is expected to be completed by October.</Typography>
        </Stack>
    )
}
