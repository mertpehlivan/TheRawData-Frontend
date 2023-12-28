import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import PdfImage from '../../assets/pdfkapak.webp'
export default function PdfButton() {
  return (
    <Stack>
        <Box border="1px solid" width={100} height={160} component="img" src={PdfImage}/>
        
        <Button>Download</Button>            
    </Stack>
  )
}
