import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Checkbox, Divider, Stack, TextField, Typography } from '@mui/material';
import SearchInput from '../input/SearchInput';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link } from 'react-router-dom';
import PdfForm from './PdfForm';
import SearchInputV2 from '../input/SearchInputV2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { CheckBox } from '@mui/icons-material';

export default function ResearchProjectForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new dayjs(""));
  const [endDate, setEndDate] = useState(new dayjs(""))
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);
  const [authorsAndRole, setAuthorsAndRole] = useState([])
  const [grantNumber, setGrantNumber] = useState("")
  const [companyOrUnvierstiy, setCompanyOrUnvierstiy] = useState("")
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setEndDate(new dayjs(""))
  };



  const [pdf, setPdf] = useState({
    pdfStatus: true,
    addOnly: true,
  })
  const [fileUrl, setFileUrl] = useState(null)
  const [fileEx, setFileEx] = useState("")

  const handleRole = (role) => {
    setAuthorsAndRole(role)
    console.log("authorRole:",authorsAndRole)
  }
  const dispatch = useDispatch();
  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
 

  const isFormValid = () => {
    return title.trim() !== '' &&
      (pdf.pdfStatus == true ? (fileUrl != null ? (fileEx === "pdf" ? true : false) : false) : true)
  };
 
  const handleNext = () => {
    const data = {
      title,
      date: date.toDate() == null ? null : date.toDate(),
      comment,
      grantNumber,
      companyOrUnvierstiy,
      authorsAndRole,
      endDate: endDate.toDate() == null ? null : endDate.toDate(),
      pdf,
      fileEx,
      fileUrl
    };
    console.log("data",data)
    if (isFormValid()) {
      dispatch(addData(data));
      dispatch(increase());
    } else {

      console.log('Lütfen tüm alanları doldurun.');
    }
  };

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
            format='DD-MM-YYYY'
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
              format='DD-MM-YYYY'
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
        <PdfForm pdf={pdf} setFileEx={setFileEx} setFileUrl={setFileUrl} setPdf={setPdf} />
      </Stack>
      <Stack height={"100%"} direction="row" justifyContent="end" alignItems="end" spacing={2}>
        <Link to='/'><Button
          color='error'
          variant='outlined'
          onClick={handlerCancel}

        >
          Cancel
        </Button></Link>
        <Button
          variant='contained'
          disabled={!isFormValid()}
          onClick={handleNext}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
