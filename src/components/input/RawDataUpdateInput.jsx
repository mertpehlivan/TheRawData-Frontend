import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, Stack, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';

const RawDataUpdateInput = ({ setRawDataUrl ,setRawDataEx,uploudRawData}) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    uploudRawData(file)
    console.log("File type:", file.type);
  
    if (!file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);
      setRawDataUrl(fileUrl);
  
      // Dosya uzantısını yazdır
      const fileExtension = file.name.split('.').pop();
      setRawDataEx(fileExtension)
      console.log('Dosya Uzantısı:', fileExtension);
    }
  
    setFiles([...acceptedFiles]);
  }, [setRawDataUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '!image/*', // Exclude image files
  });

  const fileList = files.map((file) => (
    <li key={file.path} style={fileItemStyle}>
      <Box sx={fileInfoStyle}>
        <Box>
          <Typography sx={fileSizeStyle}>{convertBytesToMB(file.size)} MB</Typography>
        </Box>
        <Box sx={fileIconContainerStyle}>
          <InsertDriveFileIcon fontSize="small" />
        </Box>
      </Box>
    </li>
  ));

  const containerStyle = useMemo(
    () => ({
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
    []
  );

  const dropzoneContainerStyle = useMemo(
    () => ({
      border: `2px dashed ${isDragActive ? '#3f51b5' : '#cccccc'}`,
      borderRadius: '4px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      position: 'relative',
      marginBottom: '20px',
    }),
    [isDragActive]
  );

  return (
    <section style={containerStyle}>
      <div {...getRootProps({ className: 'dropzone' })} style={dropzoneContainerStyle}>
        <input {...getInputProps()} />
        <CloudUploadIcon style={uploadIconStyle} />
        <Typography >Upload raw data file</Typography>
        {files.length > 0 && (
          <Stack direction="row" alignItems="center" justifyContent="center" bgcolor="primary.main" color="white" p={0.3} borderRadius={2}>
            <Check/>
            <Typography  >Data Uplouded</Typography>
          </Stack>
        )}
      </div>
      <aside style={filesContainerStyle}>
        
      </aside>
    </section>
  );
};

const uploadIconStyle = {
  fontSize: '48px',
  color: '#3f51b5',
};

const uploadText = {
  marginTop: '10px',
  fontSize: '16px',
  color: '#777',
};

const filesContainerStyle = {
  width: '100%',
  maxWidth: '400px',
};

const filesHeaderStyle = {
  fontSize: '18px',
  color: '#333',
  marginBottom: '10px',
};

const filesListStyle = {
  listStyle: 'none',
  padding: '0',
};

const fileItemStyle = {
  marginBottom: '12px',
};

const fileInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const fileNameStyle = {
  fontSize: '16px',
  color: '#333',
  marginBottom: '5px',
};

const fileSizeStyle = {
  fontSize: '14px',
  color: '#777',
};

const fileIconContainerStyle = {
  marginLeft: '10px',
};

const convertBytesToMB = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2); // Convert bytes to megabytes and round to 2 decimal places
};

export default RawDataUpdateInput;
