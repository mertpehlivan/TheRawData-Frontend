import { useTheme, keyframes } from '@emotion/react';
import { Box, Button, ButtonGroup, Container, Grid, Stack, Typography, useMediaQuery, Fade, Slide, CircularProgress, Paper, Zoom, Divider, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import Disc from '../assets/disc.gif'
import Usablity from '../assets/Usability testing.gif'
import Aricle from '../assets/Online article.gif'
import Paid from '../assets/Paid idea.gif'
import Bussine from '../assets/Business support.gif'
import { ArrowLeft, ArrowRight, Check, Circle, FiberManualRecord, ForkLeft, ForkRight } from '@mui/icons-material';
import UploadImage from '../assets/Image upload-rafiki.svg'
import ImageOne from '../assets/1.gif'
import ImageTwo from '../assets/2.gif'
import ImageThree from '../assets/4.gif'
import ImageFour from '../assets/3.gif'
import ImageFive from '../assets/5.gif'
import ImageSix from '../assets/6.gif'
import ImageSeven from '../assets/7.gif'
import ImageEight from '../assets/8.gif'
import ImageNine from '../assets/9.gif'
import ImageTen from '../assets/10.gif'
import Footer from '../components/Footer';
import MainImage from '../assets/end2.svg'
import NoAuthBar from '../components/input/AppBar'
import axios from 'axios';
import DataPost from '../components/home/DataPost';
import Conferences1 from '../assets/Civil Engineering Congress 2025_Call for Abstracts_1350x420.jpg'
import Conferences2 from '../assets/Civil Engineering Congress 2025_Home Banner1350x420 (1).jpg'
import Razaqpur from '../assets/GhaniRazaqpur.jpg'
import Hassan from '../assets/Hassan.jpg'
import Rohani from '../assets/Rohani.jpg'
const baseUrl = process.env.REACT_APP_BASE_URL;


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const feedbacks = [
  {
    name: "Prof. Dr. A. Ghani Razaqpur",
    degree: "McMaster University",
    comment: "Having raw data of previous studies and comparisions of them with new studies is the one of the key to increase the chance of publications.",
    image: Razaqpur,
  },
  {
    name: "Dalieh Hassan Dalieh",
    degree: "PhD Student ",
    comment: "By accessing the raw data, I had the opportunity to complete my own thesis with less budget by reducing the number of samples in my own experimental program.",
    image: Hassan,
  },
  {
    name: "Ronahi Ertaş",
    degree: "Master Student",
    comment: "It was not easy to request and receive raw data from others. Thanks to the RDL platform, I had easy access to raw data. ",
    image: Rohani,
  },

  // Add more feedbacks as needed
];
const MainPage = () => {
  // const [videoLoaded, setVideoLoaded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(0)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/v1/auth/public/randPost`);
        const data = response.data;
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
      </Stack>
    );
  }
  return (
    <Stack spacing={2}>
      <NoAuthBar />
      <Stack spacing={3} sx={{ animation: `${fadeIn} 2s ease-in-out` }}>
        {process.env.PUBLIC_URL.toString()}
        <Container maxWidth>
          <div id="back-to-top-anchor" />

          <Grid container height="80vh" mb={8}>
            <Grid item xs={12}>
              <Stack direction="row">
                <Stack
                  sx={{
                    justifyContent: isSmallScreen ? 'center' : 'flex-start',
                    alignItems: isSmallScreen ? 'center' : 'flex-start',
                  }}
                >
                  <Box
                    component="img"
                    src={Logo}
                    mt={isSmallScreen && 5}
                    width={isSmallScreen ? 300 : 400}
                    sx={{ animation: `${fadeIn} 2s ease-in-out` }}
                  />
                  <Typography fontFamily="Times New Roman,sans-serif" variant={isSmallScreen ? 'h5' : 'h4'}>
                    THE NEW FACE OF THE ACADEMY
                  </Typography>
                </Stack>
                <Stack zIndex={-100} position="absolute" width="100%" right={0} alignItems="flex-end">
                  {!isSmallScreen && <img src={MainImage} width={1000} />}
                </Stack>

              </Stack>

              <Grid mt={3} maxWidth={500} container spacing={1} justifyContent={!isSmallScreen && "center"} alignItems={!isSmallScreen && "center"}>
                <Grid item md={12} sm={12} alignItems="center" borderRadius={3} spacing={2} p={3}>
                  <Typography fontFamily="Times New Roman,sans-serif" variant='h2' color="primary.main">
                    Intellectual Property Rights of Raw Data
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} justifyContent={!isSmallScreen && "center"} alignItems={!isSmallScreen && "center"} borderRadius={3} spacing={2} p={3}>
                  <Typography alignItems="center" fontFamily="Times New Roman,sans-serif" variant='h5'>
                    Nowadays, journal publishers establish different
                    journals that focus only on the data of articles published
                    in other journals. Unless the processed data presented in research studies
                    are presented as raw data in a journal and the author is
                    not paid for their rights, the ownership and legal rights
                    of the raw data belong to the researchers.
                  </Typography>

                </Grid>

                {!isSmallScreen && <Grid item md={2} sm={12} justifyContent={"center"} alignItems={"center"} borderRadius={3} spacing={2} p={3}>
                  <Stack alignItems="center" justifyContent="center" direction="row">
                    <Link to="/signup">
                      <Button fullWidth sx={{ minWidth: 300 }} variant='contained'>JOIN FOR FREE</Button>
                    </Link>
                  </Stack>

                </Grid>}
              </Grid>
            </Grid>


          </Grid>
        </Container>
      </Stack>
      <Stack width="100%">
        <Container>

          <Stack width="100%" spacing={2} mb={3}>
            <Paper >
              <Stack direction={isSmallScreen ? "column" : "row"} spacing={2} p={3}>
                <Avatar>JM</Avatar>
                <Typography color="primary.main"><b>Journal Manager</b></Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Stack>

                  <Typography>Dear Dr.,</Typography>
                  <Typography>Thank you for contacting journal of “….” regarding your request.</Typography>
                  <Typography>I would like to inform you that the raw data of the manuscript remains with the authors of the
                    manuscript.You can reach out to the corresponding author of the article, Dr. “…..” at
                    ....@..... to request the data however the decision to share the data remains with the author.</Typography>
                </Stack>


              </Stack>
            </Paper>


            <Grid container >
              {feedbacks.map((feedback, index) => (
                <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
                  <Paper
                    elevation={3}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      padding: 3,
                      minHeight: '300px', // Ensure a minimum height for consistency
                    }}
                  >
                    {index % 2 === 0 ? (
                      <Stack direction="column" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 100, height: 100 }} alt={feedback.name} src={feedback.image} />
                        <Typography variant="h6" color="primary.main" align="center">
                          {feedback.name}
                          <Typography variant="body2" color="gray">
                            {feedback.degree}
                          </Typography>
                        </Typography>
                        <Divider sx={{ width: '100%' }} />
                        <Typography variant="body1" align="center">
                          {feedback.comment}
                        </Typography>
                      </Stack>
                    ) : (
                      <Stack direction="column" spacing={2} alignItems="center">
                        <Typography variant="body1" align="center">
                          {feedback.comment}
                        </Typography>
                        <Divider sx={{ width: '100%' }} />
                        <Avatar sx={{ width: 100, height: 100 }} alt={feedback.name} src={feedback.image} />
                        <Typography variant="h6" color="primary.main" align="center">
                          {feedback.name}
                          <Typography variant="body2" color="gray">
                            {feedback.degree}
                          </Typography>
                        </Typography>
                      </Stack>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {!loading && posts.length > 0 && !isSmallScreen && <DataPost data={posts[0]} />}
          </Stack>




        </Container>
      </Stack>
      <Stack width="100%">
        <Container>

          <Paper>
            <Stack width="100%">
              <Grid container spacing={2} p={3}>
                <Grid item md={3} sm={12} >
                  <img src={Disc} width={240} />
                  <Typography color="primary" variant='h5' mb={2}> <b>Presentation and Discussion of Multiple Outputs</b></Typography>
                  <Typography variant='h6'>
                    More than one output is obtained from an academic study. In published articles, generally some of them can be presented and discussed. In some of the related publications, outputs are only mentioned, but no data are presented.
                  </Typography>
                </Grid>
                <Grid item md={3} sm={12}>
                  <img src={Usablity} width={240} />
                  <Typography color="primary" variant='h5' mb={2}><b>Presentation and Reusability of Data</b></Typography>
                  <Typography variant='h6'>

                    In the published articles, the data are presented as a summarized table or graphically. This makes it difficult to reuse the data by other researchers.
                  </Typography>
                </Grid>
                <Grid item md={3} sm={12} >
                  <img src={Aricle} width={240} />
                  <Typography color="primary" variant='h5' mb={2}> <b>Page Limitations and Presentation of Outputs</b></Typography>
                  <Typography variant='h6' >

                    Many of the outputs mentioned in the relevant articles (for example: graphical representations) cannot be presented due to the page limit. It may not be possible to present survey data or provide graphs of all the results.
                  </Typography>
                </Grid>
                <Grid item md={3} sm={12}>
                  <img src={Paid} width={240} />
                  <Typography color="primary" variant='h5' mb={2}> <b>Establishment Purpose of RDL Platform</b></Typography>
                  <Typography variant='h6'>
                    RDL platform was established to ensure that the data in the studies can be easily discovered and accessed and to offer academic incentives to researchers.
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Container>
      </Stack>
      <Stack>
        <Container>
          <Stack>
            <Paper >
              <Stack direction="row" p={3} spacing={2}>
                <Grid container>
                  <Grid item md={4} sm={12}>
                    <img src={Bussine} width={isSmallScreen ? 250 : 350} />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <Stack direction="row" p={3} spacing={2}>
                      <Stack>
                        <Typography color="primary" variant='h5'><b>Academic Research Incentive</b></Typography>
                        <Typography variant='h6'><Check />The main purpose of the Raw Data Library is to contribute to the scientific world by providing easy access to Experimental Raw Data or Analytical Models by other researchers.</Typography>
                        <Typography variant='h6'><Check />In this context, researchers who upload their Raw Data to the online system with their own consent provide their previously obtained raw data to the use of other researchers.</Typography>
                        <Typography variant='h6'><Check />Data owners are financially supported for each of their data downloaded by other researchers.</Typography>
                      </Stack>

                    </Stack>
                  </Grid>
                  <Grid item md={2} sm={12}>
                    <Stack justifyContent="center" alignItems="center" height="100%">
                      <Link to="/signup">
                        <Button size='large' sx={{ minWidth: 100 }} variant='contained'>JOIN FOR FREE</Button>
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Stack>
      <Stack>
        <Container>

          <Paper>
            <Stack direction="row" p={2}>
              <Grid container>
                <Grid item md={6} sm={12}>
                  <Stack direction="row" p={2}>
                    <img src={UploadImage} width={300} />
                  </Stack>
                </Grid>
                <Grid item md={6} sm={12}>
                  <Stack p={1}>
                    <Typography color="primary" variant='h5'><b>Upload Your Data</b></Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Experimental data,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Survey data,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Analytical models,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Software/Codes</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Algorithms and methods,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Tabular Data,</Typography>
                    <Typography variant='h6'><FiberManualRecord sx={{ mr: 1, color: "primary.main" }} />Dataset,</Typography>
                    <Typography variant='h6'>with all types of formats (e.g., excel, .txt, .docx .csv, .pdf and ext.) used in your research study.</Typography>
                  </Stack>
                </Grid>
              </Grid>

            </Stack>
          </Paper>
        </Container>
      </Stack>
      <Stack>
        <Container>

          <Typography color="primary" variant='h5'><b>Thanks to Access to Raw Data Library</b></Typography>
          <Grid container spacing={2} p={2} >
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageOne} width={150} />
                <Typography variant='h6'> Prevention of repetition of similar experimental test parameters and direct access to analytical modelling using software programs.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageTwo} width={150} />
                <Typography variant='h6'> Experimental studies can be completed with less budget.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageThree} width={150} />
                <Typography variant='h6'>More discussion opportunities and the development of more empirical or analytical models.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>



                <img src={ImageFour} width={150} />
                <Typography variant='h6'>More citation opportunities.</Typography>

              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageFive} width={150} />
                <Typography variant='h6'> Easy validations of previous data.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageSix} width={150} />
                <Typography variant='h6'> Sharing of other data mentioned but not presented in the article.,</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageSeven} width={150} />
                <Typography variant='h6'>Access to modelling of FEM, ABAQUS, ANSYS, SAP 2000, Solid Works and other computer modelling and documents.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageEight} width={150} />
                <Typography variant='h6'>Authors can track the number of times their data has been downloaded from their own profile page.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageNine} width={150} />
                <Typography variant='h6'>Authors can access their data online from anywhere in the world.</Typography>
              </Paper>
            </Grid>
            <Grid item md={2.4} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <img src={ImageTen} width={150} />
                <Typography variant='h6'> Payment information is uploaded to the profile page of each data owner and data owners can track their income.</Typography>
              </Paper>
            </Grid>
          </Grid>

        </Container>
      </Stack>
      <Stack>
        <Container>

          <Typography color="primary" variant='h5'><b>Upcoming conferences</b></Typography>
          <Grid container spacing={2} p={2} >
            <Grid item md={12} sm={12} mb={3}>
              <Paper sx={{ p: 2, height: "100%" }}>

                {!isSmallScreen && <Stack >
                  <Typography variant='h5' mb={2}> World Congress on Civil, Structural, and Environmental Engineering</Typography>
                  <Grid container>
                    <Grid item xs={1}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(0)} disabled={slider == 0} startIcon={<ArrowLeft />} variant='contained'></Button>
                      </Stack>
                    </Grid>

                    <Grid item xs={10}>
                      <Link to="https://civilengineeringconference.com/">
                        {slider == 0 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences1} />
                        </Stack>}
                        {slider == 1 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences2} />
                        </Stack>}
                      </Link>
                    </Grid>

                    <Grid item xs={1}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(1)} disabled={slider == 1} endIcon={<ArrowRight />} variant='contained' ></Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>}
                {isSmallScreen && <Stack >
                  <Grid container spacing={1}>


                    <Grid item xs={12}>
                      <Typography variant='h6' mb={2}> World Congress on Civil, Structural, and Environmental Engineering</Typography>
                      <Link to="https://civilengineeringconference.com/">
                        {slider == 0 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences1} />
                        </Stack>}
                        {slider == 1 && <Stack width="100%" justifyContent="center" alignItems="center">
                          <Box component="img" width="100%" src={Conferences2} />
                        </Stack>}
                      </Link>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(0)} disabled={slider == 0} startIcon={<ArrowLeft />} variant='contained'></Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack width="100%" justifyContent="center" alignItems="center" height="100%" borderRadius={3}>
                        <Button onClick={() => setSlider(1)} disabled={slider == 1} endIcon={<ArrowRight />} variant='contained' ></Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Stack>
      <Footer />
    </Stack >
  );
};

export default MainPage;