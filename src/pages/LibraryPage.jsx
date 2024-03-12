import { Container, Divider, Grid, List, ListItemButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import FilterButton from '../components/button/FilterButton'
import SearchOrderBox from '../components/view/SearchOrderBox'
import LibraryBox from '../components/view/LibraryBox'
import BasketSummaryComponent from '../components/library/BasketSummaryComponent'
import { Link, Outlet, useParams } from 'react-router-dom'
import { RefreshPriceProvider } from '../hooks/RefreshPrice'
import Footer from '../components/Footer'
import MemoryComponent from '../components/view/MemoryComponent'

export default function LibraryPage() {
  return (
    <RefreshPriceProvider>
      <Container maxWidth="lg">
        <Grid container mt={12} spacing={1}>
          <Grid item md={3.5} xs={12}>
            <Stack spacing={1}>
              <Stack bgcolor="white" p={1} borderRadius={3}>
                <Typography my={1} variant='h5' color="primary.main">Library</Typography>
                <Divider></Divider>
                <List>
                  <Link to="/library" style={{textDecoration:"none"}}>
                    <ListItemButton>
                      <Typography color="primary.main">My Publications</Typography>
                    </ListItemButton>
                  </Link>
                  <Link style={{textDecoration:"none"}}>
                    <ListItemButton>
                    <Typography color="primary.main">Purchased Data</Typography>
                    </ListItemButton>
                  </Link>

                </List>
              </Stack>
              <BasketSummaryComponent />
              <MemoryComponent/>
              <Footer/>
            </Stack>
          </Grid>
          <Grid item md={8.5} xs={12} spacing={1}>
            <Stack spacing={1}>
              <Outlet />
            </Stack>

          </Grid>
        </Grid>
      </Container>
    </RefreshPriceProvider>
  )
}
