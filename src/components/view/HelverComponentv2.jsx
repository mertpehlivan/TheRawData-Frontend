import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Box, Container, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import { Check, Download, QuestionMark } from '@mui/icons-material';

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
                onClick={handleClose}
            >
                <Stack bgcolor="white" mt={10} p={2} maxWidth="md">

                    <Stack justifyContent="center" alignContent="center" spacing={1} p={3}>

                        <Typography variant='h5' color="primary.main"></Typography>
                        <Typography variant='h6'>
                            <Check /> Preview images for raw data are needed to be uploaded by authors and the preview of the data is presented in jpg format under the section. Authors can use provided excel format prepared by RDL.
                        </Typography>
                        <Typography variant='h6'>
                            <Check /> <b>Preview images of finite element and other simulations </b>"Select preview image" are needed to be uploaded by the authors. It would be useful to upload an image that gives an idea of what other researchers will have if the corresponding data or model are purchased. <Link>Click to see an example from previous uploaded raw data.</Link>
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