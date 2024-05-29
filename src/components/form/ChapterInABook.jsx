import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import PdfForm from './PdfForm';
import SearchInputV2 from '../input/SearchInputV2';

export default function ChapterInABook() {
  const [title, setTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [year, setYear] = useState('');
  const [pages, setPages] = useState('');
  const [doi, setDoi] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [editor, setEditor] = useState('');
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
      setChapterNumber(history.chapterNumber || '');
      setBookTitle(history.bookTitle || '');
      setYear(history.year || '');
      setPages(history.pages || '');
      setDoi(history.doi || '');
      setPublisher(history.publisher || '');
      setIsbn(history.isbn || '');
      setEditor(history.editor || '');
      setComment(history.comment || '');
      setPdf({
        pdfStatus: history.pdfStatus !== undefined ? history.pdfStatus : true,
        addOnly: history.addOnly !== undefined ? history.addOnly : true
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
    chapterNumber,
    bookTitle,
    year,
    pages,
    doi,
    publisher,
    isbn,
    editor,
    authors,
    comment,
    pdf,
    fileEx,
    fileUrl
  };

  const isFormValid = () => {
    return title.trim() !== '' &&
      chapterNumber.trim() !== '' &&
      bookTitle.trim() !== '' &&
      year.trim() !== '' &&
      pages.trim() !== '' &&
      publisher.trim() !== '' &&
      editor.trim() !== '' &&
      comment.trim() !== '' &&
      (pdf.pdfStatus ? (fileUrl != null && fileEx === 'pdf') : true);
  };

  const handleDelete = (authorId) => {
    setAuthorIds(authors.filter((id) => id !== authorId));
  };

  return (
    <Stack borderRadius={5}>
      <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
        <Icon icon="material-symbols:article" color='#091582' width={50} height={50} />
        <Typography color="primary.main" variant='h3'>Chapter in a Book</Typography>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          size='small'
          fullWidth
          label="Chapter Number"
          value={chapterNumber}
          onChange={(e) => setChapterNumber(e.target.value)}
        />
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Book Title"
          fullWidth
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <TextField
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
          label="DOI"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
        />
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Publisher"
          fullWidth
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <TextField
          size='small'
          fullWidth
          label="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="Editor"
          fullWidth
          value={editor}
          onChange={(e) => setEditor(e.target.value)}
        />
      </Stack>
      <Stack mx={4} my={2}>
        <TextField
          id="outlined-multiline-static"
          label="Abstract"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
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
                dispatch(addData(data));
                dispatch(increase());
              } else {
                console.log('Lütfen tüm alanları doldurun.');
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
