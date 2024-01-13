import React, { useState } from 'react';
import { Stack, Avatar, IconButton, Modal, Backdrop, Paper, Button, CircularProgress } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { PhotoCamera } from '@mui/icons-material';
import BackdropComponent from './BackdropComponent';

const AvatarComponent = () => {
    const [open, setOpen] = useState(false);
    const [showIcon, setShowIcon] = useState(true);

    const handleClose = () => {
        // You may add additional logic here if needed
        // For now, just close the Backdrop when handleClose is called
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            sx={{ position: 'relative' }}
        >
            <Avatar  sx={{ width: 150, height: 150 }} />

            {showIcon && (
                <IconButton
                    sx={{ width: 150, height: 150, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
                    onClick={handleOpen}
                >
                    <PhotoCamera sx={{ width: 100, height: 100 }} />
                </IconButton>
            )}
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
              
            >
                <Stack>
                    <BackdropComponent handleClose={handleClose} />
                </Stack>
            </Backdrop>
        </Stack>
    );
};

export default AvatarComponent;
