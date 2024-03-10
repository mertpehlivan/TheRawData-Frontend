import { Delete } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon'
import BasketItemRawData from './BasketItemRawData'

export default function BasketItemFile({ file, counterRequest}) {
    
    return (
        <Stack spacing={1}>
            <Typography variant='h6'>{file.title}</Typography>
            {
                file.rawDatas.map(rawData =>
                    <Stack>
                        <BasketItemRawData key={rawData.id} counterRequest={counterRequest} rawData={rawData} />
                        
                    </Stack>
                )
            }
        </Stack>
    )
}
