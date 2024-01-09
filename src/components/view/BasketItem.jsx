import React from 'react';
import {
  Paper,
  Typography,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import BasketItemFile from './BasketItemFile';

export default function BasketItem({ data,counterRequest }) {
  if (!data || !data[0] || !data[0].rawDataFile) {
    return "Yok";
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
