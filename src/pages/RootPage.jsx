import { Box, Container, CssBaseline } from '@mui/material'
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

import SpeedDialButton from '../components/button/SpeedDialButton'
import SpeedDailButton from '../components/button/SpeedDialButton'
import { useDispatch } from 'react-redux'
import { format } from '../store/pageNumberSlice'
import Footer from '../components/Footer'

export default function RootPage() {
  const location = useLocation();
  const currentEndpoint = location.pathname;

  return (
    <Box mt={10}>
      {currentEndpoint != "/publications/create" &&
        <Navbar />
      }
      <Outlet />
      {currentEndpoint != "/publications/create" &&
        <SpeedDailButton />
      }
   
    </Box>
  )
}
