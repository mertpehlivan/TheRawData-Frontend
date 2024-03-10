import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import LibraryRawData from './LibraryRawData'

function LibraryFile({ file }) {
  console.log("file:", file)
  return (
    <Stack border="1px solid" borderRadius={3} borderColor="primary.main" p={2}>
      <Typography variant='h6'>{file.title}</Typography>
      <Divider sx={{m:1}}/>
      <Stack spacing={1}>
        {file.rawDatas.map((dataItem, dataIndex) => (
          <LibraryRawData key={dataIndex} rawData={dataItem}/>
        ))}
      </Stack>

    </Stack>
  )
}

export default LibraryFile
