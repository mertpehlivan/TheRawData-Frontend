import { Container, Divider, Grid, List, ListItemButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import FilterButton from '../components/button/FilterButton'
import SearchOrderBox from '../components/view/SearchOrderBox'
import LibraryBox from '../components/view/LibraryBox'
import BasketSummaryComponent from '../components/library/BasketSummaryComponent'
import { Link, Outlet, useParams } from 'react-router-dom'
import { RefreshPriceProvider } from '../hooks/RefreshPrice'

export default function LibraryPage() {
  return (
    <RefreshPriceProvider>
      <Container maxWidth="md">
        <Grid container mt={12} spacing={1}>
          <Grid item xs={3.5}>
            <Stack spacing={1}>
              <Stack bgcolor="white" p={1} borderRadius={3}>
                <Typography my={1} variant='h5' color="primary.main">Library</Typography>
                <Divider></Divider>
                <List>
                  <Link style={{textDecoration:"none"}}>
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
            </Stack>
          </Grid>
          <Grid item xs={8.5} spacing={1}>
            <Stack spacing={1}>
              <Outlet />
            </Stack>

          </Grid>
        </Grid>
      </Container>
    </RefreshPriceProvider>
  )
}
