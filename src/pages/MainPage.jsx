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
import Scince from '../assets/file.jpeg'
import Type from '../assets/Type.jpeg'
import Prem from '../assets/repo.jpeg'
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
        <Stack spacing={3}>
            <Box position="fixed" sx={{ opacity: 0.2 }} zIndex={-10}>

                <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
                    <source src={BackgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            </Box>
            <Container maxWidth>
                <div id="back-to-top-anchor" />
                <Box position="sticky" width="100%" style={{ opacity: 0.9 }}>

                    <Stack direction="row" justifyContent="space-between" p={3}>
                        <Stack justifyContent="start" direction="row" spacing={1}>
                            <Link to="/aboutUs" target='_blank'>
                                <Button>
                                    <Typography fontFamily="Times New Roman,sans-serif" variant="h6" fontWeight="bold" color="primary.main">
                                        About us
                                    </Typography>
                                </Button>
                            </Link>
                            <Link to="/whatIs" target='_blank'>
                                <Button>
                                    <Typography fontFamily="Times New Roman,sans-serif" variant="h6" fontWeight="bold" color="primary.main">
                                        What is a journal page? and Who we are?
                                    </Typography>
                                </Button>
                            </Link>
                            <Link to="/accuracy" target='_blank'>
                                <Button>
                                    <Typography fontFamily="Times New Roman,sans-serif" variant="h6" fontWeight="bold" color="primary.main">
                                        Accuracy of Purchased Data
                                    </Typography>
                                </Button>
                            </Link>
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
                <Grid container height="80vh" mb={10}>
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
                            <Typography fontFamily="Times New Roman,sans-serif" p={2} borderRadius={3} variant={isSmallScreen ? 'h6' : 'h4'} width={isSmallScreen ? "100%" : 700}>
                                Academic incentives are provided to researchers who upload their raw or processed data to the RDL platform and they are paid according to the number of downloads of their data through the Raw Data Library company.


                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} mb={3}>

                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Stack direction="row" mt={3} p={2} alignItems="center" borderRadius={3} spacing={2}>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h2' color="primary.main">
                                The New Face of the Academy
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>

                                Duplication of experiments can be avoided and

                                it is time to access data and financially encourage the data owner of the researchers.
                            </Typography>
                            <Link to="/signup"><Button sx={{ minWidth: 100 }} variant='contained'>JOIN FOR FREE</Button></Link>
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
                            <Stack height="95%">
                                <Box borderRadius={3} component="img" src={Researcher} width="100%" height="100%" sx={{ objectFit: 'cover' }} />
                            </Stack>

                        </Grid>
                        <Grid item sm={12} md={7}>
                            <Stack spacing={3} p={10} >

                                <Stack spacing={5}>
                                    <Stack spacing={1}>
                                        <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                            <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                            More than one output is obtained from an academic study. In published articles, generally some of them can be presented and discussed. In some of the related publications, outputs are only mentioned, but no data are presented.
                                        </Typography>
                                        <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                            <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                            In the published articles, the data are presented as a summarized table or graphically. This makes it difficult to reuse the data by other researchers.
                                        </Typography>
                                        <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                            <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                            Many of the outputs mentioned in the relevant articles (for example: graphical representations) cannot be presented due to the page limit. It may not be possible to present survey data or provide graphs of all the results.
                                        </Typography>
                                        <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                            <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                            RDL platform was established to ensure that the data in the studies can be easily discovered and accessed and to offer academic incentives to researchers.
                                        </Typography>
                                    </Stack>
                                    <Stack>
                                        <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h3'> Academic Research Incentive</Typography>            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                            <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                            The main purpose of the <b>Raw Data Library</b>  is to contribute to the scientific world by providing easy access to <b>Experimental Raw Data or Analytical Models</b> by other researchers.
                                        </Typography>
                                        <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                            <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                            In this context, researchers who upload their <b>Raw Data</b> to the online system with their own consent provide their previously obtained raw data to the use of other researchers.
                                        </Typography>
                                        <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                            <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                            Data owners are <b>financially supported</b> for each of their data downloaded by other researchers.
                                        </Typography>
                                    </Stack>

                                </Stack>

                            </Stack>

                        </Grid>
                    </Grid>
                </Stack>

            </Container>
            <Container maxWidth>
                <Stack >
                    <Grid container sx={{ height: (isSmallScreen ? "100%" : "100vh"), opacity: 1, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} bgcolor="white" borderRadius={3}  >
                        <Grid item sm={12} md={5}>
                            <Stack height="95%">
                                <Box borderRadius={3} component="img" src={Type} width="100%" height="100%" sx={{ objectFit: 'cover' }} />
                            </Stack>

                        </Grid>
                        <Grid item sm={12} md={7}>
                            <Stack spacing={3} p={10} >
                                <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h3'>Upload Your Data</Typography>

                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                    Experimental data,
                                </Typography>
                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                    Survey data,
                                </Typography>
                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                    Analytical models,
                                </Typography>

                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                    Software/Codes
                                </Typography>
                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                    Algorithms and methods,
                                </Typography>
                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                    Tabular Data,
                                </Typography>
                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                    Dataset,
                                </Typography>
                                <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                    with all types of formats (e.g., excel, .txt, .docx .csv, .pdf and ext.) used in your research study.

                                </Typography>

                            </Stack>

                        </Grid>
                    </Grid>
                </Stack>

            </Container>
            <Container maxWidth>
            <Stack>
                <Grid container sx={{ opacity: 1, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} bgcolor="white" borderRadius={3}>
                    <Grid item sm={12} md={5}>
                        <Stack height="100%">
                            <Box borderRadius={3} component="img" src={Prem} width="100%" height="100%" sx={{ objectFit: 'cover' }} />
                        </Stack>
                    </Grid>
                    <Grid item sm={12} md={7}>
                        <Stack spacing={3} p={10} bgcolor="white">
                            <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h3'>Premium Membership</Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h4'>Advantages of Premium Membership</Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                Premium members can download raw data offered for free by other researchers.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                Premium members receive their income within the week their data is sold.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                Premium members have unlimited storage capacity.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                The latest studies of the 5 premium members with the highest H-index score are permanently displayed on RDL's public research page.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                Premium members can use the RDL Data Transfer software.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" color="primary.main" variant='h4'>What is RDL Data Transfer?</Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                In scientific studies and multi-author articles, raw data may not be under the control of all authors and can be difficult to access over time.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                RDL Data Transfer allows premium members to transfer their RDL information to any flash memory or computer, ensuring accessibility and ease of use.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                Premium members can download all portfolio information, articles, and corresponding raw data files in a classified format without internet access.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                All studies with cleaned data are readily available to premium members.
                            </Typography>
                            <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />
                                Researchers with more than 500 raw data or an H-index over 30 receive free premium membership from RDL.
                            </Typography>
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
                                <FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />	Access to modelling of FEM, ABAQUS, ANSYS, SAP 2000, Solid Works and other computer modelling and documents.
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
