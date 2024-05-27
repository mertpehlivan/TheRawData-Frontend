
import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Button, IconButton, InputAdornment, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import UpdatePreviewImage from '../input/UpdatePreviewImage';
import RawDataUpdateInput from '../input/RawDataUpdateInput';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { Close, SpaceBar, Update, UploadOutlined } from '@mui/icons-material';
import { updateRawData } from '../../services/newRawData/RawDataService';
import { useUserContext } from '../../hooks/AuthProvider';
import DataBox from './DataBox';
import { FileIcon, defaultStyles } from 'react-file-icon';



const SummaryBox = ({ simpleData }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL
  return (
    <Box>
      <Stack
        spacing={1}
        mt={1}
        p={2}
        maxWidth={200}
        justifyContent="center"
        borderRadius={8}
        boxShadow="rgba(0, 0, 0, 0.32) 1px 0px 3px, rgba(0, 0, 0, 0.32) 0px 1px 2px"
        sx={{ backgroundColor: 'background.paper', margin: '10px' }}
      >


        <Stack direction="row" spacing={1} mt={1}>
          <Box width={20}>
            <FileIcon extension={simpleData.rawDataExtension} {...defaultStyles.docx} />
          </Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant='h5' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>{simpleData.title}</Typography>

          </Stack>

        </Stack>
        <Box
          width={250}
          height={200}
          component="img"
          src={simpleData.changeImage == null ? `${baseUrl}/api/v1/auth/previewImage/${simpleData.previewImageUrl}` : simpleData.changeImage}
          sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
        <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{simpleData.comment}</Typography>
        <Box>
          <Stack spacing={1} direction="row" alignItems="center" width={40} border="1px solid" borderColor="primary.main" borderRadius={3} p={1} >
            <Typography variant='h6' color="primary.main">{`${simpleData.price}$`}</Typography>

          </Stack>
        </Box>

      </Stack>
    </Box>)

}


export default function UpdateRawDataBackdrop({ handleOpen, handleClose, open, simpleData, refreshHandler }) {
  const [name, setName] = useState(simpleData.title);
  const [previewUrl, setPreviewUrl] = useState("");
  const [comment, setComment] = useState(simpleData.comment);
  const [priceSuggestion, setPriceSuggestion] = useState(simpleData.price);
  const [rawDataUrl, setRawDataUrl] = useState('');
  const [rawDataEx, setRawDataEx] = useState(simpleData.rawDataExtension);
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
  useEffect(() => {
    setName(simpleData.title)
    setComment(simpleData.comment)
    setPreviewUrl(null)
    setPreviewEx("")
    setPriceSuggestion(simpleData.price)
    setRawDataEx("")
    setPreviewEx("")
    setPreviewImage(null)
    setRawData(null)
  }, [open]);



  const handleDelete = () => {
    setName("")
    setPreviewUrl("")
    setPreviewEx("")
    setPriceSuggestion("")
    setRawDataEx("")
    setPreviewEx("")
    setPreviewImage(null)
    setRawData(null)
    setUploud(false)
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

    try {
      const response = await updateRawData(data, { rawData, previewImage }, simpleData.id, token, onUploadProgres => {
        const percentage = Math.round((onUploadProgres.loaded / onUploadProgres.total) * 100);
        setUploadProgress(percentage);
        setUploud(true)
      });
      console.log(response)
      window.location.reload();
      handleClose()
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div>


      {open &&
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}

        >

          <Stack bgcolor="white" p={1} borderRadius={3} spacing={2}>
            <Stack direction="row" justifyContent="flex-end">
              <Button onClick={() => { handleClose(); handleDelete() }} color='error' variant='contained'><Close /></Button>
            </Stack>
            <Stack direction="row" p={6} alignItems="center">


              <SummaryBox simpleData={{ title: name, previewImageUrl: simpleData.previewImageUrl, changeImage: previewUrl, price: priceSuggestion, comment: comment, rawDataExtension: rawDataEx }} />
              <Stack justifyContent="start">
                {uploud ? <Stack spacing={1}
                  mt={1}
                  p={2}
                  maxWidth={200}
                  justifyContent="center"
                  border="1px solid" borderRadius={3} borderColor="primary.main"

                >
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  {
                    uploadProgress == 100 && <Stack >
                      <Typography>Uploaded complete</Typography>
                      <Typography>Raw data : {name}</Typography>
                      <Typography>{comment}</Typography>
                      <Button variant='contained' color='error' onClick={() => { handleClose() }}>Close</Button>
                    </Stack>

                  }


                </Stack> : <>

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
                  <Stack direction="row">


                    {(
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => handleSave()}
                        
                      >
                        <Update sx={{ color: "white" }} />
                        Update
                      </Button>
                    )}

                  </Stack>
                </>}

              </Stack>
            </Stack>
          </Stack>
        </Backdrop>}

    </div>

  )
}


