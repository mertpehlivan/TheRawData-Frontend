import React, { useState } from 'react';
import SearchInput from '../input/SearchInput';
import {
  Stack,
  Typography,
  TextField,
  Icon,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link } from 'react-router-dom';
import PdfForm from './PdfForm';

export default function ChapterInABook() {
  const [title, setTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [date, setDate] = useState('');
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
  })
  const [fileUrl, setFileUrl] = useState(null)
  const [fileEx, setFileEx] = useState("")

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
    date,
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
  }
  const isFormValid = () => {
    return title.trim() !== '' &&
      chapterNumber.trim() !== '' &&
      bookTitle.trim() !== '' &&
      date.trim() !== '' &&
      pages.trim() !== '' &&
      doi.trim() !== '' &&
      publisher.trim() !== '' &&
      isbn.trim() !== '' &&
      editor.trim() !== '' &&
      comment.trim() !== '' &&
      (pdf.pdfStatus == true ? (fileUrl != null ? (fileEx === "pdf" ? true : false) : false) : true)

  };
  const handleDelete = (authorId) => {
    setAuthorIds(authors.filter((id) => id !== authorId));
  };

  return (
    <Stack borderRadius={5}>
      <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
        <Icon icon="material-symbols:article" width={50} height={50} />
        <Typography variant='h3'>Chapter In A Book</Typography>
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
          fullWidth
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
          onChange={(e) => setComment(e.target.value)}
        />
        <SearchInput setAuthorIds={setAuthorIds} authorIds={authors} />
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
            disabled={!isFormValid()} // Butonu devre dışı bırak
            onClick={() => {
              if (isFormValid()) {
                dispatch(addData(data));
                dispatch(increase());
              } else {
                // Form geçerli değilse bir uyarı göster veya istediğiniz bir işlemi gerçekleştirin
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
