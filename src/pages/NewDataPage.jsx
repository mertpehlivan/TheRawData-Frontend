import { Button, Container, IconButton, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NewDataStepper from '../components/NewDataStepper'
import DataTypeForm from '../components/form/DataTypeForm'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import AlertDialog from '../components/view/AlertDialog'
import { ArrowBack, BackHand } from '@mui/icons-material'
import { decrease, format } from '../store/pageNumberSlice'
import { clearData } from '../store/dataSlice'
import { clearType } from '../store/newDataTypeSlice'
import { clearRawData } from '../store/rawDataSlice'


export default function NewDataPage() {
    const pageNumber = useSelector((state) => state.pageNumber.value)
    const dispacth = useDispatch();
    const navigate = useNavigate()
    const handlerCancel = () => {
        dispacth(format())
        dispacth(clearData())
        dispacth(clearType())
        dispacth(clearRawData())
    }
    useEffect(() => {
        return () => {
            handlerCancel()  
        };
    }, []);
    

    return (

        <Container
            maxWidth="md"
            sx={{mt:15,p:2}}
        >

            <Stack>
                <NewDataStepper />
            </Stack>
            
            <Stack
                mt={2}
                p={2}
                bgcolor='background.default'
                borderRadius={5}
            >   
                <Stack justifyContent="start" alignItems="start" > 
                    {pageNumber != 3 && <Button disabled={pageNumber === 0 } onClick={()=>dispacth(decrease())} variant='contained' startIcon={<ArrowBack/>}>Back</Button>}
                </Stack>
                
                <DataTypeForm />
                
            </Stack>
            
        </Container>
    )
}
