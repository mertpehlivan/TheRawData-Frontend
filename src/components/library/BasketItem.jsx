
import { Divider,  Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BasketItemFile from '../view/BasketItemFile';
import { Link } from 'react-router-dom';


export default function BasketItem({ data, counterRequest,setPublicationPrice }) {
  if (!data || !data.rawDataFile) {
    return "Yok";
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, p: 2, marginBottom: 2 }}>
      <Typography variant='h6' component={Link} to="/product-details">
        {data.title}
      </Typography>
      <Divider sx={{ mt: 1, mb: 1 }} />

      {data.rawDataFile.map((file) => (
        <BasketItemFile setPublicationPrice={setPublicationPrice} counterRequest={counterRequest} key={file.id} file={file} />
      ))}
    </Paper>
  );
}
