import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function NewDataStepper() {
    const steps = [
        "Publication type","New Data Info","Upload Raw Data"
    ]
    const pageNumber = useSelector((state)=>state.pageNumber.value)
  return (
    <Stepper activeStep={pageNumber} alternativeLabel>
        {steps.map((label) => (
            <Step key={label}>
            <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>
  )
}
