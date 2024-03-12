import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Collapse, Divider, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ShoppingBasket, ExpandLess } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import BasketItem from './BasketItem';
import { getPublicationBasket } from '../../services/newData/basketService';
import { useDispatch, useSelector } from 'react-redux';
import { addRawDataForPublication } from '../../store/basketPublicationSlice';
import BasketSummaryComponent from '../library/BasketSummaryComponent';

export default function BasketAccordion({ requestCounter, counterRequest }) {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { publicationId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    getPublicationBasket(publicationId)
      .then(res => {
        console.log(res.data);
        setData([res.data]);
        setLoading(false);
      })
      .catch(e => {
        setData(null);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
   

    getPublicationBasket(publicationId)
      .then(res => {
        console.log(res.data);
        setData([res.data]);
        setLoading(false);
      })
      .catch(e => {
        setData(null);
        setLoading(false);
      });
  }, [requestCounter]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box position="fixed" left="0" width={300} zIndex={1000}>
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

      <Collapse  in={isOpen} timeout="auto" unmountOnExit>
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
            <Typography variant='h6' color="primary.main">Basket summary about the publication</Typography>
            <Divider />
            {loading ? (
              // Skeleton Loading
              <Stack>
                <Skeleton height={40} width="80%" />
                <Skeleton height={20} width="60%" />
                {/* Add more skeletons as needed */}
              </Stack>
            ) : (
              // Actual content
              <BasketItem counterRequest={counterRequest} data={data} />
            )}
          </Stack>
          <Stack>
            
            <Link to={'/library/basket'}><Button>See all basket</Button></Link>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
