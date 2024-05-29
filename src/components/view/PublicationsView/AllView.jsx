import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../../hooks/AuthProvider';
import { getByType, getProfilePost } from '../../../services/post/postService';
import { Stack, Typography, Icon, Button } from '@mui/material';
import DataPost from '../../home/DataPost';
import { InfoOutlined } from '@mui/icons-material';
import SkaletonDataPost from '../../home/SkaletonDataPost';

export default function AllView({ setLoading, loading }) {
  const { username, type } = useParams();
  const [datas, setDatas] = useState([]);
  const { token } = useUserContext();
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const size = 6;
      let response;

      if (type) {
        response = await getByType(token, type, username, page);
        setDatas((prev) => page === 0 ? response : [...prev, ...response]);
      } else {
        response = await getProfilePost(token, page, size, username);
        setDatas((prev) => page === 0 ? response.data : [...prev, ...response.data]);

      }
      if (response.length < size) {
        setNoMore(true);
      } else {
        setNoMore(false);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDatas([]);
    setPage(0);
    setNoMore(false);
    fetchPosts(); // Initial fetch for profile posts
  }, [type, username]);

  useEffect(() => {
    if (page > 0) {
      fetchPosts();
    }
  }, [page]);

  if (!datas || (datas.length === 0 && !loading)) {
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
    <Stack spacing={1}>
      {datas.map((data, index) => (
        <DataPost key={index} data={data} />
      ))}
      {loading && <Stack>
        <SkaletonDataPost />
      </Stack>}
      {!loading && noMore && <Typography>No more publications</Typography>}
      {!loading && !noMore && <Button onClick={() => setPage((prev) => prev + 1)}>See More</Button>}
    </Stack>
  );
}
