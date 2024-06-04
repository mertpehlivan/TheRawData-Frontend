import { Box, Container, Skeleton, Stack, Typography, makeStyles } from '@mui/material'
import Photo from '../assets/9.png'
import Incentive from '../assets/incentive.png'
import React, { useState } from 'react'
import { Toys } from '@mui/icons-material'
import { Link } from 'react-router-dom'


const AboutUs = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL

  return (
    <Container>


      <Stack bgcolor="background.default" p={6} borderRadius={3} mt={2} >


        <Typography variant="h3" gutterBottom>
          Raw Data Library
        </Typography>
        <Typography variant="h6" gutterBottom>
          Do useful scientific and research outputs consist of only two points? or is it just a beginning and a ultimate value?
        </Typography>
        <Stack direction="row" alignItems="end" spacing={2.5} p={2}>
          <Box component="img" src={Photo} height={300} width={500} />
          <Stack spacing={1}>
            <Typography variant='h6'>
              As shown in the figure, there is more than one data that needs to be taken into account from point <b>A</b> to point <b>B</b>.
            </Typography>
            <Typography variant='h6'>
              Raw data are needed in order for the articles obtained from scientific studies to be sustainable
              and for the validation and comparisons of previously obtained data to be evaluated with different
              parameters. Thanks to the convenient and easy access of other researchers to previous data,
              the repetition of similar experimental parameters can be prevented.

            </Typography>

          </Stack>
        </Stack>
        <Typography variant='h6' gutterBottom>
          The new face of the academy, RDL, emphasizes that science is no longer just between two points and the importance of preventing the repetition of similar experimental parameters.
        </Typography>
        <Typography variant='h6' gutterBottom>
          The main purpose of the Raw Data Library is to contribute to the scientific world by
          providing easy access to Experimental Raw Data, Analytical Models, and Questionary
          Survey Forms by other researchers.
        </Typography>
        <Typography variant="h6" gutterBottom>
          In this context, researchers who upload their Raw Data to the online system with their own
          consent provide their previously obtained raw data to the use of other researchers.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Researchers who upload their Raw Data to the system are paid according to the number of
          downloads of their data through the Raw Data Library company.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Raw Data Library company is an academic research incentive program and supports the
          further studies of researchers.
        </Typography>
        <Typography variant="h4" gutterBottom>
          The New Face of the Academy
        </Typography>

        <Typography variant="h6">
          Thanks to Access to Raw Data Library:
        </Typography >
        <Typography variant="h6">
          <ul >
            <li>Prevention of repetition of similar experimental test parameters, direct access to
              analytical modeling using software programs and questionnaire survey forms.</li>
            <li>Duplication of experiments can be avoided.</li>
            <li>Testing less number of experimental samples.</li>
            <li>Experimental studies can be completed with less budget.</li>
            <li>More discussion opportunities and the development of more empirical or analytical
              models.</li>
            <li>More citation opportunities.</li>
            <li>Easy validations of previous data.</li>
            <li>Sharing of other data mentioned but not presented in the article.</li>
            <li>Access to modeling of FEM, ABAQUS, ANSYS, SAP 2000, Solid Works and other
              computer modeling and documents.</li>
            <li>Reducing sample size and total number of participants for questionnaire surveys.</li>
            <li>Authors can track the number of times their data has been downloaded from their
              own profile page.</li>
            <li>Authors can access their data online from anywhere in the world.</li>
            <li>Payment information is uploaded to the profile page of each data owner and data
              owners can track their income.</li>
          </ul>
        </Typography>
        <Box>
          <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
            ACADEMIC INCENTIVE TO AUTHORS / PAYMENT PROCESS

          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Researchers who upload their Raw Data to the system are paid according to the number of
          downloads of their data through the Raw Data Library company.
        </Typography>
        <Typography variant="h6" gutterBottom>
          70% of the revenue generated from downloading your data by other researchers is paid
          equally to the authors. Authors are paid for each new download.
        </Typography>
        <Stack direction="row" justifyContent="end" spacing={1}>
          <Stack>
            <Typography variant="h6" gutterBottom>
              Payments to authors are paid equally to authors after their study reaches each new 5
              downloads.
            </Typography>
            <Typography variant="h6" gutterBottom>
              After the number of downloads for the relevant raw data reaches 5, the technical team
              contacts the authors to process the payments.
            </Typography>
            <Typography variant="h6" gutterBottom>
              If the number of downloads for the relevant raw data does not reach 5, the authors are paid at
              the end of the 3 months following the first day of purchased data.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Authors can also track the number of times their data has been downloaded from their
              own profile page.
            </Typography>
          </Stack>

          <img src={Incentive} height={300} width={500} />
          
        </Stack>



        <Typography variant="h6" gutterBottom>
          Co-authors can upload the same article to their own profile pages. Intermediate payments are
          made to the co-authors for the data purchased from each profile.
        </Typography>
        <Typography variant="h6" gutterBottom>
          After the interim payments for the relevant data are made, the payment information is
          uploaded to the profile page of each author. Thus, if any of the co-authors has not received the
          possible interim payments for various reasons, the payment is made again for the relevant co-
          author.
        </Typography>
        <Typography variant="h6" gutterBottom>
          If any of your articles have not been published anywhere, you can also upload the full text of
          the relevant article “such as conference papers or your own studies” to the system separately
          along with the raw data.
        </Typography>
        <Typography variant="h6" gutterBottom>
          If your article has been published somewhere and if it is not an open access, authors can
          upload only the raw data of the relevant article to the system with the title of the published
          paper.
        </Typography>
        <Typography variant="h6">
          How can an academic be encouraged to do more research? How to do a more efficient research in a shorter time ?
        </Typography>
        <Typography variant="h6">
          There is only one answer…..
        </Typography>
        <Typography variant="h6">
          Having RAW DATA of previous studies & and support the further studies of academics
        </Typography>
        <Typography variant="h6">
          RDL company continues its way by determining the basic needs and requirements in all its Researh&Development studies in consultation with academicians.        </Typography>
        <Typography variant="h6">
          Therefore We care about your opinions. Please let us know what you need on the RDL platform? Let’s have a discussion.        </Typography>
        <Typography variant="h5" mt={3}>
          Raw Data Library - The new face of the academy
        </Typography>
        <a href='mailto:info@rawdatalibrary.net'>info@rawdatalibrary.net</a>
      </Stack>
    </Container>
  );
}

export default AboutUs