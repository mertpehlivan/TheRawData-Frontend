import { Avatar, Backdrop, Box, Button, Chip, CircularProgress, Container, Divider, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../hooks/AuthProvider';
import { deletePost, getPost } from '../services/post/postService';
import File from '../components/publication/File';
import PdfButton from '../components/button/PdfButton';
import BasketAcordion from '../components/view/BasketAcordion';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Add, Delete, Download, Edit, Person } from '@mui/icons-material';

import { createRawDataFile, deleteRawDataFileFetch } from '../services/newRawData/RawDataFileService';
import { Icon } from '@iconify/react';
import axios from 'axios';
import FormDialog from '../components/publication/FormDialog';
export default function PublicationPage() {
  const { publicationId } = useParams();
  const [publication, setPublication] = useState(null);
  const { token } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [fileLoading, setFileLoading] = useState(false);
  const [basket, setBasket] = useState([])
  const [requestCounter, setRequestCounter] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const { user } = useUserContext()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [formDialog,setFormDialog] = useState(false)
  const navigate = useNavigate()
  const postDelete = async () => {
    try {
      setDeleteLoading(true)
      const response = await deletePost(token, publicationId)
      navigate("/explore", { replace: true })
    } catch (error) {

    } finally {
      setDeleteLoading(false)
    }

  }

  const handlerFormDialog = () =>{
    setFormDialog(false)
  }
  const handlerFormDialogOpen = () =>{
    setFormDialog(true)
  }
  const handleDownload = (publicationId, name) => {
    axios.get(`${baseUrl}/api/v1/files/pdf/${publicationId}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log(response); // Yanıtı konsola yazdır
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => {
        console.error('Dosya indirilemedi:', error);
      });
  };
  const refreshHandler = () => {
    console.log("click")
    setRefresh(prev => prev + 1)
  }
  const createFile = () => {
    setFileLoading(true)
    createRawDataFile("Type the name of the raw data", publicationId, token).then(() => {
      refreshHandler();
      setFileLoading(false)
    })
  }
  const deleteRawDataFile = async (id) => {
    const response = await deleteRawDataFileFetch(id, token);
    const newRawDataFile = await publication.rawdatafiles.filter(item => item.id !== id);
    console.log("NEW RAW DATA FİLE ", newRawDataFile)
    setPublication(prev => ({
      ...prev,
      rawdatafiles: newRawDataFile
    }));

  }
  useEffect(() => {

    const getPostHandler = async () => {
      setLoading(true)
      try {
        const res = await getPost(token, publicationId);
        setPublication(res.data);
        console.log("Datalar:", res.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    getPostHandler();
  }, [token, publicationId]);
  useEffect(() => {

    const getPostHandler = async () => {

      try {
        const res = await getPost(token, publicationId);

        setPublication(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    getPostHandler();
  }, [refresh]);
  const counterRequest = () => {
    setRequestCounter(prev => prev + 1);
  }
  if (loading) {
    return (
      <Container sx={{ mt: 15 }}>


        <Stack bgcolor="white" p={2} borderRadius={3}>
          <Skeleton height={40} width="80%" />
          <Skeleton height={20} width="60%" />
          <Skeleton height={20} width="40%" />
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="60%" />
          {/* Add more skeletons as needed */}
        </Stack>
      </Container>)
  }
  const baseUrl = process.env.REACT_APP_BASE_URL
  return (
    <Container sx={{ mt: "100px" }} maxWidth="lg">
      {!loading && <>{user.id == publication.userId && <Button onClick={() => setEditMode(prev => !prev)} variant='contained' endIcon={editMode ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}>Edit Publcation</Button>}</>}
      <BasketAcordion requestCounter={requestCounter} counterRequest={counterRequest} />
      <Stack bgcolor="background.default" p={2} spacing={1} borderRadius={3}>
        <FormDialog type={`${publication.publicationType}`} handleFormDialog={handlerFormDialog} setFormDialog={setFormDialog} formDialog={formDialog}/>
        {!loading && (
          <>
            <Stack >
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Stack spacing={1}>
                  <Stack justifyContent="space-between" spacing={1}>
                    <Stack direction="row" spacing={1}>
                      {editMode && <Button onClick={postDelete} variant='outlined' color='error' startIcon={deleteLoading ? <CircularProgress sx={{ color: "red", width: 14, height: 14 }} /> : <Delete />}>Delete Publication</Button>}
                      {editMode && <Button onClick={handlerFormDialogOpen} variant='outlined' startIcon={<Edit />}>Edit</Button>}
                    </Stack>

                    <Typography variant="h4">{publication.title}</Typography>

                  </Stack>

                  <Typography>{publication.comment}</Typography>
                  <Stack>
                    <Stack spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                      <Chip sx={{ backgroundColor: "primary.main", color: "white" }} label={publication.publicationType} />
                    </Stack>
                  </Stack>
                </Stack>

                <Stack width={60} height={100} alignItems="center" m={2} borderRadius={3} border="1px solid" p={2}>
                  <Icon icon="ri:file-pdf-2-line" style={{ color: "#091582" }} width="100%" />
                  <Button variant='contained' onClick={() => handleDownload(publication.id, publication.pdfFileName)} style={{ color: "#091582" }}>
                    <Download sx={{ color: "white" }} />
                  </Button>

                </Stack>
              </Stack>
            </Stack>
            <Typography variant="h5">Shared by</Typography>
            <Box>
              <Chip
                avatar={<Avatar sx={{ zIndex: 0 }} src={`${baseUrl}/api/v1/auth/profileImage/${publication.profileImage}`} />}
                label={

                  <Link style={{ textDecoration: "none" }} to={`/users/${publication.uniqueName}`}><Typography variant="subtitle1">{publication.fullname}</Typography></Link>

                } />
            </Box>

            {publication.publicationType != "Thesis" && <>  <Typography variant="h5">Authors</Typography>
            <Stack>
              {publication.authors.length > 0 ? (
                <Stack direction="row" flexWrap="wrap">
                  {publication.authors.map((data, index) => (
                    <Chip
                      key={index}
                      avatar={<Avatar sx={{ zIndex: 0 }} src={`${baseUrl}/api/v1/auth/profileImage/${data.profileImageName}`} />}
                      label={
                        <Link style={{ textDecoration: "none" }} to={`/users/${data.uniqueName}`}>
                          <Typography variant="subtitle1">{data.firstName} {data.lastName}</Typography>
                        </Link>
                      }
                      sx={{ mb: 1, mr: 1 }} // Yazar çiplerini boşluk bırakarak yerleştirir
                    />
                  ))}
                </Stack>
              ) : (
                <Stack border="1px solid red" borderRadius={3} p={1} direction="row" alignItems="center" spacing={1}>
                  <Person sx={{ color: "red" }} />
                  <Typography color="red">There is no co-author</Typography>
                </Stack>
              )}
            </Stack></>}

            <Typography variant="h5">Summary</Typography>

            <Stack spacing={1}>
              <Stack direction="row">
                <Typography>
                  {publication.summary}
                </Typography>
              </Stack>
              <Divider sx={{ m: 3 }} />
              {publication.rawdatafiles.map((file, index) => (
                <>{console.log(file)}
                  <File deleteRawDataFile={deleteRawDataFile} setPublication={setPublication} publication={publication} key={index} file={file} counter={counterRequest} editMode={editMode} refreshHandler={refreshHandler} /></>
              ))}
              <Stack justifyContent="center">
                {editMode && <Button onClick={createFile} disabled={fileLoading} startIcon={fileLoading ? <CircularProgress size={14} sx={{ color: "white" }} /> : <Add />} variant='contained'>Add raw data</Button>}
              </Stack>

            </Stack>
          </>
        )}
      </Stack>
    </Container>
  );
}
