import { Container, Stack, Typography, makeStyles } from '@mui/material'

import React from 'react'


const AboutUs = () => {

  return (
    <Container>


      <Stack bgcolor="background.default" p={2} borderRadius={3} mt={2}>


        <Typography variant="h3" gutterBottom>
          Raw Data Library
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
        <Typography variant="body1" gutterBottom>
          Data owners are financially supported for each of their data downloaded by other
          researchers.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thanks to Access to Raw Data Library:
        </Typography>
        <ul>
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
        <Typography variant="h4" gutterBottom>
          ACADEMIC INCENTIVE TO AUTHORS / PAYMENT PROCESS
        </Typography>
        <Typography variant="body1" gutterBottom>
          Researchers who upload their Raw Data to the system are paid according to the number of
          downloads of their data through the Raw Data Library company.
        </Typography>
        <Typography variant="body1" gutterBottom>
          60% of the revenue generated from downloading your data by other researchers is paid
          equally to the authors. Authors are paid for each new download.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Payments to authors are paid equally to authors after their study reaches each new 5
          downloads.
        </Typography>
        <Typography variant="body1" gutterBottom>
          After the number of downloads for the relevant raw data reaches 5, the technical team
          contacts the authors to process the payments.
        </Typography>
        <Typography variant="body1" gutterBottom>
          If the number of downloads for the relevant raw data does not reach 5, the authors are paid at
          the end of the 3 months following the first day of purchased data.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Authors can also track the number of times their data has been downloaded from their
          own profile page.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Co-authors can upload the same article to their own profile pages. Intermediate payments are
          made to the co-authors for the data purchased from each profile.
        </Typography>
        <Typography variant="body1" gutterBottom>
          After the interim payments for the relevant data are made, the payment information is
          uploaded to the profile page of each author. Thus, if any of the co-authors has not received the
          possible interim payments for various reasons, the payment is made again for the relevant co-
          author.
        </Typography>
        <Typography variant="body1" gutterBottom>
          If any of your articles have not been published anywhere, you can also upload the full text of
          the relevant article “such as conference papers or your own studies” to the system separately
          along with the raw data.
        </Typography>
        <Typography variant="body1" gutterBottom>
          If your article has been published somewhere and if it is not an open access, authors can
          upload only the raw data of the relevant article to the system with the title of the published
          paper.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Raw Data Library
        </Typography>
      </Stack>
    </Container>
  );
}

export default AboutUs