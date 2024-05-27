import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DataTypeFormEdit from '../formEdit/DataTypeFormEdit'
import { Edit } from '@mui/icons-material';
import { Stack } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function FormDialog({ handlerFormDialog, setFormDialog, formDialog, type }) {
  const [open, setOpen] = React.useState(false);
  console.log(type)
  const handleClickOpen = () => {
    setFormDialog(true);
  };
  const handleClose = () => {
    setFormDialog(false);
  };

  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={formDialog}
        maxWidth="lg"

      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Stack alignItems="center" direction="row" spacing={1}>
            <Edit sx={{color:'primary.main'}} />
            <Typography color='primary.main' variant='h4'>Edit</Typography>
          </Stack>

        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{width:1000}} dividers>
          <DataTypeFormEdit dataType={type} />
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}