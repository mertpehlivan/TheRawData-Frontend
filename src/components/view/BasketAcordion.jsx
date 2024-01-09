// BasketAccordion.js
import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Collapse, Divider, IconButton, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ShoppingBasket, ExpandLess } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import BasketItem from './BasketItem';
import { getPublicationBasket } from '../../services/newData/basketService';
import { useDispatch, useSelector } from 'react-redux';
import { addRawDataForPublication } from '../../store/basketPublicationSlice';

export default function BasketAccordion({ requestCounter,counterRequest }) { // Fix the prop name here
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data,setData] = useState([])
  const { publicationId } = useParams();
  const dispatch = useDispatch();
  //const data = useSelector(state => state.basketPublication.value);

  useEffect(() => {
    setLoading(true);

    getPublicationBasket(publicationId)
      .then(res => {
        console.log(res.data)
        setData([res.data])
        //dispatch(addRawDataForPublication(res.data));
        setLoading(false);
      })
      .catch(e => {
        setData(null)
        setLoading(false);
      });
  }, [requestCounter]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  if (data) {
    
  }
  return (
    <Box position="fixed" left="0" width={300}>
      <IconButton
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
        onClick={handleToggle}
        title='Cart Summary about the product'
      >
        <ShoppingBasket />
        {isOpen ? <ExpandLess /> : <ExpandMoreIcon />}
      </IconButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box
          position="absolute"
          left="0"
          bgcolor="white"
          height={400}
          borderRadius={3}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px"
          }
          sx={{
            overflowY: "scroll",
            scrollbarColor: "primary.main transparent",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "8px",
            },
          }}
        >
          <Stack p={2} spacing={1} justifyContent="center">
            <Typography variant='h6' color="primary.main">Basket Summary about the post</Typography>
            <Divider />
            {loading ? (
              <CircularProgress />
            ) : (
              <BasketItem counterRequest={counterRequest} data={data} />
            )}
          </Stack>
          <Stack>
            <Button href='/library/basket'>See all basket</Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
