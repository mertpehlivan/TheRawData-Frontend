import { Backdrop, Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function BackdropImage({ open, src, setIsToggle }) {
    const handleClose = () => {
        setIsToggle((prev) => !prev);
    };

    const imageUrl = typeof src === 'function' ? src() : src;

    return (
        <Backdrop open={open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Stack justifyItems="space-between" direction="row">
                <Stack>
                    <Box
                        component="img"
                        width={500}
                        height={500}
                        src={imageUrl}
                        alt="Büyük Resim"
                        style={{
                            objectFit: 'scale-down'
                        }}
                    />
                </Stack>


                <Box>
                    <IconButton edge="end" color="inherit" onClick={handleClose} >
                        <CloseIcon sx={{ width: 35, height: 35 }} />
                    </IconButton>
                </Box>
            </Stack>
        </Backdrop>
    );
}
