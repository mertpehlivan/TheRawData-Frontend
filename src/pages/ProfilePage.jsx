import { Box, Button, Container, Divider, Grid, List, ListItemButton, MenuItem, Paper, Select, Stack, TextField, Typography, debounce } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import UserComponent from '../components/home/UserComponent'
import SearchSimple from '../components/input/SearchSimple'
import DataPost from '../components/home/DataPost'
import FilterButton from '../components/button/FilterButton'
import { Link, Outlet, useParams } from 'react-router-dom'
import ProfileUserView from '../components/view/ProfileUserView'
import { Edit, Home, Person, Search } from '@mui/icons-material'
import { getProfilePost } from '../services/post/postService'
import { useUserContext } from '../hooks/AuthProvider'
import AllView from '../components/view/PublicationsView/AllView'
import '../styles/ProfilePage.css'
import Affiliation from '../components/view/Affiliation'
import { getUser } from '../services/userService'

export default function ProfilePage() {
    const { username } = useParams();
    const { token } = useUserContext();
    const [isPageIncrementing, setIsPageIncrementing] = useState(false);
    const scrollRef = useRef(null);
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(false); // setLoad'un başlangıç değeri false olarak ayarlanmalı
    const [noMore, setNoMore] = useState(false)
    const [loadUser, setLoadUser] = useState(false)
    const [notUser, setNotUser] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            setLoadUser(true)
            const response = await getUser(token, username)
            setLoadUser(false)
            if (!response.data) {
                setNotUser(true)
            }
        }
        fetch()
    }, []);

    const [userStatus, setUserStatus] = useState({
        id: null,
        status: false
    });

    useEffect(() => {
        if (userStatus.id) {
            setLoad(true); // Burada setLoad doğrudan kullanılabilir
        }
    }, [userStatus]);


    if (notUser) {
        return (
            <Container sx={{mt:15}} >
                <Stack bgcolor="background.default"  alignItems="center" justifyContent="center" p={3} borderRadius={3}>
                    <Person sx={{ width: 100, height: 100, color: "primary.main" }} />
                    <Typography color="primary.main" textAlign="center" variant='h4'>User not found</Typography>
                   <Link to="/home"><Button variant='contained' startIcon={<Home />}>Home page</Button></Link> 
                </Stack>
            </Container>

        )
    }



    return (
        <div>
            <Container maxWidth="lg">
                <Grid container mt={12}>
                    <Grid item xs={12}>
                        <Stack>
                            <ProfileUserView setUserStatus={setUserStatus} />
                        </Stack>
                    </Grid>
                    <Grid item xs={3} mt={2}>
                        <Stack spacing={1}>
                            <FilterButton username={username} />
                            {load && <Affiliation userStatus={userStatus} />}
                        </Stack>
                    </Grid>
                    <Grid item xs={9} p={1}>
                        <Stack spacing={1}>
                            <AllView loading={loading} setLoading={setLoading} />
                            
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
