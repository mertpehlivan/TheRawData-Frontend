import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Stack, TextField, Typography } from '@mui/material';
import SearchInput from '../input/SearchInput';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData, clearData } from '../../store/dataSlice';
import { format, increase } from '../../store/pageNumberSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';

export default function ResearchProjectForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);

  const dispatch = useDispatch();
  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
  const data = {
    title,
    date,
    comment,
    authors,
  };

  const isFormValid = () => {
    return title.trim() !== '' && date.trim() !== '';
  };

  const handleNext = () => {
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
        <TextField
          size='small'
          fullWidth
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
      </Stack>
      <Stack height={"100%"} direction="row" justifyContent="end" alignItems="end" spacing={2}>
        <Button
          color='error'
          variant='outlined'
          onClick={handlerCancel}
          href='/'
        >
          Cancel
        </Button>
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
