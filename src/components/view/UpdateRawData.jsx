import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, LinearProgress, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import UpdatePreviewImage from '../input/UpdatePreviewImage';
import { useDispatch, useSelector } from 'react-redux';

import RawDataUpdateInput from '../input/RawDataUpdateInput';

import Backdrop from '@mui/material/Backdrop';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import axios from 'axios';
import { createRawDataFile } from '../../services/newRawData/RawDataFileService';
import { Add, QuestionAnswer, QuestionMark, UploadOutlined } from '@mui/icons-material';
import HelperComponent from './HelperComponent';
import HelperComponentV2 from './HelverComponentv2';
import { addRawData, createRawData, updateRawData } from '../../services/newRawData/RawDataService';
import { useUserContext } from '../../hooks/AuthProvider';

export default function UpdateRawData({ boxKey, headerIndex, handleClose, fileId, handleData, refreshHandler }) {
  const [name, setName] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [comment, setComment] = useState('');
  const [priceSuggestion, setPriceSuggestion] = useState('');
  const [rawDataUrl, setRawDataUrl] = useState('');
  const [rawDataEx, setRawDataEx] = useState('');
  const [previewEx, setPreviewEx] = useState('');
  const [isSave, setIsSave] = useState(false)
  const [previewImage, setPreviewImage] = useState(null);
  const [rawData, setRawData] = useState(null);
  const { token } = useUserContext()
  const [uploud, setUploud] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0);

  const isSaveDisabled = !name || !comment || !priceSuggestion || !rawDataUrl || !previewUrl;

  const uplodRawData = (data) => {
    setRawData(data)
  }
  const uplodPreview = (data) => {
    setPreviewImage(data)
  }




  const handleSave = async () => {

    const data = {
      name: name,
      previewUrl: previewUrl,
      comment: comment,
      priceSuggestion: priceSuggestion,
      rawDataUrl: rawDataUrl,
      saveInfo: false,
      rawDataEx: rawDataEx,
      previewEx: previewEx
    }
    console.log(data)
    setUploud(true)


    addRawData(data, { rawData, previewImage }, fileId, token, onUploadProgres => {
      const percentage = Math.round((onUploadProgres.loaded / onUploadProgres.total) * 100);
      setUploadProgress(percentage);

    }).then(async (response) => {
      handleData(response.data)
    
      handleClose()
      refreshHandler()
    }).catch(e=>{
      console.error(e);
    })




  };
  return (

    <Stack justifyContent="start">
      {uploud ? <Stack spacing={1}
        mt={1}
        p={2}
        maxWidth={200}
        justifyContent="center"
        borderRadius={8}
        boxShadow="rgba(0, 0, 0, 0.32) 1px 0px 3px, rgba(0, 0, 0, 0.32) 0px 1px 2px"
        sx={{ backgroundColor: 'background.paper', margin: '10px' }}>
        <LinearProgress variant="determinate" value={uploadProgress} />
        {
          uploadProgress === 100 && <Stack>
            <Typography>Download complete</Typography>
            <Typography>Raw data : {name}</Typography>
            <Typography>{comment}</Typography>
            <Button startIcon={<Add/>} variant='outlined' onClick={() => { handleClose(); refreshHandler()}}>Now Add RawData</Button>
          </Stack>

        }


      </Stack> : <>
        <Stack direction="row">

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleClose}
          >
            <Icon icon="material-symbols:delete" color="white" width={'20px '} height={'20px'} />
          </Button>
          {!isSave && (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleSave()}
              disabled={name == "" || comment == "" || priceSuggestion == "" || previewImage == null || rawData == null}
            >
              <UploadOutlined sx={{ color: "white" }} />
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
                helperText="Type the raw data/ specimen's name as given in the article. e.g;K1"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Stack direction="row">
                <RawDataUpdateInput setRawDataUrl={setRawDataUrl} setRawDataEx={setRawDataEx} uploudRawData={uplodRawData} />

              </Stack>

              <Stack direction="row">
                <UpdatePreviewImage icon={'mdi:image-outline'} text="Select Preview Image" setPreviewUrl={setPreviewUrl} setPreviewEx={setPreviewEx} uploudPreview={uplodPreview} />

              </Stack>
              <TextField
                color="success"
                label="Comment"
                size="small"
                rows="2"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <TextField
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

      </>}

    </Stack>

  );
}
