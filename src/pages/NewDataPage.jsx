import { Button, Container, Stack } from '@mui/material'
import React, { useState } from 'react'
import NewDataStepper from '../components/NewDataStepper'
import DataTypeForm from '../components/form/DataTypeForm'
import { useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import AlertDialog from '../components/view/AlertDialog'

export default function NewDataPage() {
    const pageNumber = useSelector((state) => state.pageNumber.value)
    return (

        <Container
            maxWidth="md"

        >

            <Stack>
                <NewDataStepper />
            </Stack>
            <Stack
                mt={2}
                bgcolor='background.default'
                borderRadius={5}
            >
                <DataTypeForm />
                <Stack
                    direction='row'
                    justifyContent="flex-end"
                    my={4}
                    px={4}
                    spacing={2}
                >

                </Stack>
            </Stack>
        </Container>
    )
}
