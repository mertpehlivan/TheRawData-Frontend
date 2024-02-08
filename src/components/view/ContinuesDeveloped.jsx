import { IntegrationInstructions } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function ContinuesDeveloped() {
  
    return (
        <Stack>
            <Stack direction="row">
                <IntegrationInstructions />
                <Typography variant='h5'>Continues to be Developed</Typography>
            </Stack>

            <Typography>The software for this page is still under development and we apologise for the delay.</Typography>
        </Stack>
    )
}
