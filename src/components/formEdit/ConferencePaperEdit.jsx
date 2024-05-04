import React, { useEffect, useState } from 'react';
import { Stack, Typography, TextField, Icon, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import SearchInput from '../input/SearchInput';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link, useParams } from 'react-router-dom';
import PdfForm from './PdfForm';
import { getConferencePaper, updateConferencePaper } from '../../services/newData/conferencePaperService';
import SearchInputV2 from '../input/SearchInputV2';
import { useUserContext } from '../../hooks/AuthProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Save } from '@mui/icons-material';

export default function ConferencePaperEdit() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(dayjs(""));
  const [conferenceName, setConferenceName] = useState('');
  const [location, setLocation] = useState('');
  const [pages, setPages] = useState('');
  const [isbn, setIsbn] = useState('');
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);
  const { publicationId } = useParams();
  const [loading, setLoading] = useState(false)
  const { token } = useUserContext()
  const [author,setAuthor] = useState([])
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const response = await getConferencePaper(token, publicationId);
      const data = response.data;
      console.log("Conference Paper --- :", data)
      setLoading(false)
      setTitle(data.title)
      setDate(dayjs(data.date))
      setConferenceName(data.conferenceName)
      setLocation(data.location)
      setPages(data.pages)
      setIsbn(data.isbn)
      setComment(data.comment)
      setAuthor(data.authors)
    }
    fetch()
  }, []);

  const dispatch = useDispatch();
  const handelSave = async () =>{
    const response = updateConferencePaper(data,token,publicationId)
    window.location.href = window.location.href;
  } 
  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
  const data = {
    title,
    date,
    conferenceName,
    location,
    pages,
    isbn,
    authors,
    comment,

  };

  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      date.trim() !== '' &&
      conferenceName.trim() !== '' &&
      location.trim() !== '' &&
      pages.trim() !== '' &&
      comment.trim() !== ''
    );
  };

  if (loading) {
    return (<Stack>
      <Typography>Loading</Typography>
    </Stack>)
  }


  return (
    <Stack borderRadius={5}>
      <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
        <Icon icon="game-icons:video-conference" width={50} height={50} />
        <Typography variant='h3'>Conference Paper</Typography>
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
          label="Location"
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
          <SearchInputV2 setAuthorIds={setAuthorIds}/>
        </Stack>


      </Stack>
      <Button variant='contained' onClick={handelSave} startIcon={<Save/>} >Save</Button>
    </Stack>
  );
}
