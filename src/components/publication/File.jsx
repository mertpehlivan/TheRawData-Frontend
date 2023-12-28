import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import DataBox from './DataBox'

export default function File() {
  return (
    <Stack border="1px solid" borderColor="primary.main" borderRadius={3}>
        <Typography  mt={2} textAlign="center">Load-Displacement files</Typography>
        <Divider sx={{m:2}}/>
        <Stack spacing={1} alignItems="center" direction="row" flexWrap="wrap">
            <DataBox/>
            <DataBox/>       
            <DataBox/>
            <DataBox/>
              
        </Stack>
               
    </Stack>
  )
}
