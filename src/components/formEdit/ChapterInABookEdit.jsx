import React, { useEffect, useState } from 'react';
import SearchInput from '../input/SearchInput';
import {
  Stack,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link, useParams } from 'react-router-dom';
import PdfForm from './PdfForm';
import SearchInputV2 from '../input/SearchInputV2';
import { getChapterInABook, updateChapterInABook } from '../../services/newData/chapterInABookService';
import { useUserContext } from '../../hooks/AuthProvider';
import { Save } from '@mui/icons-material';
import { Icon } from '@iconify/react';

export default function ChapterInABookEdit() {
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
  const [loading, setLoading] = useState(false)
  const [authors, setAuthorIds] = useState([]);

  const { token } = useUserContext()
  const { publicationId } = useParams();

  useEffect(() => {
    const fetchPublication = async () => {
      setLoading(true)
      const response = await getChapterInABook(token, publicationId)
      const data = response.data;
      setTitle(data.title)
      setChapterNumber(data.chapterNumber)
      setBookTitle(data.bookTitle)
      setYear(data.year)
      setPages(data.pages)
      setDoi(data.doi)
      setPublisher(data.publisher)
      setIsbn(data.isbn)
      setEditor(data.editor)
      setComment(data.comment)
      setLoading(false)
    }
    fetchPublication()
  }, []);
  const handleCommentChange = (e) => {
    const newComment = e.target.value;

    // Sınırı kontrol et
    if (newComment.length <= 2000) {
      setComment(newComment);
    }
  };
  const dispatch = useDispatch()
  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
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

  }
  const isFormValid = () => {
    return title.trim() !== '' &&
      chapterNumber.trim() !== '' &&
      bookTitle.trim() !== '' &&
      year.trim() !== '' &&
      pages.trim() !== '' &&
      doi.trim() !== '' &&
      publisher.trim() !== '' &&
      isbn.trim() !== '' &&
      editor.trim() !== '' &&
      comment.trim() !== ''

  };
  const updatePublication = async () => {
    const response = await updateChapterInABook(data, token, publicationId)
    window.location.href = window.location.href;
  }
  const handleDelete = (authorId) => {
    setAuthorIds(authors.filter((id) => id !== authorId));
  };
  if (loading) {
    return (<Stack>
      <Typography>Loading</Typography>
    </Stack>)
  }
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



      </Stack>
      <Button onClick={updatePublication} startIcon={<Save />} variant='contained'>Save</Button>
    </Stack>
  );
}
