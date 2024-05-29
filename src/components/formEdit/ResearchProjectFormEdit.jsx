import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Checkbox, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import SearchInput from '../input/SearchInput';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link, useParams } from 'react-router-dom';
import PdfForm from './PdfForm';
import SearchInputV2 from '../input/SearchInputV2';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getResearchProject, updateResearchProject } from '../../services/newData/reasearchProjectService';
import { useUserContext } from '../../hooks/AuthProvider';
import { Save } from '@mui/icons-material';

export default function ResearchProjectFormEdit() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new dayjs(""));
  const [endDate, setEndDate] = useState(new dayjs(""))
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);
  const [authorsAndRole, setAuthorsAndRole] = useState([])
  const [grantNumber, setGrantNumber] = useState("")
  const [companyOrUnvierstiy, setCompanyOrUnvierstiy] = useState("")
  const [checked, setChecked] = React.useState(false);
  const { publicationId } = useParams()
  const { token } = useUserContext()
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    const fetch = async () => {
      setLoading(true)
      const response = await getResearchProject(token, publicationId)
      const data = response.data;
      setLoading(false)
      setTitle(data.title)
      setDate(dayjs(data.date))
      setDate(dayjs(data.endDate))
      if (data.endDate) {
        setChecked(true)
      }
      setCompanyOrUnvierstiy(data.universityAndCompany)
      setGrantNumber(data.grantNumber)
      setComment(data.comment)
    }
    fetch()
  }, []);


  const handleChange = (event) => {
    setChecked(event.target.checked);
    setEndDate(new dayjs(""))
  };
  const handleRole = (role) => {
    setAuthorsAndRole(role)
  }


  const dispatch = useDispatch();
  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
  const data = {
    title,
    date: date.toDate() == null ? null : date.toDate(),
    comment,
    grantNumber,
    authorsAndRole,
    companyOrUnvierstiy,
    endDate: endDate.toDate() == null ? "" : endDate.toDate()
  };
  const update = async () => {
    setLoading(true)
    const response = await updateResearchProject(data, token, publicationId)
    window.location.href = window.location.href;
    setLoading(false)
  }
  const isFormValid = () => {
    return title.trim() !== '' && date.trim() !== ''
  };

  const handleNext = () => {
    if (isFormValid()) {
      dispatch(addData(data));
      dispatch(increase());
    } else {

      console.log('Lütfen tüm alanları doldurun.');
    }
  };
  if (loading) {
    return(
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress/>
      </Stack>
    )
  }
  return (
    <Stack borderRadius={5} spacing={2} p={3}>
      <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
        <Icon icon="charm:search" width={50} height={50} />
        <Typography variant='h3'>Research Project</Typography>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => setDate(dayjs(newValue))} // Convert to Day.js object
            label="Beginning date"
            slotProps={{
              textField: { size: 'small', fullWidth: true },
            }}
          />
        </LocalizationProvider>
        <Stack width="100%">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(dayjs(newValue))} // Convert to Day.js object
              label="Completed date "
              slotProps={{
                textField: { size: 'small', fullWidth: true },
              }}
              disabled={checked}
            />

          </LocalizationProvider>
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={checked}
              onChange={handleChange}

            />
            <Typography>Continue</Typography>
          </Stack>

        </Stack>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="University or company"
          fullWidth
          value={companyOrUnvierstiy}
          onChange={(e) => setCompanyOrUnvierstiy(e.target.value)}
        />
        <TextField
          label="Grant number"
          size='small'
          fullWidth
          value={grantNumber}
          onChange={(e) => setGrantNumber(e.target.value)}
        />
      </Stack>
      <Stack mx={4} my={2}>
        <TextField
          value={comment}
          id="outlined-multiline-static"
          label="Abstract"
          multiline
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
        <SearchInputV2 role="Research Project" setAuthorIds={setAuthorIds} handleRole={handleRole} />

      </Stack>
      <Button startIcon={<Save />} variant='contained' onClick={ update}>Save</Button>
    </Stack>
  );
}
