import { useEffect, useState } from 'react';
import { Button, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useUserContext } from '../../hooks/AuthProvider';
import { getMyPublicationsToLibrary } from '../../services/libraryService';
import ContinuesDeveloped from './ContinuesDeveloped';
import LibraryItem from './LibraryItem'
import LibraryFile from './LibraryFile';

export default function LibraryBox() {
    const { token } = useUserContext();
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [theEnd,setTheEnd] = useState(false);

    useEffect(() => {
        getMyPublicationsToLibraryFetch();
    }, [page]);

    const getMyPublicationsToLibraryFetch = async () => {
        const size = 5;
        setLoading(true);
        try {
            const response = await getMyPublicationsToLibrary(token, page, size);
            const resData = response.data;
            console.log(response);
            if(resData.length <= 0) {
                setTheEnd(true)
            } else {
                setData(prev => [...prev, ...resData]);
            }
            
            setTotalPages(totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        setPage(prev => prev + 1);
    };



    return (
        <>
            <Stack spacing={1} >
                {/* Buraya data gösterimi eklenebilir */}
                {data.map((item, index) => (

                        <LibraryItem key={index} item ={item}/>
                ))}
            </Stack>
            <Stack alignItems="center">

                {!theEnd && <Button startIcon={loading && <CircularProgress size={15} />} onClick={loadMore}>Load More</Button>} 

            </Stack>
        </>
    );
}
