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
import EmailStepper from './EmailStepper';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { useUserContext } from '../../hooks/AuthProvider';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  width: "100%",
}));

function EmailDialog({ handleClickEmailChange, handleCloseEmailChange, emailChange }) {
  const [loading,setLoading] = useState(false)
  const {email,user} = useUserContext() 
  
  return (
    <React.Fragment >



      <BootstrapDialog
        fullWidth={true}
        maxWidth="md"
        onClose={handleCloseEmailChange}
        aria-labelledby="customized-dialog-title"
        open={emailChange}
      >

        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change E-mail
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseEmailChange}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <EmailStepper />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseEmailChange}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

    </React.Fragment >
  );
}

export default EmailDialog
