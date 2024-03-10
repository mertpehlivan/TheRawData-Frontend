import { Stack, Typography, LinearProgress, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserContext } from '../../hooks/AuthProvider';
import { addSize } from '../../store/memorySlice';
import { getRawDataSize } from '../../services/newRawData/RawDataService';

// Ondalık kısmı üç basamakla sınırlı double değeri stringe dönüştüren fonksiyon
function formatDoubleToString(doubleValue) {
    const stringValue = doubleValue.toString();
    const parts = stringValue.split(".");
    let formattedString = parts[0];
    if (parts[1]) {
        formattedString += "." + parts[1].substring(0, 3);
    }
    return formattedString;
}

function MemoryComponent() {
    const memoryValue = useSelector(state => state.memory.value);
    const [size, setSize] = useState(0.0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { token } = useUserContext();
    useEffect(() => {
        const getTotalSizeFetch = async () => {
            try {
                setLoading(true);
                const total = await getRawDataSize(token);
                setSize(total.data);
                dispatch(addSize(total.data));
            } catch (error) {
                // Hata yönetimi burada yapılabilir
            } finally {
                setLoading(false);
            }
        };
        getTotalSizeFetch();
    }, []);

    if (loading) {

        return (
            <Stack alignItems="center" bgcolor="white" borderRadius={3} p={2}>
                <CircularProgress/>
            </Stack>
        )
    }

    const formattedSize = formatDoubleToString(size); // Double değeri stringe dönüştür

    const progress = (size / 5000) * 100; // 5000 MB = 5 GB

    return (
        <Stack bgcolor="white" borderRadius={3} p={2}>
            <Typography color="primary.main" variant='h4'>Storage Status</Typography>
            <Typography>{formattedSize} MB</Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography>{formatDoubleToString(5000)} MB</Typography>
        </Stack>
    );
}

export default MemoryComponent;
