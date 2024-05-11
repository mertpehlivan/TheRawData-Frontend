import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../../hooks/AuthProvider';
import { Button, CircularProgress, ListItem, Stack, Typography, debounce } from '@mui/material';
import { getInvitations } from '../../services/notificationService';
import { Link } from 'react-router-dom';

export default function EnvelopeBox() {
    const scrollRef = useRef(null);
    const [page, setPage] = useState(0)
    const [endMessages, setEndMessages] = useState([]);
    const [isPageIncrementing, setIsPageIncrementing] = useState(false);
    const { token, user } = useUserContext()
    const [isLoading,setIsLoding]= useState(false)
    const handleScroll = debounce(() => {
        if (scrollRef.current && !isPageIncrementing) {
            const scrollTop = scrollRef.current.scrollTop;
            const scrollHeight = scrollRef.current.scrollHeight;
            const clientHeight = scrollRef.current.clientHeight;
            console.log('Scroll pozisyonu:', scrollTop);

            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setPage(prev => prev + 1)
                setIsPageIncrementing(true);
            }

            // Scroll'un en üstüne geldiği durumu kontrol etmek için bir şart ekleyebilirsiniz.
            if (scrollTop === 0) {
                console.log('Scroll en üstte!');
            }
        }
    }, 200);

    useEffect(() => {
        setIsLoding(true)
        const size = 6; // Sayfa boyutu
        getInvitations(page, token, size)
            .then(response => {
                console.log('invitation:', response.data);
                setEndMessages(prev => [...prev, ...response.data])
                setIsPageIncrementing(false);
                setIsLoding(false)
            })
            .catch(error => {
                setIsPageIncrementing(false);
                console.error('Hata:', error);
                setIsLoding(false)
            });
    }, [page]);
    if(endMessages.length <= 0){
        return <Typography textAlign="center" border="1px solid" p={3}>There is no research registered to this e-mail address.</Typography>
    }
    return (
        <div
          ref={scrollRef}
          style={{
            height: '300px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
          }}
          onScroll={handleScroll}
        >
            {
                endMessages.map((msg, index) => (
                    msg && msg.fullName && msg.contant && msg.publicationUrl && msg.title && (
                        <ListItem key={index} divider>
                            <Stack>
                                <Stack direction="row">
                                    <Typography fontSize={12}><Link to={msg.userUrl}>{msg.fullName}</Link> {msg.contant.slice(0, 62)} <Link to={msg.publicationUrl}>{msg.title}</Link> {msg.contant.slice(90)} confirm your authorship.</Typography>
                                    <Stack alignItems="center" >
                                        <Button variant="contained" color="success">Confirm</Button>
                                        <Button color="error">Reject</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </ListItem>
                    )
                ))
                
            }
            {isLoading && <Stack justifyContent="center" alignItems="center"><CircularProgress/></Stack>}
        </div>
    )
}
