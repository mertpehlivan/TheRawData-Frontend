import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function EndPaymentInfo({ fullname, amount }) {
    return (
        <Stack direction="row"
            border="1px solid"
            borderColor="primary.main"
            borderRadius={1}
            justifyContent="space-around"
        >
            <Typography>{fullname}</Typography>
            <Typography color={amount[0] === "-" ? "red" : "blue"}>{amount}</Typography>
            <Typography>02.11.2023</Typography>
        </Stack>
    )
}
