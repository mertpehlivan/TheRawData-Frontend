import { Box, Button, CircularProgress, Divider, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataBox from './DataBox';
import { AddCircleRounded, Close, CloseOutlined, CloseRounded, Create, Delete, Edit, HdrPlus, PlusOne, Save } from '@mui/icons-material';
import { updateRawDataFile } from '../../services/newRawData/RawDataFileService';
import { useUserContext } from '../../hooks/AuthProvider';
import RawDataInput from '../input/RawDataInput';
import UploadBox from '../view/UploadBox';
import UpdateRawData from '../view/UpdateRawData';


export default function File({ file, counter, editMode, refreshHandler, setPublication, publication, deleteRawDataFile }) {

  const [editFileMode, setEditFileMode] = useState(false)
  const [fileName, setFileName] = useState(file.title)
  const [editRawData, setEditRawData] = useState(false)
  const { token } = useUserContext()
  const [temData, setTemData] = useState([])
  const [fileOne, setFileOne] = useState(file)
  const chunkedRawDatas = chunkArray(fileOne.rawDatas, 3);
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [rawDatas, setRawDatas] = useState([])
  useEffect(() => {
    setFileOne(file)
    setRawDatas(file.rawDatas)
  }, [file]);


  const handleData = (data) => {
    file.rawDatas.push(data)
  }
  const handleClose = () => {
    setEditRawData(false)
  }

  const deleteRawData = (id) => {
    const newRawDatas = rawDatas.filter(item => item.id !== id);

    setRawDatas(newRawDatas);


  }
  const deleteFile = async () => {
    try {
      setDeleteLoading(true)
      await deleteRawDataFile(file.id)
      setDeleteLoading(false)
    } catch (error) {
      console.log(error)
    }


  }

  const fileNameUpdate = async (id, title) => {
    console.log(file)
    updateRawDataFile(title, id, token).then(res => {
      setEditFileMode(false);
      file.title = fileName;
    }).catch(e => { })
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 8, borderColor: 'primary.main', border: '1px solid', mb: 3 }}>


      <Stack direction="row" alignItems="center" justifyContent="center">
        {!editFileMode && <Stack alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" mb={2} fontWeight="bold" color="primary.main" >
              {fileOne.title}
            </Typography>
            {!editFileMode && editMode && <Stack direction="row" spacing={1}>
              <Button variant='outlined' onClick={() => setEditFileMode(true)} startIcon={<Edit />}>Edit</Button>
              <Button onClick={deleteFile} disabled={deleteLoading} color='error' variant='outlined'>{deleteLoading ? <CircularProgress style={{ color: "red", width: 14, height: 14 }} /> : <Delete />}</Button>
            </Stack>}
          </Stack>


        </Stack>}
        {editFileMode && editMode && <Stack alignItems="center">
          <TextField size='small' type='text' value={fileName} onChange={(e) => setFileName(e.target.value)} />
        </Stack>}
        {editFileMode && editMode && <IconButton onClick={() => fileNameUpdate(file.id, fileName)} sx={{ width: 25, height: 25 }}><Save /></IconButton>}
        {editFileMode && editMode && <IconButton onClick={() => setEditFileMode(false)} sx={{ width: 25, height: 25 }}>{deleteLoading ? <CircularProgress style={{ color: "red", width: 14, height: 14 }} /> : <Delete />}</IconButton>}

      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack  alignItems="stretch">
        <Grid container spacing={2} >
          {rawDatas.map((rawData, index) => (
            <Grid item xs={3} key={index}>
              <DataBox counter={counter} key={index} rawData={rawData} fileId={file.id} editMode={editMode} onDeleteRawData={deleteRawData} />
            </Grid>
          ))}
          <Grid item xs={3} >
            <Stack direction="row">
              {editMode && !editRawData && <Stack direction="row" alignItems="center"><IconButton onClick={() => { setEditRawData(prev => !prev); }}>{editRawData ? <CloseRounded /> : <AddCircleRounded sx={{ width: 45, height: 45, color: "primary.main" }} />}</IconButton></Stack>}
              {editRawData && <UpdateRawData handleData={handleData} handleClose={handleClose} fileId={file.id} refreshHandler={refreshHandler} />}
            </Stack>

          </Grid>
        </Grid>
        {/* {chunkedRawDatas.map((row, rowIndex) => (
          <Stack key={rowIndex} spacing={2} justifyContent="center" direction="row" flexWrap="wrap">
            {row.map((rawData, colIndex) => (
              <DataBox counter={counter} key={colIndex} rawData={rawData} fileId={file.id} editMode={editMode} onDeleteRawData={deleteRawData} />
            ))}

          </Stack>
        ))}
        {
          <Stack spacing={2} justifyContent="center" direction="row" flexWrap="wrap">
            {temData.map((rawData, colIndex) => (
              <DataBox counter={counter} key={colIndex} rawData={rawData} fileId={file.id} editMode={editMode} refreshHandler={refreshHandler} onDeleteRawData={deleteRawData} />
            ))}

          </Stack>
        } */}
      </Stack>


    </Paper>
  );
}

// Function to chunk an array into smaller arrays with a specified size
function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}
