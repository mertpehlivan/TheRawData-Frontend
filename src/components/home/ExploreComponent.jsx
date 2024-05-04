import React, { useEffect, useState, useRef } from 'react';
import { getFirstPost } from '../../services/post/postService';
import { useUserContext } from '../../hooks/AuthProvider';
import { Stack, Typography, Icon, Button } from '@mui/material';
import { ErrorOutline, InfoOutlined } from '@mui/icons-material';
import DataPost from './DataPost';
import SkaletonDataPost from './SkaletonDataPost';
import { debounce } from 'lodash';

export default function ExploreComponent() {
  const { token } = useUserContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true); // New state for tracking whether there are more posts

  const handleLoadMoreRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const size = 5;
      try {
        const res = await getFirstPost(token, page, size);
        if (res.data.length === 0) {
          setHasMorePosts(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...res.data]);
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, page]);

  useEffect(() => {
    handleLoadMoreRef.current = handleLoadMore;
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (hasMorePosts) {
          handleLoadMoreRef.current();
        }
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMorePosts]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return (
      <Stack spacing={1}>
        {[...Array(5)].map((_, index) => (
          <SkaletonDataPost key={index} />
        ))}
      </Stack>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h5" color="error">
          <Icon as={InfoOutlined} fontSize="large" marginRight={1} />
          No Shipments
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h5" color="error">
          <Icon as={ErrorOutline} fontSize="large" marginRight={1} />
          An error has occurred: {error}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
      {posts.map((post,index) => (
        <DataPost key={index} data={post} handleLoadMore={handleLoadMoreRef.current} />
      ))}
      {!hasMorePosts ? (
        <Typography variant="h6" color="textSecondary" textAlign="center">
          There are no more posts available.
        </Typography>
      ):
      (<Button onClick={handleLoadMoreRef.current} variant="outlined"  color="primary">
        see more
      </Button>)
      }
    </Stack>
  );
}