import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
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
import { addRawDataForPublication, updateRawData } from '../../store/basketPublicationSlice';
import { Delete, Edit } from '@mui/icons-material';
import UpdateRawData from '../view/UpdateRawData';
import UpdateRawDataBackdrop from './UpdateRawDataBackdrop';
import { useUserContext } from '../../hooks/AuthProvider';
import { deleteRawData } from '../../services/newRawData/RawDataService';
import ImageModal from './ImageModal '
export default function DataBox({ rawData, fileId, counter, editMode, refreshHandler, onDeleteRawData }) {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [open, setOpen] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { token } = useUserContext();
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleRefresh = () => {
    refreshHandler()
  }
  const fetchDeleteRawData = async () => {
    setDeleteLoading(true)
    const response = await deleteRawData(rawData.id, token);
    setDeleteLoading(false)
    await onDeleteRawData(rawData.id)

  }

  const [select, setSelect] = useState(false);
  useEffect(() => {
    checkIfRawDataExists(rawData.id).then(res => {
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
    setLoading(true)
    try {
      if (select) {
        await deleteBasket(id);
        setSelect(false);
        counter()
      } else {
        await addBasket(id);
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
    } finally {
      setLoading(false)
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
        <UpdateRawDataBackdrop handleClose={handleClose} handleOpen={handleOpen} open={open} simpleData={rawData} refreshHandler={handleRefresh} />
        {editMode && <Stack direction="row" spacing={1}>
          <Button fullWidth variant='outlined' startIcon={<Edit />} onClick={handleOpen}>Edit</Button>
          <Button disabled={deleteLoading} onClick={fetchDeleteRawData}>{deleteLoading ? <CircularProgress /> : <Delete />}</Button>
        </Stack>}
        <Stack direction="row" spacing={1} mt={1}>
          <Box width={20}>
            <FileIcon extension={rawData.rawDataExtension} {...defaultStyles.docx} />
          </Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Typography variant='h5' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>{rawData.title}</Typography>

          </Stack>

        </Stack>

        <Box
          width={250}
          height={200}
          component="img"
          src={`${baseUrl}/api/v1/auth/previewImage/${rawData.previewImageUrl}`}

          sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'fill', borderRadius: '8px', cursor: "pointer" }}
          onClick={handleImageClick}
        />

        {modalOpen && (
          <ImageModal
            imageUrl={`${baseUrl}/api/v1/auth/previewImage/${rawData.previewImageUrl}`} // Resmin URL'sini modal bileşenine geçir
            onClose={handleCloseModal} // Modal kapatma işlevini geçir
          />
        )}
        <Stack>
          <Typography>Comment:</Typography>
          <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{rawData.comment}</Typography>
        </Stack>

        <Box>
          <Stack spacing={1} direction="row" alignItems="center" width={40} border="1px solid" borderRadius={3} p={1} >
            <Typography variant='h6' color="primary.main">{`${rawData.price}$`}</Typography>
            {<IconButton
              onClick={() => { handleAddToCart(rawData.id) }}
              sx={{ padding: '8px', backgroundColor: select ? 'red' : 'primary.main', borderRadius: '50%', '&:hover': { backgroundColor: select ? 'red' : 'primary.dark' } }}
            >
              <Stack>


                {loading && <CircularProgress sx={{ color: !select ? "red" : "primary.main" }} style={{ position: "absolute", width: 40, height: '40', top: -2, left: -2 }} />}
                {!select ? <AddShoppingCartIcon sx={{ color: 'white' }} /> : <RemoveShoppingCartIcon sx={{ color: 'white' }} />}
              </Stack>
            </IconButton>}
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
    </Box>
  );
}
