import { Box, Stack, Typography, Link } from '@mui/material';
import PayImage from '../assets/Adsız tasarım.svg'
function Footer() {
    return (
        <Box position="static" bottom={0} left={0} width="100%">
            <Stack p={2} mt={2} height={100} bgcolor="white" justifyContent="center" alignItems="center" borderRadius={3}>
                <Typography>©2024 Raw Data Library</Typography>
                <Stack direction="row" spacing={1}>
                    <Link href="#"><Typography>Terms</Typography></Link>
                    <Link href="#"><Typography>Privacy</Typography></Link>
                </Stack>
                <Box
                    p={2}
                    component="img"
                    src={PayImage}
                    width="300px"
                />
            </Stack>
        </Box>
    )
}

export default Footer;