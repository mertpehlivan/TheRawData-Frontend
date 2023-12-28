import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../hooks/AuthProvider';
import { getByType } from '../../../services/post/postService';
import { Stack, Typography, CircularProgress } from '@mui/material';
import DataPost from '../../home/DataPost';
import ProfileDataPost from '../../profile/ProfileDataPost';

export default function AllView() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true); // Yeni eklenen loading state
  const { type, username } = useParams();
  const { token } = useUserContext();

  useEffect(() => {
    const requestPublication = async (type) => {
      setLoading(true); // İstek başladığında loading durumunu true yap
      try {
        const res = await getByType(token, type, username);
        setDatas(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false); // İstek tamamlandığında loading durumunu false yap
      }
    };

    requestPublication(type);
  }, [type, username, token]);

  console.log(datas);

  if (loading) {
    return <CircularProgress />; // Eğer veriler yükleniyorsa loading göster
  }

  if (datas.length === 0 || datas === null) {
    return <Typography>No Publication</Typography>;
  }

  return (
    <Stack>
      {datas.map((data, index) => (
        <DataPost key={index} data={data} />
      ))}
    </Stack>
  );
}
