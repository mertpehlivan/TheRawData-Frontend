import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import BasketItemFile from './BasketItemFile';
import { SentimentVeryDissatisfied, Token } from '@mui/icons-material';
import { getBasketPrice } from '../../services/newData/basketService';
import { useUserContext } from '../../hooks/AuthProvider';

export default function BasketItem({ data,counterRequest }) {
  const [totalPrice,setTotalPrice] = useState(0)
  const {token} = useUserContext()
  useEffect( () => {
      const fetchPrice =async ()=>{
        const response = await getBasketPrice(token)
        setTotalPrice(response.data)
      }
      fetchPrice()
  }, [counterRequest]);


  if (!data || !data[0] || !data[0].rawDataFile) {
    return <Stack borderRadius={3} border="1px solid" borderColor="primary.main" alignItems="center" p={2}>
      <SentimentVeryDissatisfied sx={{width:50,height:50,color:"primary.main"}}/>
      <Typography variant='h6' color="primary.main">Basket Empty</Typography>
    </Stack>;
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, p: 2, marginBottom: 2 }}>
      <Typography variant='h6' component={Link} to="/product-details">
        {data[0].title}
      </Typography>
      <Divider sx={{ mt: 1, mb: 1 }} />
      
      {data[0].rawDataFile.map((file) => (
        <BasketItemFile  counterRequest={counterRequest} key={file.id} file={file} />
      ))}
      <Stack border="1px solid" borderRadius={3} borderColor="primary.main" p={1} m={1}>
        <Chip sx={{bgcolor:"primary.main",color:"white"}} label={<Typography>TotalPrice:{totalPrice}$</Typography>}/>
      </Stack>
    </Paper>
  );
}
