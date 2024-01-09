import { Delete } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon'
import BasketItemRawData from './BasketItemRawData'

export default function BasketItemFile({ file,counterRequest }) {
    return (
        <Stack spacing={1}>
            <Typography>{file.title}</Typography>
            {
                file.rawDatas.map(rawData=><BasketItemRawData key={rawData.id} counterRequest={counterRequest} rawData={rawData}/>)
            }
        </Stack>
    )
}
