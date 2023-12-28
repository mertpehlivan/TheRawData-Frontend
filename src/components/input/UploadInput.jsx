import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel'; // Çarpı işareti için yeni ekledik
import { Icon } from '@iconify/react';
import { FormHelperText, Stack, Typography } from '@mui/material';

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

export default function UploadInput({ icon, text, helpText, setPreviewUrl,setPreviewEx }) {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);

    // Dosya uzantısını alma
    const fileExtension = file.name.split('.').pop();
    setPreviewEx(fileExtension)
    console.log('Dosya Uzantısı:', fileExtension);
};

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<Icon icon={icon} color="white" />}
      >
        {text}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      {selectedFile && (
        <Stack justifyContent="center" mt={1}>
          
          <Button
            variant="outlined"
            color="error" // Hata rengi için kullanılabilir
            onClick={handleClearFile}
            sx={{
              maxWidth:"200px"
            }}
            
          >
            <FormHelperText><Typography fontSize={8}>{selectedFile.name}</Typography></FormHelperText>
            <CancelIcon />
          </Button>
        </Stack>
      )}
      {helpText && <p>{helpText}</p>}
    </div>
  );
}
