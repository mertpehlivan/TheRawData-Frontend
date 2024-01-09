import { Container, Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import FilterButton from '../components/button/FilterButton'
import SearchOrderBox from '../components/view/SearchOrderBox'
import LibraryBox from '../components/view/LibraryBox'
import BasketSummaryComponent from '../components/library/BasketSummaryComponent'
import { Outlet, useParams } from 'react-router-dom'
import { RefreshPriceProvider } from '../hooks/RefreshPrice'

export default function LibraryPage() {
  return (
    <RefreshPriceProvider>
    <Container maxWidth="md">
      <Grid container mt={12} spacing={1}>
        <Grid item xs={3.5}>
          <Stack spacing={1}>
            <FilterButton />
            <BasketSummaryComponent />
          </Stack>
        </Grid>
        <Grid item xs={8.5} spacing={1}>
          <Stack spacing={1}>
            {/* 
            <LibraryBox />
            <LibraryBox /> */}
           <Outlet/>
          </Stack>

        </Grid>
      </Grid>
    </Container>
    </RefreshPriceProvider>
  )
}
