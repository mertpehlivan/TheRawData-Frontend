import { Container, Grid, Stack, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import UserComponent from '../components/home/UserComponent'
import { useTheme } from '@emotion/react'
import NewPublicationComponent from '../components/home/NewPublicationComponent'
import { useUserContext } from '../hooks/AuthProvider'
import MenuComponenet from '../components/home/MenuComponenet'
import CenterComponent from '../components/home/CenterComponent'

export default function HomePage() {
  const theme = useTheme()
  const [activeItem, setActiveItem] = useState('Explore');

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          mt={10}
        >
          <Grid item md={3.5} sm={12}>
            <Stack spacing={1}>
              <UserComponent />
              <MenuComponenet activeItem={activeItem} setActiveItem={setActiveItem}/>
            </Stack>
          </Grid>
          <Grid item md={5.5} sm={12}>
            <CenterComponent activeItem={activeItem}/>
          </Grid>
          <Grid item md={3} sm={12}>
            <NewPublicationComponent />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}
