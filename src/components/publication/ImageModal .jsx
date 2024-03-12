import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <Modal
      open={true} // Modal'ı açık tutmak için state kullanmayı tercih edebilirsiniz
      onClose={onClose} // Modal dışına tıklanınca veya kapat butonuna basılınca kapat
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: 24,
          textAlign: 'center'
        }}
      >
        <img
          src={imageUrl}
          alt="Preview"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '8px'
          }}
        />
        <CloseIcon
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            cursor: 'pointer'
          }}
          onClick={onClose}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal;
