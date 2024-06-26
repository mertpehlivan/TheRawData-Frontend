import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, ButtonGroup, Checkbox, CircularProgress, Divider, FormControl, FormLabel, Input, InputLabel, Menu, MenuItem, Select, Stack, TextField } from '@mui/material';
import { AccountBalance, Add, Cancel, CheckBox, Edit, Remove, Save, Update } from '@mui/icons-material';
import { useState } from 'react';
import UniversitySearch from '../UniversitySearch';
import SearchDepartment from '../SearchDepartment';
import { createAffiliation, deleteAffiliation, updateAffiliation } from '../../services/newData/affiliationService';
import { useUserContext } from '../../hooks/AuthProvider';
import { setDate } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CountrySelect from '../myaccount/CountrySelect';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        position: "relative"
    },
}));

export default function AffiliationDialog({ refresh, affiliation, setAffiliation, handleClickOpen, handleClose, open }) {
    const [id, setId] = useState(null)
    const [edit, setEdit] = useState(false)
    const [add, setAdd] = useState(false)
    const [university, setUniversity] = useState("")
    const [startDate, setStartDate] = useState(dayjs(""))
    const [endDate, setEndDate] = useState(dayjs(""))
    const [check, setCheck] = useState(false)
    const [depeartment, setDepeartment] = useState("");
    const [location, setLocation] = useState("")
    const [position, setPosition] = useState("")
    const [saveLoading, setSaveLoading] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)
    const { token } = useUserContext()
    const handleAddOpen = () => {
        setAdd(true)
    }
    const handleAddClose = () => {
        setAdd(false)
        clearState()
    }

    const removeFetch = async (id) => {
        setRemoveLoading(true)
        try {
            const response = await deleteAffiliation(token, id);
        } catch (error) {
            console.error(error)
        }

        setRemoveLoading(false)
        refresh()
    }

    const clearState = () => {
        setUniversity("")
        setStartDate("")
        setEndDate("")
        setCheck("")
        setDepeartment("")
        setLocation("")
        setPosition("")
        setId("")
        setEdit(false)
    }
    const fetchCreate = async () => {
        const data = {
            university,
            startDate,
            endDate,
            location,
            department: depeartment,
            position
        }
        const response = await createAffiliation(token, data);
        if (response) {
            refresh()
            clearState()
            setAdd(false)

        }

    }
    const dateChange = (tempDate) => {
        if (!tempDate) {
            return "present"
        }
        const date = new Date(tempDate);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
        return formattedDate;
    }
    const editClick = ({
        id,
        university,
        startDate,
        endDate,
        location,
        department,
        position,
    }) => {
        setAdd(true)
        setUniversity(university)
        setStartDate(dayjs(startDate))
        setEndDate(dayjs(endDate))
        setCheck(endDate == null || endDate == "" ? true : false)
        setDepeartment(department)
        setLocation(location)
        setPosition(position)
        setId(id)
        setEdit(true)

    }
    const fetchUpdate = async (id) => {
        setEdit(true)
        const data = {
            id,
            university,
            startDate,
            endDate,
            location,
            department: depeartment,
            position
        }
        const response = await updateAffiliation(token, data);
        console.log("update", response)
        if (response) {

            refresh()
        }
    }

    return (
        <React.Fragment>
            <BootstrapDialog
                maxWidth="md"
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Affiliation
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ width: 700 }} dividers>
                    {affiliation.map((data, index) => (

                        <Stack p={1} spacing={1} key={index}>

                            <Stack direction="row" justifyContent="end" alignItems="end">
                                <Button onClick={() => removeFetch(data.id)} startIcon={(removeLoading ? <CircularProgress size="14" /> : <Remove />)}>Remove</Button>
                                <Button onClick={() => editClick(data)} startIcon={<Edit />}>Edit</Button>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <AccountBalance sx={{ color: "primary.main", width: 40, height: 40 }} />
                                <Stack>
                                    <Typography>{data.university}</Typography>
                                    <Typography fontStyle="italic" variant='body2' color="gray">{dateChange(data.startDate)} - {dateChange(data.endDate)}</Typography>
                                    <Stack>
                                        <Typography>Location</Typography>
                                        <Typography fontStyle="italic" variant='body2' color="gray">{data.location}</Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography>Department</Typography>
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
                </DialogContent>
                {add && <DialogActions >
                    <Stack sx={{ width: "100%" }} spacing={1} p={2} border="1px solid" borderColor="primary.main" borderRadius={3}>
                        <UniversitySearch selected={university} setSelected={setUniversity} />
                        <Stack direction="row" spacing={1}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format='DD-MM-YYYY'
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(dayjs(newValue))} // Convert to Day.js object
                                    label="Date"
                                    sx={{ width: "100%" }}
                                    slotProps={{
                                        textField: { size: 'small' }
                                    }}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disabled={check}
                                    format='DD-MM-YYYY'
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(dayjs(newValue))} // Convert to Day.js object
                                    label="Date"
                                    sx={{ width: "100%" }}
                                    slotProps={{
                                        textField: { size: 'small' },
                                    }}
                                />
                            </LocalizationProvider>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />
                            <Typography>I currently work here</Typography>
                        </Stack>

                        <CountrySelect select={location} setSelect={setLocation}/>
                        <SearchDepartment searchText={depeartment} setSearchText={setDepeartment} />
                        <FormLabel>Position</FormLabel>
                        <Select size='small' value={position} onChange={(e) => setPosition(e.target.value)}>
                            <MenuItem value={"Doctor"} >Doctor</MenuItem>
                            <MenuItem value={"Master Student"}>Master’s Student</MenuItem>
                            <MenuItem value={"PhD Student"}>PhD Student</MenuItem>
                            <MenuItem value={"Post Doctorate"}>Post Doctorate</MenuItem>
                            <MenuItem value={"Professor (Assistant)"}>Professor (Assistant)</MenuItem>
                            <MenuItem value={"Professor (Associate)"}>Professor (Associate)</MenuItem>
                            <MenuItem value={"Research Assistant"}>Research Assistant</MenuItem>
                            <MenuItem value={"Research Associate"}>Research Associate</MenuItem>
                            <MenuItem value={"Student"}>Student</MenuItem>
                            <MenuItem value={"Academic Staff"}>Academic Staff</MenuItem>
                            <MenuItem value={"Faculty Member"}>Faculty Member</MenuItem>
                            <MenuItem value={"Professor (Full)"}>Professor (Full)</MenuItem>
                            <MenuItem value={"Emeritus Professor"}>Emeritus Professor</MenuItem>
                            <MenuItem value={"Distinguished Professor"}>Distinguished Professor</MenuItem>
                        </Select>

                    </Stack>

                </DialogActions>}
                <DialogActions>
                    <Stack direction="row" justifyContent="end">
                        {!add && !edit && <Button onClick={handleAddOpen} startIcon={<Add />}>Add Affiliation</Button>}
                        <ButtonGroup>
                            {add && !edit && <Button onClick={fetchCreate} onLoad={saveLoading} startIcon={<Save />}>Save</Button>}
                            {add && edit && <Button onClick={() => fetchUpdate(id)} onLoad={saveLoading} startIcon={<Update />}>Update</Button>}
                            {add && <Button onClick={handleAddClose} startIcon={<Cancel />}>Cancel</Button>}
                        </ButtonGroup>

                        {!add && <Button onClick={handleClose}>Close</Button>}
                    </Stack>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment >
    );
}