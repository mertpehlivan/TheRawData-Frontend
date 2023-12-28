import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Prw from '../../assets/image.jpg'

export default function DataBox() {
  return (
    <Stack spacing={1} p={1} maxWidth={250} justifyContent="center" borderRadius={3} boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
      <Typography variant='h5'>C1</Typography>
      <Box width={250} height={200} component="img" src={Prw}/>
      <Typography>Measurements of the stiffness of beams during an earthquake, including standard deviation</Typography>
    </Stack>
  )
}
