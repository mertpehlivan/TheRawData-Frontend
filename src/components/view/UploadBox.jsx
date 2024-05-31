import React, { useState } from 'react';
import { Button, Checkbox, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import UploadInput from '../input/UploadInput';
import { useDispatch, useSelector } from 'react-redux';
import { addRawData, deleteDataBox } from '../../store/rawDataSlice';
import RawDataInput from '../input/RawDataInput';

import Backdrop from '@mui/material/Backdrop';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import axios from 'axios';
import { createRawDataFile } from '../../services/newRawData/RawDataFileService';
import { QuestionAnswer, QuestionMark } from '@mui/icons-material';
import HelperComponent from './HelperComponent';
import HelperComponentV2 from './HelverComponentv2';

export default function UploadBox({ boxKey, headerIndex }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [comment, setComment] = useState("");
  const [priceSuggestion, setPriceSuggestion] = useState(0);
  const [rawDataUrl, setRawDataUrl] = useState('');
  const [rawDataEx, setRawDataEx] = useState('');
  const [previewEx, setPreviewEx] = useState('');
  const [isSave, setIsSave] = useState(false)
  const [checkFree, setCheckFree] = useState(false)
  const isSaveDisabled = !name || (!checkFree && priceSuggestion == 0) || !rawDataUrl || !previewUrl;
  const rawdata = useSelector((state) => state.rawData)
  const handleCheck = (e) => {
    setCheckFree(e.target.checked)
    if (e.target.checked) {
      setPriceSuggestion(0)
    }
  }
  const handleSave = async () => {
    dispatch(addRawData({
      name,
      previewUrl,
      comment,
      priceSuggestion,
      rawDataUrl,
      index: headerIndex,
      key: boxKey,
      rawDataEx,
      previewEx

    }));
    setIsSave(true)
  };
  return (

    <Stack>

      <Stack direction="row" justifyContent={'end'}>

        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => dispatch(deleteDataBox({ headerIndex: headerIndex, index: boxKey }))}
        >
          <Icon icon="material-symbols:delete" color="white" width={'20px '} height={'20px'} />
        </Button>
        {!isSave && (
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleSave()}
            disabled={isSaveDisabled}
          >
            <Icon icon="material-symbols:save" color="white" width={'20px '} height={'20px'} />
          </Button>
        )}

      </Stack>
      {
        isSave ?
          (
            <Stack
              height={500}
              width={200}
              border="2px solid"
              borderRadius={3}
              borderColor="primary.main"
              mt={2}
              p={2}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Stack alignItems="center" spacing={2}>
                <BeenhereIcon sx={{ width: 100, height: 100 }} />
                <Typography variant="h3" p={2} borderRadius={3}>
                  Saved!
                </Typography>
              </Stack>
              <Stack
                border="2px solid"
                borderRadius={3}
                borderColor="primary.main"
                spacing={1}
                mt={2}
              >
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body1">{comment}</Typography>
              </Stack>
            </Stack>


          )

          :

          <Stack
            alignItems="center"
            spacing={2}
            justifyContent="center"
            bgcolor="background.default"
            p="1rem"
            maxWidth="200px"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          >
            <TextField
              size="small"
              label="Specimen Name"
              helperText="Type the raw data/specimen's name as given in the article. e.g;K1"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Stack direction="row">
              <RawDataInput setRawDataUrl={setRawDataUrl} setRawDataEx={setRawDataEx} />
              <HelperComponent />
            </Stack>
            <Stack direction="row">
              <UploadInput icon={'mdi:image-outline'} text="Select Preview Image" setPreviewUrl={setPreviewUrl} setPreviewEx={setPreviewEx} />
              <HelperComponentV2 />
            </Stack>
            <TextField
              color="success"
              label="Comment (Optional)"
              size="small"
              rows="2"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <TextField
              disabled={checkFree}
              type='number'
              label="Price Suggestion"
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              value={priceSuggestion}
              onChange={(e) => {
                setPriceSuggestion(e.target.value);
              }}

            />


          </Stack>

      }
      <Stack direction="row" alignItems="center" justifyContent="flex-start">
        <Checkbox checked={checkFree} onChange={handleCheck} />
        <Typography>Free data</Typography>
      </Stack>

    </Stack>

  );
}
