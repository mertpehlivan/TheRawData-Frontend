import React, { useEffect, useState } from 'react';
import { MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import PdfForm from './PdfForm';
import UniversitySearch from '../UniversitySearch';

import { useUserContext } from '../../hooks/AuthProvider';
import SearchDepartment from '../SearchDepartment';

export default function ThesisForm() {
  const [title, setTitle] = useState('');
  const [degree, setDegree] = useState('Bachelor');
  const [university, setUniversity] = useState('');
  const [pages, setPages] = useState('');
  const [comment, setComment] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [authors, setAuthorIds] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const { user } = useUserContext();
  const history = useSelector((state) => state.data.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthorIds([`${user.id}`]);
    if (history) {
      setTitle(history.title || '');
      setDegree(history.degree || 'Bachelor');
      setUniversity(history.university || '');
      setPages(history.pages || '');
      setComment(history.comment || '');
      setMonth(history.month || '');
      setYear(history.year || '');
      setDepartment(history.department || '');
      setPdf({
        pdfStatus: history.pdf?.pdfStatus !== undefined ? history.pdf.pdfStatus : true,
        addOnly: history.pdf?.addOnly !== undefined ? history.pdf.addOnly : true,
      });
      setFileUrl(history.fileUrl || null);
      setFileEx(history.fileEx || '');
    }
  }, [history]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const years = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i));
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

  const [pdf, setPdf] = useState({
    pdfStatus: true,
    addOnly: true,
  });
  const [fileUrl, setFileUrl] = useState(null);
  const [fileEx, setFileEx] = useState('');

  const handlerCancel = () => {
    dispatch(format());
    dispatch(clearData());
    dispatch(clearType());
    dispatch(clearRawData());
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
    pdf,
    fileEx,
    fileUrl,
  };

  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    if (newComment.length <= 2000) {
      setComment(newComment);
    }
  };

  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      degree.trim() !== '' &&
      university.trim() !== '' &&
      pages.trim() !== '' &&
      comment.trim() !== '' &&
      (pdf.pdfStatus ? (fileUrl != null && fileEx === 'pdf') : true)
    );
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
          onChange={handleYearChange}
          type="number"
          InputProps={{
            inputProps: {
              min: 1000,
              max: 9999,
            },
          }}
        />
      </Stack>
      <SearchDepartment />
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
      <div style={{ textAlign: 'right', color: comment.length > 2000 ? 'red' : 'inherit' }}>
        {comment.length}/2000
      </div>
      <PdfForm pdf={pdf} setFileEx={setFileEx} setFileUrl={setFileUrl} setPdf={setPdf} />
      <Stack height={"100%"} direction="row" justifyContent="end" alignItems="end" spacing={2}>
        <Link to='/'>
          <Button
            color='error'
            variant='outlined'
            onClick={handlerCancel}
          >
            Cancel
          </Button>
        </Link>
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
