import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Snackbar,
  SnackbarContent,
  Stack,
  Typography
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { addBasket, checkIfRawDataExists, deleteBasket } from '../../services/newData/basketService';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRawData, addRawDataForPublication, updateRawData } from '../../store/basketPublicationSlice';

export default function DataBox({ rawData, fileId, counter }) {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const data = useSelector(state => state.basketPublication.value);
  const [select, setSelect] = useState(false);
  useEffect(() => {
    checkIfRawDataExists(rawData.id).then(res=>{
      setSelect(res);
    })
  }, [counter]);


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const basketHandler = async (id) => {
    try {
      if (select) {
        await deleteBasket(id);
        dispatch(deleteRawData({ fileId, rawDataId: rawData.id }));
        setSelect(false);
        counter()
      } else {
        await addBasket(id);
        console.log(fileId);
        dispatch(updateRawData({
          fileId: fileId,
          rawDataExtension: rawData.rawDataExtension,
          id: rawData.id,
          title: rawData.title
        }));
        counter()
        setSelect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAddToCart = async (id) => {
    await basketHandler(id);

    if (select) {
      setSnackbarMessage(`${rawData.title} removed from the cart`);
    } else {
      setSnackbarMessage(`${rawData.title} added to the cart`);
    }

    setSnackbarOpen(true);
  };

  return (
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
          <FileIcon extension={rawData.rawDataExtension} {...defaultStyles.docx} />
        </Box>
        <Typography variant='h5' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>{rawData.title}</Typography>
      </Stack>

      <Box
        width={250}
        height={200}
        component="img"
        src={`http://localhost:8080/api/v1/auth/previewImage/${rawData.previewImageUrl}`}
        sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '8px' }}
      />
      <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{rawData.comment}</Typography>
      <Box>
        <Stack spacing={1} direction="row" alignItems="center" width={40} border="1px solid" borderRadius={3} p={1} >
          <Typography variant='h6' color="primary.main">{`${rawData.price}$`}</Typography>
          <IconButton
            onClick={() => { handleAddToCart(rawData.id) }}
            sx={{ padding: '8px', backgroundColor: select ? 'red' : 'primary.main', borderRadius: '50%', '&:hover': { backgroundColor: select ? 'red' : 'primary.dark' } }}
          >
            {!select ? <AddShoppingCartIcon sx={{ color: 'white' }} /> : <RemoveShoppingCartIcon sx={{ color: 'white' }} />}
          </IconButton>
        </Stack>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={snackbarMessage}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
          }}
        />
      </Snackbar>
    </Stack>
  );
}
