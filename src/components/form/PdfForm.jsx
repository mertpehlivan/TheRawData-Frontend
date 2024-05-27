import { ErrorOutline, Lock, LockOpen, PictureAsPdf, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UploadInput from '../input/UploadInput'

function PdfForm({ pdf, setPdf, setFileUrl, setFileEx }) {
    const [ex, setEx] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const handleChangePdf = (event) => {
        if (event.target.name === "pdfStatus") {
            setPdf({
                pdfStatus: event.target.checked,
                addOnly: true,
            })
        } else if (event.target.name === "addOnly") {
            setPdf({
                ...pdf,
                [event.target.name]: event.target.value
            })
        }
    }
    useEffect(() => {
        setFileEx(ex)
        if (ex === "pdf" || ex == null) {
            setErrorMessage("")
        } else {
            setErrorMessage("You can only upload pdf files")
        }
    }, [ex]);
    return (
        <Stack alignContent="center">
            <Stack direction="row" alignItems="center">
                <FormControlLabel
                    control={<Switch checked={pdf.pdfStatus} onChange={handleChangePdf} name='pdfStatus' />}
                />
                <Typography>Do you want to upload a pdf?</Typography>
            </Stack>
            {pdf.pdfStatus &&
                <Stack>
                    <Stack direction="row" justifyContent="space-around" spacing={2} m={1} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" p={2}>
                        <Stack direction="row">
                            <UploadInput icon={'fa6-regular:file-pdf'} text="Uploud Pdf" setPreviewUrl={setFileUrl} setPreviewEx={setEx} />
                        </Stack>

                        <Stack>
                            <FormControl>

                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={true}
                                    name="radio-buttons-group"
                                >
                                    <Stack justifyContent="center">
                                        <FormControlLabel name='addOnly' sx={{ mt: 1, borderRadius: 3, borderColor: "primary.main" }} onChange={handleChangePdf} value={true} control={<Radio defaultChecked />} label={<Stack>
                                            <Stack direction="row" spacing={1}>
                                                <LockOpen sx={{ color: "primary.main" }} />
                                                <Typography sx={{ color: "primary.main" }}>Add only a public file</Typography>
                                            </Stack>
                                            <Typography variant='body2'>Upload as a public file which everyone can download</Typography>

                                        </Stack>} />
                                        <FormControlLabel name='addOnly' sx={{ mt: 1, borderRadius: 3, borderColor: "primary.main" }} onChange={handleChangePdf} value={false} control={<Radio />} label={<Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Lock sx={{ color: "primary.main" }} />
                                                <Typography sx={{ color: "primary.main" }}>Add only a private file</Typography>
                                            </Stack>
                                            <Typography variant='body2'>Upload as a private file which only you and the co-auhtors can download</Typography>

                                        </Stack>} />
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Stack>

                    </Stack>

                    {errorMessage.length > 0 && <Stack direction="row" alignItems="center" spacing={1} borderRadius={3} border="1px solid red" p={1}>
                        <ErrorOutline sx={{ color: "red" }} />
                        <Typography color="red">{errorMessage}</Typography>
                    </Stack>}
                </Stack>

            }


        </Stack>
    )
}

export default PdfForm
