import { Button, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getBasket } from '../../services/newData/basketService';
import BasketItem from './BasketItem';
import { Public, SentimentDissatisfied } from '@mui/icons-material';
import { useRefreshPrice } from '../../hooks/RefreshPrice';
import BasketSummaryComponent from './BasketSummaryComponent';

export default function Basket() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestCounters, setRequestCounters] = useState(0);
  const [publicationPrice, setPublicationPrice] = useState(0)
  const { refreshPriceHandler } = useRefreshPrice();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getBasket();
        setData(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setData([]);
        setError(err.message || 'An error occurred while fetching the data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestCounters]);

  const increaseRequest = () => {
    setRequestCounters(prevCounters => prevCounters + 1);
    refreshPriceHandler();
  };

  if (loading) {
    return "loading...";
  }

  if (error) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        p={1}
        sx={{ minHeight: '200px' }}
        bgcolor="white"
        borderRadius={3}
      >
        <SentimentDissatisfied sx={{ width: 90, height: 90, color: "primary.main" }} />
        <Typography variant="h6">Your basket is empty.</Typography>
        <Button href='/' startIcon={<Public />} variant='contained'>
          Keep exploring
        </Button>
      </Stack>
    );
  }

  return (
    <Stack>

      {data.map((publication, index) => (
        <Stack key={index}>
          <BasketItem setPublicationPrice={setPublicationPrice} key={publication.publicationPostId} data={publication} counterRequest={increaseRequest} />
        </Stack>

      ))}
      
    </Stack>
  );
}
