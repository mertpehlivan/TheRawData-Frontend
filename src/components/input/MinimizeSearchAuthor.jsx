import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Chip, CircularProgress, Divider, IconButton, Input, InputAdornment, Stack, Typography } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useUserContext } from '../../hooks/AuthProvider';
import { searchUser, searchUserByUniqueName } from '../../services/userService';

const baseUrl = process.env.REACT_APP_BASE_URL;

const ResearcherComponent = ({ data }) => {
    const { user } = useUserContext();
    return (
        <Stack bgcolor="white" borderRadius={2}>
            <Link target='_blank' to={`/users/${data.uniqueName}`} style={{ textDecoration: "none" }}>
                <Stack direction="row" spacing={1} p={1}>
                    <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${data.profileImageName}`} sx={{ width: "45px", height: "45px" }} />
                    <Stack>
                        <Typography>{data.firstname} {data.lastname}</Typography>
                        <Typography variant='body2'>@{data.uniqueName}</Typography>
                    </Stack>
                    {user.id === data.id && <Chip sx={{ color: "white", bgcolor: "primary.main" }} label="Me"></Chip>}
                </Stack>
            </Link>
        </Stack>
    );
};

const LoadingComponent = () => {
    return (
        <Stack justifyContent="center" alignItems="center" bgcolor="white" p={1} borderRadius={3}>
            <CircularProgress />
        </Stack>
    );
};

function MinimizeSearchAuthor({ selectedAuthor, setSelectedAuthor }) {
    const [searchData, setSearchData] = useState("");
    const [data, setData] = useState([]);
    const { token } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [noMore, setNoMore] = useState(false);

    const handlerSelect = (user) => {
        setSelectedAuthor((selectedAuthors) => [...selectedAuthors, { user, role: "Student" }]);
    };

    const handleSearch = debounce(async (newPage = 0) => {
        try {
            if (!searchData.length > 0) {
                setData([]);
                setNoMore(false);
                return;
            }

            setLoading(true);
            setPage(newPage);
            
            let response;
            if (searchData.startsWith("@")) {
                const cleanedSearchData = searchData.substring(1);
                response = await searchUserByUniqueName(token, cleanedSearchData, newPage);
            } else {
                response = await searchUser(token, searchData, newPage);
            }

            if (response.data) {
                if (response.data.length === 0) {
                    setNoMore(true);
                } else {
                    setData(prev => (newPage === 0 ? response.data : [...prev, ...response.data]));
                }
            }
        } catch (error) {
            console.error("Error occurred during user search:", error);
        } finally {
            setLoading(false);
        }
    }, 1000);

    useEffect(() => {
        handleSearch(0);
    }, [searchData]);

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
                {loading && <LoadingComponent />}
                {data.length > 0 && data.map((user, index) => (
                    <Stack key={index}>
                        <Stack direction="row" justifyContent="space-between" px={2} alignItems="center">
                            <ResearcherComponent data={user} />
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
                    {searchData !== "" && !noMore && <Button variant="outlined" onClick={() => handleSearch(page + 1)}>See more</Button>}
                </Stack>
            </Box>
        </Stack>
    );
}

export default MinimizeSearchAuthor;
