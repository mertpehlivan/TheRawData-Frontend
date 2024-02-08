import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../hooks/AuthProvider';
import { getByType, getProfilePost } from '../../../services/post/postService';
import { Stack, Typography, CircularProgress, debounce } from '@mui/material';
import DataPost from '../../home/DataPost';

export default function AllView({ setPage,page,setLoading,loading }) {
  const { username,type } = useParams();
  const [datas, setDatas] = useState([]);
  const { token } = useUserContext();
  const [isPageIncrementing, setIsPageIncrementing] = useState(false);
  const [message,setMessage] = useState("")

  useEffect(() => {
    const requestPublication = async (type) => {
      setLoading(true);
      try {
        if (type) {
          const response = await getByType(token, type, username,page);
          setDatas((prev) => [...prev, ...response]);
        } else {
          const size = 6;
          console.log('Effect triggered with page:', page);
          const response = await getProfilePost(token, page, size, username);
          console.log('Cevap:', response.data);
          setDatas((prev) => [...prev, ...response.data]);
          setIsPageIncrementing(false);
        }
      } catch (error) {
        console.error('Hata:', error);
      } finally {
        setLoading(false);
      }
    };

    requestPublication(type);
  }, [page,type,username]);


  useEffect(() => {
    setDatas([])
    setPage(0)
  }, [type,username]);

  console.log(datas);

  if (!datas || datas.length === 0) {
    return <Typography>No Publication</Typography>;
  }

  return (

    <Stack spacing={1} >
      {datas.map((data, index) => (
        <DataPost key={index} data={data} />
      ))}
      {message && <Typography>No more publications</Typography>}
      <Stack alignItems="center">
        {loading && <CircularProgress />}
      </Stack>

    </Stack>
  );
}
