import React, { useState } from 'react';
import { MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import SearchInput from '../input/SearchInput';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addData } from '../../store/dataSlice';
import { increase } from '../../store/pageNumberSlice';

export default function ThesisForm() {
  const [title, setTitle] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [pages, setPages] = useState('');
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([])
  const [isValid, setIsValid] = useState(true); // Kontrol eklemek için bir state ekledik
  const dispatch = useDispatch();

  const data = {
    title,
    degree,
    university,
    pages,
    authors,
    comment
  };
  const handleCommentChange = (e) => {
    const newComment = e.target.value;

    // Sınırı kontrol et
    if (newComment.length <= 2000) {
      setComment(newComment);
    }
  };

  const isFormValid = () => {
    return title.trim() !== '' && degree.trim() !== '' && university.trim() !== '' && pages.trim() !== '' && comment.trim() !== '';
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
          <MenuItem value={"Professor"}>Professor</MenuItem>
          <MenuItem value={"Associate professor"}>Associate</MenuItem>
          <MenuItem value={"Dr. Lecturer"}>Dr. Lecturer</MenuItem>
          <MenuItem value={"Lecturer"}>Lecturer</MenuItem>
          <MenuItem value={"Research Assistant"}>Research Assistant</MenuItem>
        </Select>
      </Stack>
      <Stack mx={4} spacing={5} mt={2} direction='row'>
        <TextField
          size='small'
          label="University"
          fullWidth
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        <TextField
          size='small'
          fullWidth
          label="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </Stack>
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={handleCommentChange}
        
      />
      <div style={{ textAlign: 'right', color: comment.length > 2000 ? 'red' : 'inherit' }}>
        {comment.length}/2000
      </div>
      <SearchInput setAuthorIds={setAuthorIds} authorIds={authors} />

      <Stack height={"100%"} direction="row" justifyContent="end" alignItems="end" spacing={2}>
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
