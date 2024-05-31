import { AccountBalance, Add, Edit } from '@mui/icons-material'
import { Box, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AffiliationDialog from './AffiliationDialog'
import { getAffiliation } from '../../services/newData/affiliationService'
import { useUserContext } from '../../hooks/AuthProvider'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Affiliation = ({ userStatus }) => {
    const [affilation, setAffilation] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState()
    const [refre, setRefre] = useState(0)
    const { token } = useUserContext()
    const [imageLoading, setImageLoading] = useState(false)
    const { username } = useParams()

    const sliceTre = (string) => {
        if (string) {
            const str = ""
            let index = string.split("-"); // " - " ifadesinin bitiş konumu
            let result = index[1]
            console.log(result)
            return result
        } else {
            return ""
        }
    }


    useEffect(() => {
        const getFetch = async () => {
            setLoading(true)
            const response = await getAffiliation(token, userStatus.id);
            if (response) {
                console.log(response, response.length)
                setAffilation(response)
            }

            setLoading(false)
        }
        getFetch()
    }, [refre]);
    const refresh = () => {
        setRefre(prev => prev + 1)
    }


    const addAffilation = (data) => {
        setAffilation(prev => [...prev, data])
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const dateChange = (tempDate) => {
        if (!tempDate) {
            return "present"
        }
        const date = new Date(tempDate);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
        return formattedDate;
    }
    useEffect(() => {
        const getFetch = async () => {
            setLoading(true)
            const response = await getAffiliation(token, userStatus.id);
            if (response) {
                console.log(response, response.length)
                setAffilation(response)
            }
            setLoading(false)
        }
        getFetch()
    }, []);


    if (loading) {
        return (

            <Stack bgcolor="background.default" borderRadius={3} p={2} alignItems="center" justifyContent="center">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="primary.main" variant='h6'>Affiliation</Typography>

                </Stack>
                <CircularProgress />
            </Stack>
        )
    }

    if (affilation.length == 0) {
        return (

            <Stack bgcolor="background.default" borderRadius={3} p={2}>
                {open && <AffiliationDialog refresh={refresh} affiliation={affilation} setAffiliation={addAffilation} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="primary.main" variant='h6'>Affiliation</Typography>

                </Stack>
                <Typography>Affiliation information has not been entered yet</Typography>
                {userStatus.status && <Button onClick={handleClickOpen} variant='outlined' startIcon={<Add />}>add affiliation</Button>}
            </Stack>
        )
    }

    return (
        <Stack bgcolor="background.default" borderRadius={3} p={1}>
            {open && <AffiliationDialog refresh={refresh} affiliation={affilation} setAffiliation={addAffilation} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />}

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography color="primary.main" variant='h6'>Affiliation</Typography>
                {userStatus.status && <Button onClick={handleClickOpen} startIcon={<Edit />}>Edit</Button>}
            </Stack>

            <Divider />



            {affilation.map((data, index) => (
                <Stack p={1} spacing={1} key={index}>
                    <Stack direction="row" spacing={1}>
                        <AccountBalance sx={{ color: "primary.main", width: 40, height: 40 }} />
                        <Stack>
                            <Typography>{data.university}</Typography>
                            <Typography fontStyle="italic" variant='body2' color="gray">{dateChange(data.startDate)} - {dateChange(data.endDate)}</Typography>


                            <Stack>
                                <Typography>
                                    Location

                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">

                                    <Typography fontStyle="italic" variant='body2' color="gray">{data.location}</Typography>
                                    <img
                                        loading="lazy"
                                        width="15"
                                        height="10"
                                        srcSet={`https://flagcdn.com/w40/${sliceTre(data.location).toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${sliceTre(data.location).toLowerCase()}.png`}
                                        alt=""
                                    />
                                </Stack>


                            </Stack>

                            <Stack>
                                <Stack>
                                    <Typography>Department  </Typography>
                                </Stack>

                                <Typography fontStyle="italic" variant='body2' color="gray">{data.department == null || data.department == "" ? "-" : data.department}</Typography>
                            </Stack>
                            <Stack>
                                <Typography>Position</Typography>
                                <Typography fontStyle="italic" variant='body2' color="gray">{data.position == null || data.position == "" ? "-" : data.position}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider />
                </Stack>
            ))}
        </Stack>
    )
}

export default Affiliation