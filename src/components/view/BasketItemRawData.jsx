import { Delete } from '@mui/icons-material'
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { FileIcon, defaultStyles } from 'react-file-icon'
import { useDispatch } from 'react-redux'
import { deleteRawData } from '../../store/basketPublicationSlice'
import { deleteBasket } from '../../services/newData/basketService'

export default function BasketItemRawData({rawData,counterRequest}) { 
    const dispatch = useDispatch()
    const deleteButton = (id)=>{
        dispatch(deleteRawData(id))
        deleteBasket(id).then(res=>{
            console.log(res.data)
            counterRequest()
        })
    }
    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Box width={20}>
                <FileIcon extension={rawData.rawDataExtension} {...defaultStyles.docx} />
            </Box>
            <Typography>{rawData.title}</Typography>
            <Chip label={`${rawData.price}$`}/>
            <IconButton onClick={()=>deleteButton(rawData.id)} color="error">
                <Delete />
            </IconButton>
        </Stack>
    )
}
