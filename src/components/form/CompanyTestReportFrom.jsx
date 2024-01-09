import React, { useState } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Icon,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData } from '../../store/dataSlice';
import { increase } from '../../store/pageNumberSlice';
import SearchInput from '../input/SearchInput';

export default function CompanyTestReportFrom() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);
  const dispatch = useDispatch();
  const data = {
    title,
    date,
    companyName,
    authors,
    comment
  };

  const isFormValid = () => {
    return title.trim() !== '' && date.trim() !== '' && companyName.trim() !== '' && comment.trim() !== '';
  };

  return (
    <Stack borderRadius={5}>
      <Stack direction='row' alignItems='center' justifyContent='center' mt={2}>
        <Icon icon="charm:search" width={50} height={50} />
        <Typography variant='h3'>Company Test Report</Typography>
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
          label="Company Name"
          fullWidth
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
