import React from 'react';
import { Stack, Typography, Divider, Box } from '@mui/material';


import { FileIcon, defaultStyles } from 'react-file-icon';

const RawDataList = ({ data }) => {
  const rawFilesToShow = 4;
  const rawItemsToShow = 2;

  return (
    <>
      {data.rawdatafiles.slice(0, rawFilesToShow).map((item, index) => (
        <Stack key={index} p={2}>
          <Typography variant='h6'>{item.title}</Typography>
          <Divider sx={{ mb: 1 }} />
          {item.rawDatas.slice(0, rawItemsToShow).map((rawdata, rawIndex) => (
            <Stack key={rawIndex} direction="row" spacing={1} alignItems="center">
              <Box width={20}>
                <FileIcon extension={rawdata.rawDataExtension} {...defaultStyles.docx} />
              </Box>
              <Typography variant='body2'>{rawdata.title}</Typography>
            </Stack>
          ))}
          {item.rawDatas.length > rawItemsToShow && (
            <Typography variant='body2'>
              and more {item.rawDatas.length - rawItemsToShow} raw data items
            </Typography>
          )}
        </Stack>
      ))}
      {data.rawdatafiles.length > rawFilesToShow && (
        <Typography variant='body2'>
          and more {data.rawdatafiles.length - rawFilesToShow} raw data files
        </Typography>
      )}
    </>
  );
};

export default RawDataList;
