import React, { useEffect, useState } from 'react';
import { Stack, Typography, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import PdfForm from './PdfForm';
import SearchInputV2 from '../input/SearchInputV2';

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
  });
  const [fileUrl, setFileUrl] = useState(null);
  const [fileEx, setFileEx] = useState('');

  const history = useSelector((state) => state.data.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (history) {
      setTitle(history.title || '');
      setDate(history.date ? dayjs(history.date) : dayjs(''));
      setConferenceName(history.conferenceName || '');
      setLocation(history.location || '');
      setPages(history.pages || '');
      setIsbn(history.isbn || '');
      setComment(history.comment || '');
      setAuthorIds(history.authors || []);
      setPdf({
        pdfStatus: history.pdf?.pdfStatus !== undefined ? history.pdf.pdfStatus : true,
        addOnly: history.pdf?.addOnly !== undefined ? history.pdf.addOnly : true,
      });
      setFileUrl(history.fileUrl || null);
      setFileEx(history.fileEx || '');
    }
  }, [history]);

  const handlerCancel = () => {
    dispatch(format());
    dispatch(clearData());
    dispatch(clearType());
    dispatch(clearRawData());
  };

  const data = {
    title,
    date: date.toDate() == null ? null : date.toDate(),
    conferenceName,
    location,
    pages,
    isbn,
    authors,
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
      conferenceName.trim() !== '' &&
      location.trim() !== '' &&
      pages.trim() !== '' &&
      comment.trim() !== '' &&
      date.isValid() && 
      (pdf.pdfStatus ? (fileUrl != null && fileEx === 'pdf') : true)
    );
  };

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
            format='DD-MM-YYYY'
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
        <Stack mt={3}>
          <SearchInputV2 setAuthorIds={setAuthorIds} />
        </Stack>

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
            onClick={() => {
              if (isFormValid()) {
                console.log(data);
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
