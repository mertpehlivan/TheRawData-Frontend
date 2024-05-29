import React from 'react';
import { Icon } from '@iconify/react';
import { Avatar, AvatarGroup, Box, Button, Chip, Divider, Stack, Typography, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import FriendComponent from '../view/FriendComponent';
import PdfPreViewerImage from './PdfPreViewerImage';

export default function SkaletonDataPost() {
  return (
    <Stack spacing={2} bgcolor="background.default" p={2} borderRadius={3} flexWrap="wrap"> 
      <Stack mb={2} spacing={1} direction="row" alignItems="center">
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
        <Skeleton width={100} height={20} animation="wave" />
        <Skeleton width={80} height={20} animation="wave" />
    
      </Stack>
     
      <Stack spacing={1} direction="row" justifyContent="flex-start">
        <Skeleton variant="rectangular" width={150} height={25} animation="wave">
          <Chip label="New" sx={{ backgroundColor: "primary.main", color: "white" }} />
        </Skeleton>
        <Skeleton variant="rectangular" width={120} height={25} animation="wave">
          <Chip label="Company Test Report" />
        </Skeleton>
        
      </Stack>
      <Stack direction="row" spacing={1}>
          <Skeleton variant="rectangular" width={60} height={100} animation="wave"/>
          <Skeleton variant="rectangular" width={60} height={100} animation="wave"/>
          <Skeleton variant="rectangular" width={60} height={100} animation="wave"/>
        </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1} direction="row" justifyContent="flex-start">
        
      </Stack>
      <Stack direction="row" alignItems="center">
        <AvatarGroup>
          {[1, 2, 3, 4, 5].map((index) => (
            <Skeleton key={index} variant="circular" width={25} height={25} animation="wave" />
          ))}
        </AvatarGroup>
        <Typography>
          <Skeleton width={100} height={20} animation="wave" />
        </Typography>

       
      </Stack>
    </Stack>
  );
}
