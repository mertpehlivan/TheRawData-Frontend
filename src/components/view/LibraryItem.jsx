import { Chip, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import LibraryFile from './LibraryFile'
import LibraryRawData from './LibraryRawData'
import { Article } from '@mui/icons-material'
import ChipIconComponent from './ChipIconComponent'


function LibraryItem({ item }) {
  return (
    <Stack spacing={1} bgcolor="background.default" p={2} borderRadius={3}>
      <Link to={`/publications/${item.postId}`}><Typography variant='h5'>{item.postTitle}</Typography></Link>
      <Typography>{item.publicationSummary}</Typography>
      <Stack alignItems="flex-start">
        <Chip icon={<ChipIconComponent publicationType={item.publicationType}/>} label={item.publicationType} sx={{color:"white", bgcolor:"primary.main",p:1}}/>
      </Stack>

      <Divider />
      {item.files.map((file, index) => (
        <Stack key={index}>
          <LibraryFile file={file} />
        </Stack>
      ))}
    </Stack>
  )
}
export default LibraryItem
