import React, { useState } from 'react';
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
import SearchInput from '../input/SearchInput';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { Link } from 'react-router-dom';
import PdfForm from './PdfForm';
import SearchInputV2 from '../input/SearchInputV2';

export default function CompanyTestReportFrom() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [comment, setComment] = useState('');
  const [authors, setAuthorIds] = useState([]);

  const [pdf, setPdf] = useState({
    pdfStatus: true,
    addOnly: true,
  })
  const [fileUrl, setFileUrl] = useState(null)
  const [fileEx, setFileEx] = useState("")
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
    companyName,
    authors,
    comment,
    pdf,
    fileEx,
    fileUrl
  };
  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    if (newComment.length <= 2000) {
      setComment(newComment);
    }
  };
  const isFormValid = () => {
    return title.trim() !== '' && date.trim() !== '' && companyName.trim() !== '' && comment.trim() !== '' &&
      (pdf.pdfStatus == true ? (fileUrl != null ? (fileEx === "pdf" ? true : false) : false) : true)
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
        <SearchInputV2 setAuthorIds={setAuthorIds} />
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
