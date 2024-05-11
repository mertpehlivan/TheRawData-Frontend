import React, { useEffect, useState } from 'react';
import { CircularProgress, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import SearchInput from '../input/SearchInput';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link, useParams } from 'react-router-dom';
import PdfForm from './PdfForm';
import SearchDepartment from '../SearchDepartment';
import UniversitySearch from '../UniversitySearch';
import { getThesis, updateThesis } from '../../services/newData/thesisService';
import { useUserContext } from '../../hooks/AuthProvider';
import { Save } from '@mui/icons-material';

export default function ThesisFormEdit() {
  const [title, setTitle] = useState('');
  const [degree, setDegree] = useState('Bachelor');
  const [university, setUniversity] = useState('');
  const [pages, setPages] = useState('');
  const [comment, setComment] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState("")
  const [authors, setAuthorIds] = useState([])
  const [isValid, setIsValid] = useState(true); // Kontrol eklemek için bir state ekledik
  const { token } = useUserContext()
  const { publicationId } = useParams();
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const response = await getThesis(token, publicationId)
      const data = response.data
      console.log(data)
      setLoading(false)
      
      setTitle(data.title)
      setDegree(data.degree)
      setDepartment(data.department)
      setMonth(data.month)
      setPages(data.pages)
      setYear(data.year)
      setUniversity(data.university)
      setComment(data.comment)

    }
    fetch()
  }, []);


  const dispatch = useDispatch();



  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const data = {
    title,
    degree,
    university,
    pages,
    department,
    authors,
    year,
    month,
    comment,
  };
  const updatePublication = async () =>{
    setLoading(true)
    const response = await updateThesis(data,token,publicationId)
    setLoading(false)
    window.location.href = window.location.href;
  }
  
  const years = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i)); // Kontrol eklemek için bir state ekledik
  const months = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ];

  const handleCommentChange = (e) => {
    const newComment = e.target.value;

    // Sınırı kontrol et
    if (newComment.length <= 2000) {
      setComment(newComment);
    }
  };

  const isFormValid = () => {
    return title.trim() !== '' &&
      degree.trim() !== '' &&
      university.trim() !== '' &&
      pages.trim() !== '' &&
      comment.trim() !== ''
  };

  const handleNext = () => {
    if (isFormValid()) {
      dispatch(addData(data));
      dispatch(increase());
    } else {
      console.log('Lütfen tüm alanları doldurun.');
      setIsValid(false);
    }
  };
  if (loading) {
    return (
      <Stack>
        <CircularProgress />
      </Stack>
    )
  }
  return (
    <Stack borderRadius={5} spacing={2} p={3}>
      <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
        <Icon icon="vaadin:diploma-scroll" width={40} height={40} />
        <Typography variant='h3'>Thesis</Typography>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          fullWidth
          size='small'
          placeholder="Degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        >
          <MenuItem value={"Bachelor"}>Bachelor</MenuItem>
          <MenuItem value={"Master"}>Master</MenuItem>
          <MenuItem value={"Doctorate"}>Doctorate</MenuItem>
          <MenuItem value={"Post Doctorate"}>Post Doctorate</MenuItem>
        </Select>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <UniversitySearch selected={university} setSelected={setUniversity} />
        <TextField
          size='small'
          fullWidth
          label="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          select
          label="Month"
          value={month}
          onChange={handleMonthChange}
          fullWidth
        >
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          size='small'
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="number"
          InputProps={{
            inputProps: {
              min: 1000,
              max: 9999,
            },
          }}
        />
      </Stack>

      <SearchDepartment setDepartment={setDepartment} />



      <Stack>

        <TextField
          id="outlined-multiline-static"
          label="Abstract"
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}

        />
      </Stack>
      <Button variant='contained' startIcon={<Save/>} onClick={updatePublication} >Save</Button>
    </Stack>
  );
}
