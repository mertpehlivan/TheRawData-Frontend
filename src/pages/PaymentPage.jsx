import { Box, Button, Chip, Container, Divider, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getBasket, getBasketPrice } from '../services/newData/basketService'
import { Try } from '@mui/icons-material';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useUserContext } from '../hooks/AuthProvider';
import Pay from '../assets/pay_with_iyzico_white.svg'
function PaymentPage() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { token } = useUserContext()
    useEffect(() => {
        const basketFetch = async () => {
            try {
                setLoading(true)
                const response = await getBasket();
                setData(response.data)
                const totalPriceResponse = await getBasketPrice(token)
                setTotal(totalPriceResponse.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }


        }
        basketFetch();
    }, []);




    return (
        <Container maxWidth="sm" sx={{ mt: 15 }}>
            {error && <Stack bgcolor="white" borderRadius={3} p={2} border="1px solid" borderColor="red" alignItems="center">
                <Typography variant='h1' color="red">404</Typography>
            </Stack>}
            {loading &&
                <Stack bgcolor="white" borderRadius={3} p={2}>
                    <Skeleton height={50} />
                    <Skeleton height={30} width="50%" />
                    <Skeleton height={30} width="60%" />
                    <Skeleton height={30} width="60%" />
                    <Skeleton height={30} width="60%" />
                </Stack>
            }
            {!loading &&
                <Stack bgcolor="white" borderRadius={3} p={2}>
                    <Typography color="primary.main" variant='h4'>Products in basket</Typography>

                    {data.map((item, itemIndex) => (
                        <Stack key={itemIndex}>
                            {item.rawDataFile.map((file, fileIndex) => (
                                <Stack key={fileIndex}>
                                    {file.rawDatas.map((rawData, rawDataIndex) => (
                                        <Stack key={rawDataIndex} spacing={3}>

                                            <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box width={20} height={20} alignItems="center">
                                                        <FileIcon extension={rawData.rawDataExtension} {...defaultStyles.docx} />
                                                    </Box>
                                                    <Typography variant='h6'>{rawData.title}</Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography>{rawData.price}$</Typography>
                                                </Stack>


                                            </Stack>

                                        </Stack>
                                    ))}
                                </Stack>
                            ))}
                        </Stack>
                    ))}
                    <Divider variant='fullWidth' sx={{ my: 2 }} />
                    <Stack spacing={2}>

                        <Stack alignItems="flex-end">
                            <Chip label={<Typography variant='h4'>Total Price :{total}$</Typography>} />
                        </Stack>
                        <Button startIcon={<Box width={100} component="img" src={Pay} />} size='small' variant="contained" />


                    </Stack>



                </Stack>}

        </Container>
    )
}

export default PaymentPage
