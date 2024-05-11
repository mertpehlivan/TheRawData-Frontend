import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Figure from '../assets/A1.png'
import Figure2 from '../assets/Resim4.png'
import Figure3 from '../assets/AdobeStock_234491775.jpeg'
import { Link } from 'react-router-dom'
const Accuracy = () => {
    return (
        <Container>

            <Stack spacing={3} mt={4} >
                <Paper>
                    <Stack spacing={2} p={4}>


                        <Stack >
                            <Typography variant='h4'>Accuracy of Purchased Data</Typography>
                            <Typography>In addition to being an academic platform, RDL company protects the rights of researchers
                                for sold and purchased raw data. In this regard, if there is a contradiction in the purchased raw
                                data:</Typography>
                        </Stack>
                        <Typography textAlign="center" variant='h5'>Mismatch</Typography>
                        <Stack direction="row" justifyContent="space-evenly" >
                            <Stack>
                                <Typography variant='h6'>Figure given in an article                     </Typography>
                                <Box width={400} component="img" src={Figure} />
                            </Stack>
                            <Stack>
                                <Typography variant='h6'>Preview image presented in RDL platform</Typography>
                                <Box width={400} component="img" src={Figure} />
                            </Stack>
                        </Stack>

                        <Typography textAlign="center" variant='h5'>Purchased data</Typography>
                        <Stack direction="row" justifyContent="space-evenly" >

                            <Box width={400} component="img" src={Figure2} />


                            <Box width={400} component="img" src={Figure3} />

                        </Stack>
                        <Stack>

                        </Stack>
                        <Typography>
                            If there is a contradiction between the uploaded Raw Data and the purchased data file, please contact with us.

                        </Typography>
                        <Typography>
                            The relevant contradiction is examined within 72 hours by expert academicians who advise the Raw Data Library company. In case of inconsistency, correction or recommendation is requested from the data owner.
                        </Typography>
                        <Typography>
                            If the necessary correction cannot be provided within 7 business days, the researcher who purchased the data will be contacted to proceed with the refund.
                        </Typography>
                        <Typography>
                            Contact with<Link>
                                us
                            </Link>
                        </Typography>



                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
}

export default Accuracy