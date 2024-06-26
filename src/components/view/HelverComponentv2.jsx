import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Check, Download, QuestionMark } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function HelperComponentV2() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Tooltip title="Info">
                <IconButton onClick={handleOpen}>
                    <QuestionMark />
                </IconButton>
            </Tooltip>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <Stack bgcolor="white" mt={10} p={2} maxWidth="md">

                    <Stack justifyContent="center" alignContent="center" spacing={1} p={3}>
                        <Stack justifyContent="flex-end" alignItems="flex-end">
                            <Button variant='contained' color='error' onClick={handleClose}>X</Button>
                        </Stack>
                        <Typography variant='h5' color="primary.main"></Typography>
                        <Typography variant='h6'>
                            <Check /> Preview images for raw data are needed to be uploaded by authors and the preview of the data is presented in jpg format under the section. Authors can use provided excel format prepared by RDL. Data owners are free to use their own excel formats, taking into account the important points mentioned in the paper titled as “How to prepare and upload your own data”. 
                        </Typography>
                        <Typography variant='h6'>
                            <Check /> It would be useful to upload an image that gives an idea of what other researchers will have if the corresponding data or model are purchased. <Link to={"#"}>Click to see an example from previous uploaded raw data.</Link> The images to be uploaded can sometimes be a graphic image, sometimes an image of software code on a computer, and sometimes an image showing a single page of an entire survey.
                        </Typography>
                        <Typography variant='h6'>
                            <Check /> For questionary survey, upload the first page of the survey form as a jpg image.
                        </Typography>

                    </Stack>
                </Stack>
            </Backdrop>
        </div>
    );
}