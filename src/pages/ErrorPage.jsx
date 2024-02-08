import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useUserContext } from '../hooks/AuthProvider';



export default function ErrorPage() {
  const {authenticated} = useUserContext();
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: "white",
    }}
  >
    <Typography variant="h1" style={{ color: 'red' }}>
      404
    </Typography>
    <Typography variant="h6" style={{ color: 'black' }}>
      The page you’re looking for doesn’t exist.
    </Typography>
    {authenticated ? <Link to="/"><Button variant="contained">Back Home</Button></Link> : <Link to="/login"><Button variant="contained">Back LOGİN</Button></Link>}
    
  </Box>
  );
}