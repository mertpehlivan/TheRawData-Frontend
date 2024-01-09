import { Backdrop, Box, Chip, CircularProgress, Container, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../hooks/AuthProvider';
import { getPost } from '../services/post/postService';
import File from '../components/publication/File';
import PdfButton from '../components/button/PdfButton';
import BasketAcordion from '../components/view/BasketAcordion';

export default function PublicationPage() {
  const { publicationId } = useParams();
  const [publication, setPublication] = useState(null);
  const { token } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState([])
  const [requestCounter, setRequestCounter] = useState(0)
  useEffect(() => {
    const getPostHandler = async () => {
      try {
        const res = await getPost(token, publicationId);
        console.log(res.data)
        setPublication(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    getPostHandler();
  }, [token, publicationId]);
  const counterRequest = () => {
    setRequestCounter(prev => prev + 1);
  }
  return (
    <Container sx={{ pt: "25px" }} maxWidth="md">

      <BasketAcordion requestCounter={requestCounter} counterRequest={counterRequest} />
      <Stack bgcolor="background.default" p={2} spacing={1} borderRadius={3}>
        {loading ? (
          <Backdrop open={loading}>
            <CircularProgress color="primary" />
          </Backdrop>
        ) : (
          <>
            <Stack>
              <Typography>{publicationId}</Typography>
              <Stack direction="row" justifyContent="space-between">
                <Stack spacing={1}>
                  <Typography variant="h4">{publication.title}</Typography>
                  <Typography>{publication.comment}</Typography>
                  <Stack>
                    <Stack spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                      <Chip sx={{ backgroundColor: "primary.main", color: "white" }} label={publication.publicationType} />
                    </Stack>
                  </Stack>
                </Stack>

                <Stack justifyContent="center">
                  <PdfButton />
                </Stack>
              </Stack>
            </Stack>

            <Typography variant="h5">Summary</Typography>

            <Stack spacing={1}>
              <Stack direction="row">
                <Typography>
                  Conference Experimental evaluation and modelling of corroded reinforced concrete columns. ACI Structural Journal, 2020, 61-76, 10.14359/51721372, Turkey Hakan Yalciner, Atila Kumbasaroglu
                </Typography>
              </Stack>
              <Divider sx={{ m: 3 }} />
              {publication.rawdatafiles.map((file, index) => (
                <File key={index} file={file} counter={counterRequest} />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Container>
  );
}
