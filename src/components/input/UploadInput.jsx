import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel'; // Çarpı işareti için yeni ekledik
import { Icon } from '@iconify/react';
import { FormHelperText, Stack, Typography } from '@mui/material';
import { Check, Delete } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadInput({only, icon, text, helpText, setPreviewUrl, setPreviewEx, fileId }) {
  const [selectedFile, setSelectedFile] = React.useState(only);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Dosya uzantısını alma  
      const fileExtension = file.name.split('.').pop();
      setPreviewEx(fileExtension)
      console.log('Dosya Uzantısı:', fileExtension);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
   
  };

  return (
    <Stack spacing={1}>
      <Button
        fullWidth
        sx={{ height: "100%", bgcolor: (selectedFile ? "skyblue" : "primary.main") }}
        component="label"
        variant="contained"

        startIcon={selectedFile ? <Check sx={{ width: 50, height: 50 }} /> : <Icon icon={icon} color="white" />}
      >
        {text}
        {!selectedFile && <VisuallyHiddenInput type="file" onChange={handleFileChange} />}
      </Button>
      {selectedFile && <Button startIcon={<Delete/>} variant="outlined" color='error' onClick={() => selectedFile && handleClearFile()}>
        Delete
      </Button>}

    </Stack>
  );
}
