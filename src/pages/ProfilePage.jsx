import { Box, Button, Container, Divider, Grid, List, ListItemButton, MenuItem, Paper, Select, Stack, TextField, Typography, debounce } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import UserComponent from '../components/home/UserComponent'
import SearchSimple from '../components/input/SearchSimple'
import DataPost from '../components/home/DataPost'
import FilterButton from '../components/button/FilterButton'
import { Outlet, useParams } from 'react-router-dom'
import ProfileUserView from '../components/view/ProfileUserView'
import { Edit, Search } from '@mui/icons-material'
import { getProfilePost } from '../services/post/postService'
import { useUserContext } from '../hooks/AuthProvider'
import AllView from '../components/view/PublicationsView/AllView'
import '../styles/ProfilePage.css'
import Affiliation from '../components/view/Affiliation'

export default function ProfilePage() {
    const { username } = useParams();
    const { token } = useUserContext();
    const [isPageIncrementing, setIsPageIncrementing] = useState(false);
    const scrollRef = useRef(null);
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(false); // setLoad'un başlangıç değeri false olarak ayarlanmalı
    const [noMore,setNoMore] = useState(false)
    const [userStatus, setUserStatus] = useState({ 
        id: null,
        status: false
    });

    useEffect(() => {
        if (userStatus.id) {
            setLoad(true); // Burada setLoad doğrudan kullanılabilir
        }
    }, [userStatus]);

    return (
        <div>
            <Container maxWidth="lg">
                <Grid container mt={12}>
                    <Grid item xs={12}>
                        <Stack>
                            <ProfileUserView setUserStatus={setUserStatus} />
                        </Stack>
                    </Grid>
                    <Grid item xs={3} mt={1}>
                        <Stack spacing={1}>
                            <FilterButton username={username} />
                            {load && <Affiliation userStatus={userStatus} />}
                        </Stack>
                    </Grid>
                    <Grid item xs={9} p={1}>
                        <Stack spacing={1}>
                            <AllView setNoMore={setNoMore} setPage={setPage} page={page} loading={loading} setLoading={setLoading} />
                           {noMore && <Button onClick={() => setPage(prev => prev + 1)}>See More</Button>}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
