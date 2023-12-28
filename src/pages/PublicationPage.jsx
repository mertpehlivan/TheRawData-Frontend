import { Download } from '@mui/icons-material'
import { Backdrop, Box, Button, Chip, CircularProgress, Container, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

import File from '../components/publication/File'
import Pdf from '../assets/pdfkapak.webp'
import PdfButton from '../components/button/PdfButton'
export default function PublicationPage() {
  return (
    <Container sx={{pt:"25px"}} maxWidth="md">
        <Stack bgcolor="background.default" p={2} spacing={1} borderRadius={3}>
            <Stack>
                <Stack direction="row">
                    <Stack spacing={1}>
                        <Typography variant='h4'>
                            Investigation of the Structural Behavior of Reinforced Concrete Columns Produced With Natural Perlite 
                                under Cyclic Loading Test
                                
                        </Typography>
                        <Stack>
                            <Stack spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                                <Chip label="New" sx={{backgroundColor:"primary.main", color:"white"}}/>
                                <Chip label="Company Test Report"/>
                                <Typography variant='body2' color="gray">May 2023 - 4th International Symposium of Engineering Applications on</Typography>
                                
                            </Stack>
                            
                        </Stack>
                        
                    </Stack>
                    
                    
                    <Stack justifyContent="center">
                        <PdfButton/>
                    </Stack>
                </Stack>
                
                
            </Stack>
            
            <Typography variant='h5'>Summary</Typography>
            
            <Stack spacing={1}>
                <Stack direction="row">
                    <Typography>Conference
                        Experimental evaluation and modelling of corroded reinforced concrete columns.
                        ACI Structural Journal, 2020, 61-76, 10.14359/51721372, Turkey
                        Hakan Yalciner, Atila Kumbasaroglu
                    </Typography>
                    
                </Stack>
                <Divider sx={{m:3}}/>
                
                <File/>
                <File/>
                
            </Stack>
        </Stack>
    </Container>
    
  )
}
