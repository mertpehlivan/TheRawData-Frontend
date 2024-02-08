import { Book, Person, Search } from '@mui/icons-material'
import { Avatar, Button, ButtonGroup, Chip, CircularProgress, Input, InputAdornment, Stack, TextField, Typography, debounce } from '@mui/material'
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
            <Link to={`/users/${data.uniqueName}`} style={{ textDecoration: "none" }}>
                <Stack direction="row" spacing={1} p={1} sx={{ ":hover": { bgcolor: "primary.main", color: "white", borderRadius: 2 } }}>
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
            <Link><Typography variant='h5'>{data.title}</Typography></Link>
        </Stack>
    )
}
const InfoComponent = () => {

    return (
        <Stack bgcolor="white" p={2} borderRadius={2} spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Search sx={{ color: "primary.main" }} />
                <Typography variant='h5' color="primary.main">Search</Typography>
            </Stack>

            <Typography>Explore the value of your research and raw data creations! Our site provides users with the opportunity to navigate through a vast sea of information, allowing them to maximize the potential of their research and generated raw data.</Typography>
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



function SearchComponent() {
    const [searchData, setSearchData] = useState("");
    const [searchType, setSearchType] = useState("Researcher");
    const [data, setData] = useState([]);
    const { token } = useUserContext()
    const [noSearchData, setNoSearchData] = useState("")
    const [loading, setLoading] = useState(false)
    const [page,setPage] = useState(0);


    useEffect(() => {
        const handleSearch = debounce(async () => {
            setPage(0)
            try {

                if (searchType == "Researcher" && searchData != "") {
                    if (searchData.startsWith("@")) {
                        // Remove "@" character
                        const cleanedSearchData = searchData.substring(1);

                        setLoading(true);

                        try {
                            const response = await searchUserByUniqueName(token,cleanedSearchData);
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
                } else if(searchType == "Research" && searchData != "") {
                    const size = 6
                    setLoading(true)
                    try {
                        const response = await getSearchPost(token,page,size,searchData)
                        if (response.data) {
                            setData(prev => (page === 0 ? response.data : [...prev, ...response.data]));
                            console.log(response.data)
                        }
                        setLoading(false)
                    } catch (error) {
                        console.log(error)
                        setLoading(false)
                    }
                    
                }else(
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

                if (searchType == "Researcher" && searchData != "") {
                    if (searchData.startsWith("@")) {
                        // Remove "@" character
                        const cleanedSearchData = searchData.substring(1);

                        setLoading(true);

                        try {
                            const response = await searchUserByUniqueName(token,cleanedSearchData);
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
                } else if(searchType == "Research" && searchData != "") {
                    const size = 6
                    setLoading(true)
                    try {
                        const response = await getSearchPost(token,page,size,searchData)
                        if (response.data) {
                            setData(prev => (page === 0 ? response.data : [...prev, ...response.data]));
                            console.log(response.data)
                        }
                        setLoading(false)
                    } catch (error) {
                        console.log(error)
                        setLoading(false)
                    }
                    
                }else(
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
                    <Button startIcon={<Search />} variant='contained'>
                        Search
                    </Button>
                </Stack>

                <ButtonGroup fullWidth>
                    <Button onClick={() => {setSearchType("Researcher")}} startIcon={<Person />} disabled={(searchType === "Researcher")}>Researcher Search</Button>
                    <Button onClick={() => setSearchType("Research")} startIcon={<Book />} disabled={(searchType === "Research")}>Research Search</Button>
                </ButtonGroup>
            </Stack>

            {searchData == "" && <InfoComponent/>}
            {searchData != "" && loading && <LoadingComponent />}
            <Stack spacing={1}>
                {searchType == "Researcher" && data.map((user, index) => (
                    <ResearcherComponent key={index} data={user} />
                ))}
                {searchType == "Research" && data.map((post, index) => (
                    <ResearchComponent key={index} data={post} />
                ))}
                {searchData != "" && <Button variant="outlined" onClick={()=>setPage(prev=>prev+1)}>See more</Button>}
            </Stack>

        </Stack>
    )
}

export default SearchComponent
