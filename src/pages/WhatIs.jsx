import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Logo from '../assets/logo.svg'

const WhatIs = () => {
    return (
        <Container>
            <Stack bgcolor="background.default" p={4} spacing={1}>
                <Stack justifyContent="center" alignItems="center">
                    <Box component="img" width={300}  src={Logo} />
                </Stack>
                <Typography  gutterBottom>
                    By publishing articles in scientific journals, researchers, authors, and students choose suitable journals for their articles as a requirement for academic advancement, sharing new findings with scientific community and sometimes even for graduating from higher education.

                    This process contributes to the publication of a quality publication, especially thanks to the quality referee comments and necessary revisions received during the review process of the articles.

                    However, the fact that publications usually have a page limit at the printing stage creates the problem of presenting all data only by tabulating with summarized data and makes it difficult for another researcher to use the raw data of the relevant study.

                    The graphs presented in the publications are processed data and it is very difficult to obtain the raw data to be used for further studies. RDL present the raw data for that processed data given in articles. In addition, RDL particularly provides data which are mentioned but not given in such publications.

                    At this point, the Raw Data Library has an important place in terms of sharing researchers' data and bringing income to researchers.
                </Typography >
                <Typography variant='h5'>
                    Journal Rights
                </Typography>
                <Typography>
                    Journal rights are seriously protected by RDL. For this reason, it is forbidden to share the full texts of articles published in journals.

                    One of the main of RDL is sharing of other data mentioned but not presented in the articles.

                </Typography>
                <Typography>

                    “Mentioned but not presented data in articles.”

                    Since the relevant data was obtained within the scope of the study in that journal, a citation to the paper published in that journal must be made by other researchers.

                    If a journal publishes the relevant raw data, model file etc. on its own page, it is forbidden to share it on RDL platform.


                </Typography>
                <Typography variant='h5'>
                    Raw Data Library
                </Typography>

            </Stack>
        </Container>
    )
}

export default WhatIs