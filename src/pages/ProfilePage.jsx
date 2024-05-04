import { Box, Button, Container, Divider, Grid, List, ListItemButton, MenuItem, Select, Stack, TextField, Typography, debounce } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import UserComponent from '../components/home/UserComponent'
import SearchSimple from '../components/input/SearchSimple'
import DataPost from '../components/home/DataPost'
import FilterButton from '../components/button/FilterButton'
import { Outlet, useParams } from 'react-router-dom'
import ProfileUserView from '../components/view/ProfileUserView'
import { Search } from '@mui/icons-material'
import { getProfilePost } from '../services/post/postService'
import { useUserContext } from '../hooks/AuthProvider'
import AllView from '../components/view/PublicationsView/AllView'
import '../styles/ProfilePage.css'
export default function ProfilePage() {
    const { username } = useParams();
    const { token } = useUserContext();
    const [isPageIncrementing, setIsPageIncrementing] = useState(false);
    const scrollRef = useRef(null);
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true);
    

    return (
        <div>
            <Container maxWidth="lg" >
                <Grid container mt={12}>
                    <Grid item xs={12}>
                        <Stack>


                            <ProfileUserView />
                        </Stack>
                    </Grid>
                    <Grid item xs={3} p={1}>
                        <FilterButton username={username} />
                    </Grid>
                    <Grid item xs={9} p={1}>
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
                            <AllView setPage={setPage} page={page} loading={loading} setLoading={setLoading} />
                            <Button onClick={() => setPage(prev => prev + 1)}>See More</Button>
                        </Stack>

                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}
