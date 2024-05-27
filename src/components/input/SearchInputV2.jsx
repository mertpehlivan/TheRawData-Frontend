import React, { useEffect, useState } from 'react'
import SearchComponent from '../home/SearchComponent'
import { Avatar, Box, Chip, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import SelectedAuthor from './SelectedAuthor'
import MinimizeSearchAuthor from './MinimizeSearchAuthor'
import InvitationBox from '../view/InvitationBox'
import InviteAuthor from '../form/InviteAuthor'
import { PersonAdd } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getPublicationToAuthors } from '../../services/newData/authorsService'
import { useUserContext } from '../../hooks/AuthProvider'

const baseUrl = process.env.REACT_APP_BASE_URL


function SearchInputV2({ role = "Author", setAuthorIds, authors, handleRole }) {
    const [selectedAuthor, setSelectedAuthor] = useState([])
    const dataType = useSelector((state) => state.newDataType.value)
    const location = useLocation()
    const { publicationId } = useParams()
    const { token, user } = useUserContext()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {


            setLoading(true)
            const author = (location.pathname != "/publications/create" ? await getPublicationToAuthors(token, publicationId) : null)
            if (author) {
                author.data.map((user) => {
                    const temp = {
                        user: {
                            id: user.id,
                            firstname: user.firstName,
                            lastname: user.lastName,
                            profileImageName: user.profileImageName,
                            uniqueName: user.uniqueName
                        },
                        role: user.role
                    }
                    console.log(temp)
                    setSelectedAuthor((prevAuthors) => [...prevAuthors, temp]);
                })

                const authorIds = selectedAuthor.map(author => author.user.id);
                setAuthorIds(authorIds);
            }
            setLoading(false)
            setSelectedAuthor(prev => {
                const isUserSelected = prev.some(item => item.user.id === user.id);
                if (!isUserSelected) {
                    return [
                        ...prev,
                        {
                            user: {
                                id: user.id,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                profileImageName: user.profileImageName,
                                uniqueName: user.uniqueName
                            },
                            role: "Student"
                        }
                    ];
                }
                return prev;
            });
        }

        fetch()
    }, []);
    useEffect(() => {
        const fetch = async () => {

            dataType == "Research Project" || role == "Research Project" && handleRole(selectedAuthor)
            const authorIds = selectedAuthor.map(author => author.user.id);
            setAuthorIds(authorIds);
            console.log(authorIds)
        }
        
        fetch()
    }, [selectedAuthor]);

    const deleteList = (id) => {
        setSelectedAuthor(prevAuthors => prevAuthors.filter(author => author.user.id !== id));
    }
    const handleInvite = (invitedAuthor) => {
        const data = {
            user:{
                firstname:invitedAuthor.firstname,
                lastname:invitedAuthor.lastname,
                profileImageName:null,
                uniqueName:"invite",
                id:invitedAuthor.id
            },role:null
        }
        setSelectedAuthor((prevAuthors) => [...prevAuthors, data]);
        setAuthorIds((prevIds) => [...prevIds, data.user.id]);
    };

    return (
        <Grid spacing={1} container border="1px solid" borderRadius={3} p={1} mt={2} >



            <Grid item xs={6} maxHeight={300}>
                <MinimizeSearchAuthor selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} />

            </Grid>

            <Grid item xs={6} maxHeight={300}>
                <Stack>

                    <SelectedAuthor role={role} setSelectedAuthor={setSelectedAuthor} selectedAuthor={selectedAuthor} deleteList={deleteList} />
                    <Stack justifyContent="center" alignItems="center">
                        {loading && <CircularProgress />}
                    </Stack>
                </Stack>

            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" alignContent="center" justifyContent="center" alignItems="center" p={2} spacing={1} borderRadius={3}>
                    <Stack justifyItems="center" alignItems="center" direction="row" spacing={2}>
                        <PersonAdd sx={{ width: 60, height: 60, color: "primary.main" }} />
                        <Typography color="primary.main">If the author's name and surname could not be found, please invite the researcher. Authors can be added after the invitation.</Typography>
                    </Stack>

                    <InviteAuthor onInvite={handleInvite} />
                </Stack>

            </Grid>
        </Grid >



    )
}


export default SearchInputV2
