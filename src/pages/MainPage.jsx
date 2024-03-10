import { Box, Button, ButtonGroup, Container, Grid, Stack, Typography, useMediaQuery, useScrollTrigger } from '@mui/material';
import React from 'react';
import Logo from '../assets/logo.svg';
import BackgroundVideo from '../assets/video.mp4'; // Video dosyasının yolunu buraya ekleyin
import { useTheme } from '@emotion/react';
import Researcher from '../assets/Academic Research Incentive.jpg';
import Academia from '../assets/academia.jpg';
import { FiberManualRecord } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Scince from '../assets/pexels-rfstudio-3825527.jpg'
function ScrollToTop(props) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Box
            onClick={handleClick}
            role="presentation"
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 100,
                opacity: trigger ? 1 : 0,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                    opacity: 1,
                }
            }}
        >
            <Button variant="contained" color="primary">Scroll to Top</Button>
        </Box>
    );
}
function MainPage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Stack>
            <Box position="fixed" sx={{ opacity: 0.2 }} zIndex={-10}>

                <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
                    <source src={BackgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            </Box>
            <Container maxWidth>
                <div id="back-to-top-anchor" />
                <Box position="fixed" width="100%" style={{ opacity: 0.9 }}>
                    <Stack direction="row" justifyContent="space-between" p={3}>
                        <Stack direction="row" spacing={2}>

                            <Button>
                                <Typography fontFamily="Times New Roman,sans-serif" variant="h6" fontWeight="bold" color="primary.main">
                                    Home
                                </Typography>
                            </Button>

                            <Button>
                                <Typography fontFamily="Times New Roman,sans-serif" variant="h6" fontWeight="bold" color="primary.main">
                                    About us
                                </Typography>
                            </Button>
                        </Stack>
                        <ButtonGroup variant='text'>
                            <Link to="/login">
                                <Button>
                                    <Typography fontFamily="Times New Roman,sans-serif" variant="h6" fontWeight="bold" color="primary.main">
                                        LOG IN
                                    </Typography>
                                </Button>
                            </Link>
                            <Link to="/signup">
                            <Button size='large' fontWeight="bold">
                                <Typography fontFamily="Times New Roman,sans-serif" variant="h6" fontWeight="bold" color="primary.main">
                                    Join for free
                                </Typography>
                            </Button>
                            </Link>
                        </ButtonGroup>
                    </Stack>
                </Box>
                <Grid container mt={10} height="80vh" mb={10}>
                    <Grid item xs={12}>
                        <Stack sx={{
                            justifyContent: isSmallScreen ? 'center' : 'flex-start', // Eğer küçük ekran ise merkezle, değilse başlangıca hizala
                            alignItems: isSmallScreen ? 'center' : 'flex-start',     // Eğer küçük ekran ise merkezle, değilse başlangıca hizala
                            // Ekran yüksekliği kadar genişlik
                        }}>
                            <Box
                                component="img"
                                src={Logo}
                                width={isSmallScreen ? 300 : 400}
                            />
                            <Typography fontFamily="Times New Roman,sans-serif" variant={isSmallScreen ? 'h4' : 'h3'}>ACADEMIC RESEARCH INCENTIVE</Typography>
                        </Stack>

                        <Stack alignItems="flex-end">
                            <Typography fontFamily="Times New Roman,sans-serif" bgcolor="white" p={2} borderRadius={3} variant={isSmallScreen ? 'h6' : 'h4'} width={isSmallScreen ? "100%" : 600}>
                                Researchers who upload their raw data to the system are paid according to the number of downloads of their data through the raw data library company.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} mb={3}>

                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Stack direction="row" mt={3} bgcolor="white" p={2} alignItems="center" borderRadius={3} spacing={2}>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h2' color="primary.main">
                                The New Face of the Academy
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                Data owners are <b>financially supported</b> for each of their data downloaded by other researchers.
                            </Typography>
                            <Button variant='contained'>JOIN FOR FREE</Button>
                        </Stack>


                    </Grid>
                    <Grid item xs={12} sm={12}>

                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth>
                <Stack >
                    <Grid container sx={{ height: (isSmallScreen ? "100%" : "100vh"), opacity: 1, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} bgcolor="white" borderRadius={3}  >
                        <Grid item sm={12} md={5}>
                            <Box borderRadius={3} component="img" src={Researcher} width="100%" height="100%" sx={{ objectFit: 'cover' }} />
                        </Grid>
                        <Grid item sm={12} md={7}>
                            <Stack spacing={3} alignContent="center" p={5} sx={{ pt: (isSmallScreen ? 2 : 30) }}>
                                <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h3'> Academic Research Incentive</Typography>
                                <Stack spacing={2}>

                                    <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                        <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                        The main purpose of the <b>Raw Data Library</b>  is to contribute to the scientific world by providing easy access to <b>Experimental Raw Data or Analytical Models</b> by other researchers.
                                    </Typography>
                                    <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                        <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                        In this context, researchers who upload their <b>Raw Data</b> to the online system with their own consent provide their previously obtained raw data to the use of other researchers.
                                    </Typography>
                                    <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                        <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                        Researchers who upload their Raw Data to the system are paid according to the number of downloads of their data through the Raw Data Library company.
                                    </Typography>
                                </Stack>

                            </Stack>

                        </Grid>
                    </Grid>
                </Stack>

            </Container>
            <Container maxWidth>

            </Container>
            <Container maxWidth>
                <Grid container mt={3} bgcolor="white" p={2} borderRadius={3} spacing={2}>
                    <Typography fontFamily="Times New Roman,sans-serif" variant='h2' color="primary.main">
                        Thanks to Access to Raw Data Library
                    </Typography>
                    <Grid item xs={6}>
                        <Stack >


                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Prevention of repetition of similar experimental test parameters and direct access to analytical modelling using software programs.
                            </Typography>

                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Experimental studies can be completed with less budget.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	More discussion opportunities and the development of more empirical or analytical models.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	More citation opportunities.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Easy validations of previous data.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Sharing of other data mentioned but not presented in the article.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Access to modelling of FEM, ABAQUS, ANSY, SAP 2000, Solid Works and other computer modelling and documents.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Authors can track the number of times their data has been downloaded from their own profile page.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Authors can access their data online from anywhere in the world.
                            </Typography>
                            <Typography color="white" bgcolor="primary.main" p={1} border="1px solid" borderRadius={3} fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Payment information is uploaded to the profile page of each data owner and data owners can track their income.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack p={1} direction="row" height="100%">
                            <Box
                                component="img"
                                src={Scince}
                                sx={{ objectFit: "cover" }}
                                width="100%"
                                height={500}
                                borderRadius={50}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <ScrollToTop />
            <Footer />

        </Stack>

    );

}

export default MainPage;
