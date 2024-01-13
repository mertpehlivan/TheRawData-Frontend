import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Check, Download, QuestionMark } from '@mui/icons-material';

export default function HelperComponent() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Tooltip title="Delete">
                <IconButton onClick={handleOpen}>
                    <QuestionMark />
                </IconButton>
            </Tooltip>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <Stack bgcolor="white"mt={10} p={2}>

                    <Stack justifyContent="center" alignContent="center" spacing={1} p={3}>

                        <Typography variant='h5' color="primary.main"></Typography>
                        <Typography variant='h6'>
                            <Check/> For the data given in excel format use the excel file given here.
                        </Typography>
                        <Typography variant='h6'>
                        <Check/> <b>If it is a questionary survey</b>, upload all the forms as a merged pdf file.
                        </Typography>
                        <Typography variant='h6'>
                        <Check/>  If it is a software modelling upload it as zip file.
                        </Typography>
                        <Button variant='contained' startIcon={<Download />}>Download Excel File</Button>

                    </Stack>
                </Stack>
            </Backdrop>
        </div>
    );
}