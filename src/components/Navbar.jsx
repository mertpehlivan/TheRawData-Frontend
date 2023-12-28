import { Avatar, Box, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import React from 'react';
import Logo from '../assets/logo.svg';
import AvatarButton from './view/AvatarButton';
import Notification from './view/Notification';
import Envelope from './view/Envelope';
import SearchSimple from './input/SearchSimple';
import { Link } from 'react-router-dom';
import LibraryButton from './button/LibraryButton';

const Navbar = () => {
  return (
    <Box sx={{position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000
    }}
    >
      
        <Stack
          direction={'row'}
          justifyContent='space-between'
          alignItems='center'
          py={2}
          bgcolor='background.default'
        >
          <Link to="/">
            <img src={Logo} width='200px' height='50px'/>
          </Link>
          
          <Stack direction="row" alignItems="center" spacing={1} mx={2}>
            <LibraryButton/>
            <Envelope />
            <Notification />
            <AvatarButton />
          </Stack>
        </Stack>
      
    </Box>
  );
};

export default Navbar;
