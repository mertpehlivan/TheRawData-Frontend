import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InfoButton from '../button/InfoButton'
import EndPaymentInfo from './EndPaymentInfo';
import ContinuesDeveloped from './ContinuesDeveloped';
function PaymentView() {
    return (
        <Stack bgcolor="white" borderRadius={2} p={1}>
            <ContinuesDeveloped/>
            <Typography variant='h6' color={"primary.main"} textAlign="center">SUMMARY OF DATA OWNER SAVING PANEL</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center">
                <BusinessCenterIcon sx={{ width: 35, height: 35, color: "primary.main" }} />
                <Typography variant='h5' justifyContent="center">50$</Typography>
                <InfoButton text="Current Balance"/>
                <Divider/>
            </Stack>
            
            <Typography variant='h6'>Last sold data</Typography>
            <Stack p={1}>
                <Stack spacing={1}>
                    <EndPaymentInfo fullname="C1" amount="+10$"/>
                   
                    <Button>See Detail</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PaymentView
