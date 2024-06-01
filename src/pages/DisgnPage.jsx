import { useTheme, keyframes } from '@emotion/react';
import { Box, Button, ButtonGroup, Container, Grid, Stack, Typography, useMediaQuery, Fade, Slide, CircularProgress, Paper, Zoom } from '@mui/material';
import React, { useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import Disc from '../assets/disc.gif'
import Usablity from '../assets/Usability testing.gif'
import Aricle from '../assets/Online article.gif'
import Paid from '../assets/Paid idea.gif'
import Bussine from '../assets/Business support.gif'
import { Check, FiberManualRecord } from '@mui/icons-material';
import UploadImage from '../assets/Image upload-rafiki.svg'
const baseUrl = process.env.REACT_APP_BASE_URL;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DisgnPage = () => {
  const [videoLoaded, setVideoLoaded] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <Stack spacing={2}>
      {!videoLoaded && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'white',
            zIndex: 9999,
          }}
        >
          <CircularProgress color="primary" />
        </Stack>
      )}

      <Stack spacing={3} sx={{ animation: `${fadeIn} 2s ease-in-out`, display: videoLoaded ? 'block' : 'none' }}>
        {process.env.PUBLIC_URL.toString()}
        <Box position="absolute" sx={{ opacity: 0.5, height: "90vh" }} zIndex={-10}>
          <video
            autoPlay
            loop
            muted
            style={{ width: '99.45vw', height: '100vh', objectFit: 'fill', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
            onLoadedData={handleVideoLoad}
          >
            <source src={`${baseUrl}/api/v1/auth/publicImage/3141210-sd_960_540_25fps.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </Box>

        <Container maxWidth>
          <div id="back-to-top-anchor" />
          <Box position="static" width="100%" style={{}}>
            <Stack direction="row" justifyContent="space-between" p={1}>
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
              <Stack
                sx={{
                  justifyContent: isSmallScreen ? 'center' : 'flex-start',
                  alignItems: isSmallScreen ? 'center' : 'flex-start',
                }}
              >
                <Box
                  component="img"
                  src={Logo}
                  width={isSmallScreen ? 300 : 400}
                  sx={{ animation: `${fadeIn} 2s ease-in-out` }}
                />
                <Typography fontFamily="Times New Roman,sans-serif" variant={isSmallScreen ? 'h4' : 'h3'}>
                  ACADEMIC RESEARCH INCENTIVE
                </Typography>
              </Stack>

              <Stack alignItems="flex-end">
                <Typography fontFamily="Times New Roman,sans-serif" p={2} borderRadius={3} variant={isSmallScreen ? 'h6' : 'h4'} width={isSmallScreen ? "100%" : 700}>
                  Academic incentives are provided to researchers who upload their raw or processed data to the RDL platform and they are paid according to the number of downloads of their data through the Raw Data Library company
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} mb={3}>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Stack direction="row" alignItems="center" borderRadius={3} spacing={2}>
                  <Typography fontFamily="Times New Roman,sans-serif" variant='h2' color="primary.main">
                    The New Face of the Academy
                  </Typography>
                  <Typography fontFamily="Times New Roman,sans-serif" variant='h5'>
                    Duplication of experiments can be avoided and it is time to access data and financially encourage the data owner of the researchers.
                  </Typography>
                  <Link to="/signup">
                    <Button sx={{ minWidth: 100 }} variant='contained'>JOIN FOR FREE</Button>
                  </Link>
                </Stack>
              </Slide>
            </Grid>
          </Grid>
        </Container>


      </Stack>
      <Stack width="100%">
        <Container>
          <Paper>
            <Stack width="100%">
              <Grid container spacing={2} p={3}>
                <Grid item xs={3} >
                  <img src={Disc} width={240} />
                  <Typography color="primary" variant='h5'> <b>Presentation and Discussion of Multiple Outputs</b></Typography>
                  <Typography variant='h6'>
                    More than one output is obtained from an academic study. In published articles, generally some of them can be presented and discussed. In some of the related publications, outputs are only mentioned, but no data are presented.
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <img src={Usablity} width={240} />
                  <Typography color="primary" variant='h5'><b>Presentation and Reusability of Data</b></Typography>
                  <Typography variant='h6'>

                    In the published articles, the data are presented as a summarized table or graphically. This makes it difficult to reuse the data by other researchers.
                  </Typography>
                </Grid>
                <Grid item xs={3} >
                  <img src={Aricle} width={240} />
                  <Typography color="primary" variant='h5'> <b>Page Limitations and Presentation of Outputs</b></Typography>
                  <Typography variant='h6'>

                    Many of the outputs mentioned in the relevant articles (for example: graphical representations) cannot be presented due to the page limit. It may not be possible to present survey data or provide graphs of all the results.
                  </Typography>
                </Grid>
                <Grid item xs={3} >
                  <img src={Paid} width={240} />
                  <Typography color="primary" variant='h5'> <b>Establishment Purpose of RDL Platform</b></Typography>
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
                <img src={Bussine} width={150} />
                <Stack>
                  <Typography color="primary" variant='h5'><b>Academic Research Incentive</b></Typography>
                  <Typography variant='h6'><Check />The main purpose of the Raw Data Library is to contribute to the scientific world by providing easy access to Experimental Raw Data or Analytical Models by other researchers.</Typography>
                  <Typography variant='h6'><Check />In this context, researchers who upload their Raw Data to the online system with their own consent provide their previously obtained raw data to the use of other researchers.</Typography>
                  <Typography variant='h6'><Check />Data owners are financially supported for each of their data downloaded by other researchers.</Typography>
                </Stack>
                <Stack justifyContent="center">
                  <Link to="/signup">
                    <Button sx={{ minWidth: 100 }} variant='contained'>JOIN FOR FREE</Button>
                  </Link>
                </Stack>

              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Stack>
      <Stack>
        <Container>
          <Paper>
            <Stack direction="row" p={2}>
              <img src={UploadImage} width={300} />
              <Stack>
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
            </Stack>
          </Paper>
        </Container>
      </Stack>

    </Stack>
  );
};

export default DisgnPage;
