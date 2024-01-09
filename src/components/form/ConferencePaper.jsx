import React, { useState } from 'react';
import { Stack, Typography, TextField, Icon, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData } from '../../store/dataSlice';
import { increase } from '../../store/pageNumberSlice';
import SearchInput from '../input/SearchInput';

export default function ConferencePaper() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [conferenceName, setConferenceName] = useState('');
  const [location, setLocation] = useState('');
  const [pages, setPages] = useState('');
  const [doi, setDoi] = useState('');
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);
  const dispatch = useDispatch();
  const data = {
    title,
    date,
    conferenceName,
    location,
    pages,
    doi,
    authors,
    comment
  };

  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      date.trim() !== '' &&
      conferenceName.trim() !== '' &&
      location.trim() !== '' &&
      pages.trim() !== '' &&
      doi.trim() !== '' &&
      comment.trim() !== ''
    );
  };

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
          label="DOI"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
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
        <Stack height={"100%"} direction="row" justifyContent="end" alignItems="end" spacing={2}>
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
