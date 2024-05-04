import React, { useEffect, useState } from 'react'
import SearchComponent from '../home/SearchComponent'
import { Avatar, Box, Chip, Grid, Stack, TextField, Typography } from '@mui/material'
import SelectedAuthor from './SelectedAuthor'
import MinimizeSearchAuthor from './MinimizeSearchAuthor'
import InvitationBox from '../view/InvitationBox'
import InviteAuthor from '../form/InviteAuthor'
import { PersonAdd } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const baseUrl = process.env.REACT_APP_BASE_URL


function SearchInputV2({ setAuthorIds, authors, handleRole }) {
    const [selectedAuthor, setSelectedAuthor] = useState([])
    const dataType = useSelector((state) => state.newDataType.value)
   
    useEffect(() => {
        const authorIds = selectedAuthor.map(author => author.id);
        setAuthorIds(authorIds);
        dataType == "Research Project" && handleRole(selectedAuthor)
    }, [selectedAuthor]);

    const deleteList = (id) => {
        setSelectedAuthor(prevAuthors => prevAuthors.filter(author => author.user.id !== id));
    }
    const handleInvite = (invitedAuthor) => {
        setSelectedAuthor((prevAuthors) => [...prevAuthors, invitedAuthor]);
        setAuthorIds((prevIds) => [...prevIds, invitedAuthor.id]);
    };

    return (
        <Grid spacing={1} container border="1px solid" borderRadius={3} p={1} mt={2}>



            <Grid item xs={6}>
                <MinimizeSearchAuthor selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} />

            </Grid>

            <Grid item xs={6}>
                <Stack >
                    <SelectedAuthor setSelectedAuthor={setSelectedAuthor} selectedAuthor={selectedAuthor} deleteList={deleteList} />
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
