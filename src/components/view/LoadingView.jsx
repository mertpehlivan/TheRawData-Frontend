import React, { useContext, useEffect, useState } from 'react'

import { Container } from '@mui/material'
import PercentageProgressBar from './PercentageProgressBar'
import axios from 'axios';
import { useUserContext } from '../../hooks/AuthProvider';
import ImageDisplay from './ImageView';
import { getAllThesis } from '../../services/newData/thesisService';

export default function LoadinView() {
  const { token } = useUserContext();
  useEffect(async() => {
    const res = await getAllThesis(token);
  }, []);
  return (
    <Container maxWidth="md">
      <ImageDisplay/>
    </Container>
   
  )
}
