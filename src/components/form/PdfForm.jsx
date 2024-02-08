import { PictureAsPdf, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import React from 'react'

function PdfForm() {
    return (
        <Stack direction="row" justifyContent="space-between" spacing={2} m={1}>

            <Button type='file' variant='outlined' fullWidth startIcon={<PictureAsPdf />}>Uploud Pdf</Button>
            <Stack>
                <FormControl>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <Stack  justifyContent="center">


                            <FormControlLabel sx={{ mt: 1, border: "1px solid", borderRadius: 3, borderColor: "primary.main" }} value="female" control={<Radio />} label={<Stack>
                                <Stack direction="row" spacing={1}>
                                    <Visibility sx={{ color: "primary.main" }} />
                                    <Typography sx={{ color: "primary.main" }}>Add only a public file</Typography>
                                </Stack>
                                <Typography variant='body2'>Upload a public file which everyone can access and read.</Typography>

                            </Stack>} />
                            <FormControlLabel sx={{ mt: 1, border: "1px solid", borderRadius: 3, borderColor: "primary.main" }} value="male" control={<Radio />} label={<Stack>
                                <Stack direction="row" spacing={1}>
                                    <VisibilityOff sx={{ color: "primary.main" }} />
                                    <Typography sx={{ color: "primary.main" }}>Add only a private file</Typography>
                                </Stack>
                                <Typography variant='body2'>Save a private file as back up which only you and the co-authors can access</Typography>

                            </Stack>} />
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Stack>
        </Stack>
    )
}

export default PdfForm
