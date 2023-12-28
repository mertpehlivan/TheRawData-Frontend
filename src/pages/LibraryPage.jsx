import { Container, Grid, Stack } from '@mui/material'
import React from 'react'
import FilterButton from '../components/button/FilterButton'
import SearchOrderBox from '../components/view/SearchOrderBox'
import LibraryBox from '../components/view/LibraryBox'

export default function LibraryPage() {
  return (
    <Container maxWidth="md">
       <Grid container mt={12} spacing={1}>
            <Grid item xs={3.5}>
                <FilterButton/>
            </Grid>
            <Grid item xs={8.5} spacing={1}>
                <Stack spacing={1}>
                    <SearchOrderBox/>
                    <LibraryBox/>
                    <LibraryBox/>
                </Stack>
                
            </Grid>
       </Grid>
    </Container>
  )
}
