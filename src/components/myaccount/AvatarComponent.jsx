import React, { useState } from 'react';
import { Stack, Avatar, IconButton, Modal, Backdrop, Paper, Button, CircularProgress } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { PhotoCamera } from '@mui/icons-material';
import BackdropComponent from './BackdropComponent';
import { useUserContext } from '../../hooks/AuthProvider';

const AvatarComponent = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const [open, setOpen] = useState(false);
    const [showIcon, setShowIcon] = useState(true);
    const {user} = useUserContext()
    const [image,setImage] = useState(`${baseUrl}/api/v1/auth/profileImage/${user.profileImageName}`)

    const handleClose = () => {
        
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
            <Avatar src={image}   sx={{ width: 150, height: 150 }} />

            {showIcon && (
                <IconButton
                    sx={{ width: 100, height: 100 , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1,bgcolor:"gray",opacity:0.7 }}
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
                    <BackdropComponent setImage={setImage} handleClose={handleClose} />
                </Stack>
            </Backdrop>
        </Stack>
    );
};

export default AvatarComponent;
