import { Box, Container, Divider, Grid, List, ListItemButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import UserComponent from '../components/home/UserComponent'
import SearchSimple from '../components/input/SearchSimple'
import DataPost from '../components/home/DataPost'
import FilterButton from '../components/button/FilterButton'
import { Outlet, useParams } from 'react-router-dom'
import ProfileUserView from '../components/view/ProfileUserView'
import { Search } from '@mui/icons-material'
export default function ProfilePage() {
    const { username } = useParams();


    useEffect(() => {

    }, []);
    return (
        <Container maxWidth="md">
            <Grid container mt={12}>
                <Grid item xs={12}>
                    <ProfileUserView />
                </Grid>
                <Grid item xs={4} p={1}>
                    <FilterButton username={username} />
                </Grid>
                <Grid item xs={8} p={1}>
                    <Stack direction="row" bgcolor="background.default" p={1} borderRadius={3} spacing={1}>
                        <TextField
                            type="search"
                            fullWidth
                            size="small"
                            label="Search"
                            InputProps={{
                                endAdornment: <Search />,
                            }}
                        />
                        <Stack direction="row" alignItems="center">
                        </Stack>

                    </Stack>
                    <Stack mt={1} spacing={1}>
                        <Outlet uniqueName={username} />
                    </Stack>

                </Grid>

            </Grid>
        </Container>
    )
}
