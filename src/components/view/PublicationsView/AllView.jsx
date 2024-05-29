import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../hooks/AuthProvider';
import { getByType, getProfilePost } from '../../../services/post/postService';
import { Stack, Typography, CircularProgress, debounce, Icon, Button } from '@mui/material';
import DataPost from '../../home/DataPost';
import { InfoOutlined } from '@mui/icons-material';
import SkaletonDataPost from '../../home/SkaletonDataPost';

export default function AllView({ setLoading, loading }) {
  const { username, type } = useParams();
  const [datas, setDatas] = useState([]);
  const { token } = useUserContext();
  const [isPageIncrementing, setIsPageIncrementing] = useState(false);
  const [message, setMessage] = useState("")
  const [page, setPage] = useState(0)
  const [noMore, setNoMore] = useState(false)
  useEffect(() => {

    setPage(0)
    setDatas([])
  }, [type, username]);
  useEffect(() => {
    console.log("pageÇ:", page)
    const requestPublication = async (type) => {

      setLoading(true);
      try {
        if (type) {
          const size = 6;
          const response = await getByType(token, type, username, page);

          setDatas((prev) => [...prev, ...response]);
          if (response.length < size) {
            setNoMore(false);
          } else {
            setNoMore(true)
          }

        } else {
          const size = 6;
          console.log('Effect triggered with page:', page);
          const response = await getProfilePost(token, page, size, username);

          console.log('Cevap:', response.data);
          setDatas((prev) => [...prev, ...response.data]);
          setIsPageIncrementing(false);
          if (datas.length() < size) {
            setNoMore(false);
          } else {
            setNoMore(true)
          }
        }
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };

    requestPublication(type);
  }, [page]);


  useEffect(() => {
    setDatas([])
    setPage(0)
    setNoMore(false)
  }, [type, username]);

  console.log(datas);

  if (!datas || datas.length === 0 && !loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%" bgcolor="background.default" p={2} borderRadius={3}>
        <Icon as={InfoOutlined} sx={{ color: "red" }} fontSize="large" marginRight={1} />
        <Typography variant="h5" color="error">
          No Publication
        </Typography>
      </Stack>
    );
  }
  if (loading) {
    return (<Stack>
      <SkaletonDataPost/>
    </Stack>)
  }

  return (

    <Stack spacing={1} >
      {datas.map((data, index) => (
        <DataPost key={index} data={data} />
      ))}
      {!loading && message && <Typography>No more publications</Typography>}

      {!loading && <Button onClick={() => setPage(prev => prev + 1)}>See More</Button>}
    </Stack>
  );
}
