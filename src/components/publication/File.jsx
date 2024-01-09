import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import DataBox from './DataBox';

export default function File({ file,counter }) {
  const chunkedRawDatas = chunkArray(file.rawDatas, 3);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 8, borderColor: 'primary.main', border: '1px solid', mb: 3 }}>
      <Typography variant="h6" textAlign="center" mb={2} fontWeight="bold" color="primary.main">
        {file.title}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {chunkedRawDatas.map((row, rowIndex) => (
        <Stack key={rowIndex} spacing={2} justifyContent="center" direction="row" flexWrap="wrap">
          {row.map((rawData, colIndex) => (
            <DataBox counter={counter} key={colIndex} rawData={rawData} fileId={file.id} />
          ))}
        </Stack>
      ))}
    </Paper>
  );
}

// Function to chunk an array into smaller arrays with a specified size
function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}
