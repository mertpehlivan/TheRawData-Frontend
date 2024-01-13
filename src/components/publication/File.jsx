import { Box, Divider, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import DataBox from './DataBox';
import { AddCircleRounded, Create, Delete, HdrPlus, PlusOne, Save } from '@mui/icons-material';
import { updateRawDataFile } from '../../services/newRawData/RawDataFileService';
import { useUserContext } from '../../hooks/AuthProvider';
import RawDataInput from '../input/RawDataInput';
import UploadBox from '../view/UploadBox';

export default function File({ file, counter, editMode }) {
  const chunkedRawDatas = chunkArray(file.rawDatas, 3);
  const [editFileMode,setEditFileMode] = useState(false)
  const [fileName,setFileName]=useState(file.title)
  const [editRawData,setEditRawData] = useState(false)
  const {token} = useUserContext()
  const fileNameUpdate = async (id,title)=>{
    console.log(file)
    updateRawDataFile(title,id,token).then(res=>{
      setEditFileMode(false);
      file.title = fileName;
    }).catch(e=>{})
  }

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 8, borderColor: 'primary.main', border: '1px solid', mb: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        {!editFileMode && <Stack alignItems="center">
          <Typography variant="h6" mb={2} fontWeight="bold" color="primary.main" >
            {fileName}
          </Typography>
        </Stack>}
        {editFileMode && editMode && <Stack alignItems="center">
          <TextField size='small' type='text' value={fileName} onChange={(e)=>setFileName(e.target.value)}/>
        </Stack>}
        {editFileMode && editMode && <IconButton onClick={() => fileNameUpdate(file.id, fileName)} sx={{ width: 25, height: 25 }}><Save /></IconButton>}
        {editFileMode && editMode && <IconButton onClick={()=>setEditFileMode(false)} sx={{ width: 25, height: 25 }}><Delete /></IconButton>}
        {editMode && !editFileMode && <IconButton onClick={()=>setEditFileMode(prev=>!prev)} sx={{ width: 25, height: 25 }}><Create /></IconButton>}
      </Stack>

      <Divider sx={{ my: 2 }} />
      {chunkedRawDatas.map((row, rowIndex) => (
        <Stack key={rowIndex} spacing={2} justifyContent="center" direction="row" flexWrap="wrap">
          {row.map((rawData, colIndex) => (
            <DataBox counter={counter} key={colIndex} rawData={rawData} fileId={file.id} />
          ))}
          {editRawData && <UploadBox/>}
          {editMode && <Stack direction="row" alignItems="center"><IconButton onClick={()=>{setEditRawData(prev=>!prev)}}><AddCircleRounded sx={{width:45,height:45,color:"primary.main"}}/></IconButton></Stack>}
        </Stack>
      ))}
      
    </Paper>
  );
}

// Function to chunk an array into smaller arrays with a specified size
function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}
