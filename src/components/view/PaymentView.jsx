import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InfoButton from '../button/InfoButton'
import EndPaymentInfo from './EndPaymentInfo';
function PaymentView() {
    return (
        <Stack bgcolor="white" borderRadius={2} p={1}>
            <Typography variant='h6' color={"primary.main"} textAlign="center">ORDER PAYMENT PANEL</Typography>
            <Stack direction="row" alignItems="center" justifyContent="center">
                <BusinessCenterIcon sx={{ width: 35, height: 35, color: "primary.main" }} />
                <Typography variant='h5' justifyContent="center">50$</Typography>
                <InfoButton text="Current Balance"/>
                <Divider/>
            </Stack>
            
            <Typography variant='h6'>Recent Purchase Transactions</Typography>
            <Stack p={1}>
                <Stack spacing={1}>
                    <EndPaymentInfo fullname="Hasan Pehlivan" amount="-10$"/>
                    <EndPaymentInfo fullname="Uğur Kolcak" amount="+10$"/>
                    <EndPaymentInfo fullname="Hasan Pehlivan" amount="-10$"/>
                    <Button>And More</Button>
                    <Link variant='body1' textAlign="center">Withdraw Money</Link>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PaymentView
