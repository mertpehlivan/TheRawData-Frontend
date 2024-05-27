import React, { useState } from 'react';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import SearchInput from '../input/SearchInput';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link } from 'react-router-dom';
import PdfForm from './PdfForm';
import SearchInputV2 from '../input/SearchInputV2';
import { Icon } from '@iconify/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function ConferencePaper() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(dayjs(""));
  const [conferenceName, setConferenceName] = useState('');
  const [location, setLocation] = useState('');
  const [pages, setPages] = useState('');
  const [isbn, setIsbn] = useState('');
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);

  const [pdf, setPdf] = useState({
    pdfStatus: true,
    addOnly: true,
  })
  const [fileUrl, setFileUrl] = useState(null)
  const [fileEx, setFileEx] = useState("")
  const dispatch = useDispatch();

  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
  const data = {
    title,
    date:date.toDate() == null ? null : date.toDate(),
    conferenceName,
    location,
    pages,
    isbn,
    authors,
    comment,
    pdf,
    fileEx,
    fileUrl
  };

  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      conferenceName.trim() !== '' &&
      location.trim() !== '' &&
      pages.trim() !== '' &&
      comment.trim() !== '' &&
      (pdf.pdfStatus == true ? (fileUrl != null ? (fileEx === "pdf" ? true : false) : false) : true)
    );
  };
  console.log(date.toDate() )
  return (
    <Stack borderRadius={5}>
      <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
        <Icon icon="game-icons:video-conference" style={{ color: "#091582" }} width={50} height={50} />
        <Typography color="primary.main" variant='h3'>Conference Paper</Typography>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => setDate(dayjs(newValue))} // Convert to Day.js object
            label="Date"
            slotProps={{
              textField: { size: 'small' },
            }}
          />
        </LocalizationProvider>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Conference Name"
          fullWidth
          value={conferenceName}
          onChange={(e) => setConferenceName(e.target.value)}
        />
        <TextField
          size='small'
          fullWidth
          label="City/Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Pages"
          fullWidth
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <TextField
          size='small'
          fullWidth
          label="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </Stack>
      <Stack mx={4} my={2}>
        <TextField
          id="outlined-multiline-static"
          label="Abstract"
          multiline
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
        <Stack mt={3}>
          <SearchInputV2 setAuthorIds={setAuthorIds} />
        </Stack>

        <PdfForm pdf={pdf} setFileEx={setFileEx} setFileUrl={setFileUrl} setPdf={setPdf} />
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
            onClick={() => {
              if (isFormValid()) {
                console.log(data)
                dispatch(addData(data));
                dispatch(increase());
              } else {
                console.log('Please fill out all fields.');
              }
            }}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
