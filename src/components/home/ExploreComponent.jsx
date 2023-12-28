import React, { useEffect, useState } from 'react';
import { getFirstPost } from '../../services/post/postService';
import { useUserContext } from '../../hooks/AuthProvider';
import { Stack, CircularProgress, Typography, Icon } from '@mui/material';
import { ErrorOutline, InfoOutlined } from '@mui/icons-material'; // Material-UI ikonları
import DataPost from './DataPost';
import SkaletonDataPost from './SkaletonDataPost';
import { useParams } from 'react-router-dom';

export default function ExploreComponent() {
  const { token } = useUserContext();
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFirstPost(token);
        setDatas(res);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Stack>
        {[...Array(5)].map((_, index) => (
          <SkaletonDataPost key={index} />
        ))}
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h5" color="error">
          <Icon as={ErrorOutline} fontSize="large" marginRight={1} />
          Bir hata oluştu: {error}
        </Typography>
      </Stack>
    );
  }
  if (datas.length === 0 || datas === null) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h5" color="error">
          <Icon as={InfoOutlined} fontSize="large" marginRight={1} />
          Hiç Gönderi Yok
        </Typography>
      </Stack>
    );
  }
 

  return (
    <Stack spacing={1}>
      {datas.map((data) => (
        <DataPost key={data.id} data={data} />
      ))}
    </Stack>
  );
}
