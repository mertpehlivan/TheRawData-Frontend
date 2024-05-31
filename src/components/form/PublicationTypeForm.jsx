import { Button, Divider, Grid, Radio, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearType, updateDataType } from '../../store/newDataTypeSlice'
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from '../view/AlertDialog';
import { format, increase } from '../../store/pageNumberSlice';
import { clearData } from '../../store/dataSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { DeveloperMode } from '@mui/icons-material';

export default function () {
    const dataType = useSelector((state) => state.newDataType.value)
    const pageNumber = useSelector((state) => state.pageNumber.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlerCancel = () => {
        dispatch(format())
        dispatch(clearData())
        dispatch(clearType())
        dispatch(clearRawData())
    }
    const handleButtonClick = (type) => {
        dispatch(updateDataType(type))
    }
    return (
        <>
            <Typography mx={4} my={2} variant='h4'>Publication Type</Typography>
            <Divider sx={{ mb: 2, mx: 5 }} />
            <Grid container>
                <Grid item xs={6}>
                    <Stack spacing={2} px={3}>
                        <Button
                            startIcon={<Icon icon="material-symbols:article" />}
                            variant="outlined"
                            onClick={() => handleButtonClick("Article")}
                            sx={{
                                border: dataType === "Article" ? "1px solid black" : "none",
                            }}
                        >
                            Article
                        </Button>
                        <Button
                            startIcon={<Icon icon="grommet-icons:chapter-add" />}
                            variant="outlined"
                            onClick={() => handleButtonClick("Chapter in a Book")}
                            sx={{
                                border: dataType === "Chapter in a Book" ? "1px solid black" : "none",
                            }}
                        >
                            Chapter in a Book
                        </Button>
                        <Button
                            startIcon={<Icon icon="game-icons:video-conference" />}
                            variant="outlined"
                            onClick={() => handleButtonClick("Conference Paper")}
                            sx={{
                                border: dataType === "Conference Paper" ? "1px solid black" : "none",
                            }}
                        >
                            Conference Paper
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={2} px={3}>
                        <Button
                            startIcon={<Icon icon="vaadin:diploma-scroll" />}
                            variant="outlined"
                            onClick={() => handleButtonClick("Thesis")}
                            sx={{
                                border: dataType === "Thesis" ? "1px solid black" : "none",
                            }}
                        >
                            Thesis
                        </Button>
                        <Button
                            startIcon={<Icon icon="charm:search" />}
                            variant="outlined"
                            onClick={() => handleButtonClick("Research Project")}
                            sx={{
                                border: dataType === "Research Project" ? "1px solid black" : "none",
                            }}
                        >
                            Research Project
                        </Button>
                        <Button
                            disabled={true}
                            startIcon={<Icon icon="octicon:report-24" />}
                            variant="outlined"
                            onClick={() => handleButtonClick("Company Test Report")}
                            sx={{
                                border: dataType === "Company Test Report" ? "1px solid black" : "none",
                            }}
                        >
                            Company Test Report
                            <Stack direction="row" alignItems="center">
                                <DeveloperMode sx={{color:"gray"}}/>
                                <Typography color="gray" sx={{ textDecorationLine: "underline", textDecorationStyle: "dashed", textTransform: "lowercase" }}>
                                    Planned
                                </Typography>
                            </Stack>

                        </Button>
                        <Stack direction="row" justifyContent="end" spacing={1}>
                            <Link to='/home'><Button
                                color='error'
                                variant='outlined'
                                onClick={handlerCancel}

                            >
                                Cancel
                            </Button></Link>
                            <Button
                                disabled={dataType === null}
                                variant='contained'
                                onClick={() => dispatch(increase())}
                            >
                                {pageNumber === 3 ? "finish" : "Next"}
                            </Button>
                        </Stack>


                    </Stack>
                </Grid>
            </Grid>
        </>

    )
}
