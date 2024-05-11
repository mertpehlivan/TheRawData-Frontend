import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../hooks/AuthProvider';
import { getByType, getProfilePost } from '../../../services/post/postService';
import { Stack, Typography, CircularProgress, debounce, Icon } from '@mui/material';
import DataPost from '../../home/DataPost';
import { InfoOutlined } from '@mui/icons-material';

export default function AllView({setNoMore, setPage, page, setLoading, loading }) {
  const { username, type } = useParams();
  const [datas, setDatas] = useState([]);
  const { token } = useUserContext();
  const [isPageIncrementing, setIsPageIncrementing] = useState(false);
  const [message, setMessage] = useState("")


  useEffect(() => {
    console.log("pageÇ:", page)
    const requestPublication = async (type) => {
      setLoading(true);
      try {
        if (type) {
          const response = await getByType(token, type, username, page);

          setDatas((prev) => [...prev, ...response]);

        } else {
          const size = 6;
          console.log('Effect triggered with page:', page);
          const response = await getProfilePost(token, page, size, username);
          
          console.log('Cevap:', response.data);
          setDatas((prev) => [...prev, ...response.data]);
          setIsPageIncrementing(false);
          if (response.data.length < size || response.data.length == 0) {
            setNoMore(false);
          }else{
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
  }, [page, type, username]);


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

  return (

    <Stack spacing={1} >
      {datas.map((data, index) => (
        <DataPost key={index} data={data} />
      ))}
      {!loading && message && <Typography>No more publications</Typography>}
      <Stack alignItems="center">
        {loading && <CircularProgress />}
      </Stack>

    </Stack>
  );
}
