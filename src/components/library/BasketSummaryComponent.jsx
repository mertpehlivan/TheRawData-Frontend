import { Box, Button, ButtonGroup, Chip, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getBasketPrice } from '../../services/newData/basketService';
import { useRefreshPrice } from '../../hooks/RefreshPrice';
import { useUserContext } from '../../hooks/AuthProvider';

export default function BasketSummaryComponent() {
    const [price, setPrice] = useState(0);
    const { refreshPrice } = useRefreshPrice();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {token} = useUserContext()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getBasketPrice(token);
                setPrice(response.data);
            } catch (error) {
                console.error('Error fetching basket price:', error);
                setError('An error occurred while fetching the basket price.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshPrice]);

    return (
        <Stack bgcolor="white" borderRadius={3} spacing={1} p={1}>
            <Stack
                direction="row"
                justifyContent="space-between"
                m={1}
                alignItems="center"
            >
                <Typography variant='h5' color="primary.main">Basket</Typography>
                <Button size='small' variant='outlined' href='/library/basket'>See all basket</Button>
            </Stack>
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="center">
                {error ? (
                    <Chip sx={{ bgcolor: "error.main", color: "white" }} label="Error loading price" />
                ) : (
                    <Chip sx={{ bgcolor: "primary.main", color: "white" }} label={
                        <Stack direction="row" p={1} alignItems="end" spacing={1}>
                            <Typography variant='h5'>{price}$</Typography>
                            <Typography>Total Price</Typography>
                        </Stack>
                    } />
                )}
            </Stack>
            <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
                spacing={1}
                borderRadius={3}
                p={1}
            >
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button disabled={price===0} startIcon={<HighlightOffIcon />} color='error' >empty</Button>
                    <Button disabled={price===0} startIcon={<ShoppingCartIcon />} color='success' >Buy</Button>
                </ButtonGroup>
            </Stack>
        </Stack>
    );
}
