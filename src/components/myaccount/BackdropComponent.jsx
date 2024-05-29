import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {
  Stack,
  Avatar,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import { uploadProfileImage } from '../../services/fileService';
import { useUserContext } from '../../hooks/AuthProvider';

const sanitizeFileName = (filename) => {
  // Replace non-alphanumeric characters (except dots and hyphens) with underscores
  return filename.replace(/[^\w.-]/g, '_');
};

export default function BackdropComponent({ handleClose, setImage }) {
  const [helperText, setHelperText] = useState('');
  const { token } = useUserContext();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (accepted) => {
      if (accepted.length > 0) {
        const sanitizedFileName = sanitizeFileName(accepted[0].name);
        setAvatarPreview(URL.createObjectURL(accepted[0]));
        accepted[0] = new File([accepted[0]], sanitizedFileName, { type: accepted[0].type });
        setImage(URL.createObjectURL(accepted[0]));
        
        try {
          setLoading(true);
          const response = await uploadProfileImage(token, accepted[0]);
          setLoading(false);
          setHelperText("Profile photo uploaded successfully");
         
        } catch (error) {
          console.error('Error uploading file:', error);
          setHelperText('Error uploading file. Please try again.');
          setLoading(false);
        }
      }
    },
  });

  return (
    <Stack bgcolor="white" p={4} width={500}>
      <Stack direction="row" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="error" onClick={() => { handleClose(); setAvatarPreview(null); setHelperText("") }}>
          X
        </Button>
      </Stack>

      <Stack>
        {helperText === '' ? (
          <section className="container">
            <Stack border="2px dashed" color="primary.main" borderRadius={2} p={2} {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant="body1" align="center">Drag or click to select image</Typography>
            </Stack>
            <aside>
              <Stack mt={2} spacing={1}>
                {acceptedFiles.map((file) => (
                  <Typography key={file.path} variant="body2">
                    {file.path} - {file.size} bytes
                  </Typography>
                ))}
              </Stack>
            </aside>
            {avatarPreview && (
              <Stack mt={2} justifyContent="center">
                <Avatar
                  alt="Avatar Preview"
                  src={avatarPreview}
                  sx={{ width: 100, height: 100 }}
                />
              </Stack>
            )}
          </section>
        ) : (
          <Stack direction="row" border="1px solid" borderRadius={2} p={1} alignItems="center">
            <Check sx={{ height: 50, width: 50, color: 'primary.main' }} />
            <Typography variant="h5" sx={{ color: 'primary.main' }}>
              {helperText}
            </Typography>
          </Stack>
        )}
      </Stack>

      {/* Circular Progress Bar */}
      {loading && (
        <Stack mt={2} justifyContent="center">
          <CircularProgress color="primary" />
        </Stack>
      )}
    </Stack>
  );
}
