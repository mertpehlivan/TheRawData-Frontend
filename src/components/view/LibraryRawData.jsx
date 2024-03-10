import { Download } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useUserContext } from '../../hooks/AuthProvider';

function LibraryRawData({ rawData }) {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const {token} = useUserContext()
    const handleDownload = (id, name) => {
        axios.get(`${baseUrl}/api/v1/library/rawData/${id}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response); // Yanıtı konsola yazdır
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Dosya indirilemedi:', error);
        });
    };
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>{rawData.title}</Typography>
            <Button variant='outlined' onClick={()=>handleDownload(rawData.id,`${rawData.title}.${rawData.extention}`)} startIcon={<Download />} size='small'>Download</Button>
        </Stack>
    )
}

export default LibraryRawData
