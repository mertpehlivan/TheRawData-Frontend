import { Container, Grid, Hidden, Stack, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import UserComponent from '../components/home/UserComponent'
import { useTheme } from '@emotion/react'
import NewPublicationComponent from '../components/home/NewPublicationComponent'
import { useUserContext } from '../hooks/AuthProvider'
import MenuComponenet from '../components/home/MenuComponenet'
import CenterComponent from '../components/home/CenterComponent'
import PaymentView from '../components/view/PaymentView'
import BasketSummaryComponent from '../components/library/BasketSummaryComponent'
import { RefreshPriceProvider, useRefreshPrice } from '../hooks/RefreshPrice'
import NotficationComponent from '../components/NotficationComponent'
import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer'
  

export default function HomePage() {

  const [activeItem, setActiveItem] = useState('Explore');
  const [globalUser, setGlobalUser] = useState(null)


  const { token } = useUserContext();
  if (!token) {
    return
  }
  return (
    
      <Container maxWidth="100%">
        <Grid
          container
          spacing={2}
          mt={10}
        >
          <RefreshPriceProvider>
            <Grid item md={3} sm={12}>
              <Hidden mdDown>
                <Stack spacing={1} position={'fixed'} width="23%">
                  <UserComponent setGlobalUser={setGlobalUser} />
                  <MenuComponenet activeItem={activeItem} setActiveItem={setActiveItem} />
                  <Footer />
                </Stack>
              </Hidden>
            </Grid>
            <Grid item md={6} sm={12}>
              <Outlet />
            </Grid>
            <Grid item md={3} sm={12}>
              <Hidden mdDown>
                <Stack spacing={1} position={'fixed'} width="23%">
                  <PaymentView />
                  <BasketSummaryComponent />
                </Stack>
              </Hidden>
            </Grid>
          </RefreshPriceProvider>
        </Grid>

      </Container>

   
  )
}
