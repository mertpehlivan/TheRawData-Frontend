import { Box, Container, Divider, Grid, List, ListItemButton, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import UserComponent from '../components/home/UserComponent'
import SearchSimple from '../components/input/SearchSimple'
import DataPost from '../components/home/DataPost'
import FilterButton from '../components/button/FilterButton'
import { Outlet, useParams } from 'react-router-dom'
import ProfileUserView from '../components/view/ProfileUserView'
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
                    <FilterButton username={username}/>
                </Grid>
                <Grid item xs={8} p={1}>
                    <Stack direction="row" bgcolor="background.default" p={1} borderRadius={3} spacing={1}>
                        <SearchSimple width="50%" />
                        <Stack direction="row" alignItems="center">
                            <Typography>Sorted by:</Typography>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                size='small'
                            >
                                <MenuItem value="None">
                                    None
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
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
