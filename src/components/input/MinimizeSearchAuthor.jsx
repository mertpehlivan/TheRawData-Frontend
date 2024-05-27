import { Add, Book, Person, Search } from '@mui/icons-material'
import { Avatar, Box, Button, ButtonGroup, Chip, CircularProgress, Divider, IconButton, Input, InputAdornment, Stack, TextField, Typography, debounce } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ContinuesDeveloped from '../view/ContinuesDeveloped'
import { useUserContext } from '../../hooks/AuthProvider'
import { searchUser, searchUserByUniqueName } from '../../services/userService'
import { Link } from 'react-router-dom'
import { getSearchPost } from '../../services/post/postService'

const baseUrl = process.env.REACT_APP_BASE_URL

const ResearcherComponent = ({ data }) => {
    const { user } = useUserContext()
    return (
        <Stack bgcolor="white" borderRadius={2}>
            <Link target='_blank' to={`/users/${data.uniqueName}`} style={{ textDecoration: "none" }}>
                <Stack direction="row" spacing={1} p={1}>
                    <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${data.profileImageName}`} sx={{ width: "45px", height: "45px" }} />


                    <Stack>
                        <Typography>{data.firstname} {data.lastname}</Typography>
                        <Typography variant='body2'>@{data.uniqueName}</Typography>
                    </Stack>
                    {user.id == data.id && <Chip sx={{ color: "white", bgcolor: "primary.main" }} label="Me"></Chip>}

                </Stack>
            </Link>



        </Stack>
    )
}
const ResearchComponent = ({ data }) => {
    return (
        <Stack bgcolor="white" borderRadius={2} p={2}>
            <Link to={`/publications/${data.id}`}><Typography variant='h5'>{data.title}</Typography></Link>
        </Stack>
    )
}
const InfoComponent = () => {

    return (
        <Stack bgcolor="white" p={2} borderRadius={2} spacing={1}>

        </Stack>
    )
}
const LoadingComponent = () => {
    return (
        <Stack justifyContent="center" alignItems="center" bgcolor="white" p={1} borderRadius={3}>
            <CircularProgress />
        </Stack>
    )
}



function MinimizeSearchAuthor({ selectedAuthor, setSelectedAuthor }) {
    const [searchData, setSearchData] = useState("");
    const [searchType, setSearchType] = useState("Researcher");
    const [data, setData] = useState([]);
    const { token } = useUserContext()
    const [noSearchData, setNoSearchData] = useState("")
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [noMore, setNoMore] = useState(false)

    useEffect(() => {
        console.log(selectedAuthor)
    }, [selectedAuthor]);

    const handlerSelect = (user) => {
        console.log(user)
        setSelectedAuthor((selectedAuthors) => [...selectedAuthors, { user, role: "Student" }]);
    }

    useEffect(() => {
        const handleSearch = debounce(async () => {
            setPage(0)
            try {
                if (!searchData.length > 0) {
                    setPage(0)
                    setData(0)
                }
                else if (searchType == "Researcher" && searchData != "") {
                    if (searchData.startsWith("@")) {
                        // Remove "@" character
                        const cleanedSearchData = searchData.substring(1);

                        setLoading(true);

                        try {
                            const response = await searchUserByUniqueName(token, cleanedSearchData);
                            console.log(response.data);

                            if (response.data) {
                                setData(response.data);
                            }
                        } catch (error) {
                            console.error("Error occurred during user search:", error);
                            // Handle the error as needed
                        } finally {
                            setLoading(false);

                        }
                    } else {
                        setLoading(true)
                        const response = await searchUser(token, searchData)
                        console.log(response.data)
                        console.log(searchData)
                        if (response.data) {
                            setData(prev => (page === 0 ? response.data : [...prev, ...response.data]));
                        }
                        setLoading(false)
                    }
                } else (
                    setData([])
                )



            } catch (error) {
                console.error('Error:', error.message);
            }
        }, 500);
        handleSearch();
    }, [searchData]);
    useEffect(() => {
        const handleSearch = debounce(async () => {

            try {
                if (!searchData.length > 0) {
                    setPage(0)
                    setData([])
                }
                else if (searchType == "Researcher" && searchData != "") {
                    if (searchData.startsWith("@")) {
                        // Remove "@" character
                        const cleanedSearchData = searchData.substring(1);

                        setLoading(true);

                        try {
                            const response = await searchUserByUniqueName(token, cleanedSearchData);
                            console.log(response.data);

                            if (response.data.lenght > 0) {
                                setData(response.data);
                            } else {
                                setNoMore(true)
                            }
                        } catch (error) {
                            console.error("Error occurred during user search:", error);
                            // Handle the error as needed
                        } finally {
                            setLoading(false);

                        }
                    } else {
                        setLoading(true)
                        const response = await searchUser(token, searchData)
                        console.log(response.data)
                        console.log(searchData)
                        if (response.data.lenght > 0) {
                            setData(prev => (page === 0 ? response.data : [...prev, ...response.data]));
                        } else {
                            setNoMore(true)
                        }
                        setLoading(false)
                    }
                } else (
                    setData([])
                )



            } catch (error) {
                console.error('Error:', error.message);
            }
        }, 500);
        handleSearch();
    }, [page]);
    return (
        <Stack spacing={1}>
            <Stack bgcolor="white" p={2} borderRadius={2} spacing={1}>
                <Stack direction="row">
                    <Input fullWidth value={searchData} onChange={(e) => setSearchData(e.target.value)} placeholder='@username, researcher name, research ...' startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    } type='search' />
                </Stack>


            </Stack>



            <Box sx={{ overflowY: "auto" }} height={200} spacing={1}>
                {searchData != "" && loading && <LoadingComponent />}
                {searchType == "Researcher" && data.length > 0 && data.map((user, index) => (
                    <Stack>

                        <Stack key={index} direction="row" justifyContent="space-between" px={2} alignItems="center">
                            <ResearcherComponent key={index} data={user} />
                            <Box>
                                <IconButton sx={{ bgcolor: 'primary.main', color: "white", borderRadius: 50, width: 30, height: 30 }} onClick={() => handlerSelect(user)} disabled={selectedAuthor.find(selectedUser => selectedUser.user.id === user.id)}>
                                    <Add />
                                </IconButton>
                            </Box>

                        </Stack>
                        <Divider />
                    </Stack>
                ))}
                <Stack justifyContent="center">
                    {searchData != "" && !noMore && <Button variant="outlined" onClick={() => setPage(prev => prev + 1)}>See more</Button>}
                </Stack>

            </Box>

        </Stack>
    )
}

export default MinimizeSearchAuthor
