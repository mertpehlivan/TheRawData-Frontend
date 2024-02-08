import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import BasketItemFile from './BasketItemFile';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

export default function BasketItem({ data,counterRequest }) {
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
        <BasketItemFile counterRequest={counterRequest} key={file.id} file={file} />
      ))}
    </Paper>
  );
}
