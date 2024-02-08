import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {
  Stack,
  Avatar,
  Button,
  Typography,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import { uploadProfileImage } from '../../services/fileService';
import { useUserContext } from '../../hooks/AuthProvider';

const sanitizeFileName = (filename) => {
  // Replace non-alphanumeric characters (except dots and hyphens) with underscores
  return filename.replace(/[^\w.-]/g, '_');
};

export default function BackdropComponent({ handleClose,setImage }) {
  const [helperText, setHelperText] = useState('');
  const { token } = useUserContext();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (accepted) => {
      if (accepted.length > 0) {
        const sanitizedFileName = sanitizeFileName(accepted[0].name);
        setAvatarPreview(URL.createObjectURL(accepted[0]));
        accepted[0] = new File([accepted[0]], sanitizedFileName, { type: accepted[0].type });
        setImage(URL.createObjectURL(accepted[0]))
        try {
          const response = await uploadProfileImage(token, accepted[0]);
          setHelperText(response);
        } catch (error) {
          console.error('Error uploading file:', error);
          setHelperText('Error uploading file. Please try again.');
        }
      }
    },
  });

  const handleFileUpload = async () => {
    if (acceptedFiles.length > 0) {
      try {
        const response = await uploadProfileImage(token, acceptedFiles[0]);
        setHelperText(response);
      } catch (error) {
        console.error('Error uploading file:', error);
        setHelperText('Error uploading file. Please try again.');
      }
    }
  };

  return (
    <Stack bgcolor="white" p={4} width={500}>
      <Stack direction="row" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="error" onClick={()=>{handleClose();setAvatarPreview(null);setHelperText("")}}>
          X
        </Button>
      </Stack>

      <Stack>
        {helperText === '' ? (
          <section className="container">
            <Stack border="2px solid" color="primary.main" borderRadius={2} p={2}>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag or click to select image</p>
              </div>
            </Stack>
            <aside>
              <h4>Files</h4>
              <ul>
                {acceptedFiles.map((file) => (
                  <li key={file.path}>
                    {file.path} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </aside>
            {avatarPreview && (
              <Stack mt={2}>
                <Avatar
                  alt="Avatar Preview"
                  src={avatarPreview}
                  sx={{ width: 100, height: 100 }}
                />
              </Stack>
            )}
            {acceptedFiles.length > 0 && (
              <Button variant="contained" color="primary" onClick={handleFileUpload}>
                Save
              </Button>
            )}
          </section>
        ) : (
          <Stack direction="row" border="1px solid" borderRadius={2} p={1}>
            <Check sx={{ height: 50, width: 50, color: 'primary.main' }} />
            <Typography variant="h5" sx={{ color: 'primary.main' }}>
              {helperText}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
