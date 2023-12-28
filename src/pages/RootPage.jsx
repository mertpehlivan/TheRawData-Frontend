import { Box, Container, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

import SpeedDialButton from '../components/button/SpeedDialButton'
import SpeedDailButton from '../components/button/SpeedDialButton'

export default function RootPage() {
  return (
    <Box mt={10}>

      <Navbar />
      <Outlet />
      <SpeedDailButton />
    </Box>
  )
}
