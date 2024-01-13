import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Stack, Typography } from '@mui/material';


import { createArticle } from '../../services/newData/articleService';
import { createRawDataFile } from '../../services/newRawData/RawDataFileService';
import { createRawData } from '../../services/newRawData/RawDataService';
import { useUserContext } from '../../hooks/AuthProvider';
import PercentageProgressBar from '../view/PercentageProgressBar';
import { createChapterInABook } from '../../services/newData/chapterInABookService';
import { createConferencePaper } from '../../services/newData/conferencePaperService';
import { createThesis } from '../../services/newData/thesisService';
import { createReaserachProject } from '../../services/newData/reasearchProjectService';
import { createCompanyTestReport } from '../../services/newData/companyTestReportService';
import { Check } from '@mui/icons-material';
import { format } from '../../store/pageNumberSlice';
import { clearData } from '../../store/dataSlice';
import { clearType } from '../../store/newDataTypeSlice';
import { clearRawData } from '../../store/rawDataSlice';
import { useLocation } from 'react-router-dom';

export default function UploadForm() {
    const [publicationId, setPublicationId] = useState(null);
    const [fileSize, setFileSize] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const [loadingInfoText, setLoadingInfoText] = useState("");
    const [progress, setProgress] = useState(0);
    const [isFinish, setIsFinish] = useState(false)
    const dt = useSelector((state) => state.newDataType.value);
    const data = useSelector((state) => state.data.value);
    const rawData = useSelector((state) => state.rawData);
    const dispatch = useDispatch();
    const { token } = useUserContext();
    const location = useLocation();
    const currentEndpoint = location.pathname;
    useEffect(() => {
        if (isFinish) {
            dispatch(clearData())
            dispatch(clearType())
            dispatch(clearRawData())
        }
    }, [isFinish]);

    const loadingCalculator = (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
    }

    const convertForm = async ({ name, previewUrl, comment, priceSuggestion, rawDataUrl, saveInfo }) => {
        setLoading(true);

        try {
            let rawfile = await fetch(rawDataUrl).then(r => r.blob())
                .then(blobFile =>
                    new File([blobFile], rawDataUrl.split("/").pop(), { type: blobFile.type }
                    ));

            const rawFileName = (rawfile.name || (rawfile instanceof File && rawfile.name === undefined && rawfile.constructor && rawfile.constructor.name === "File" ? rawfile.toString().split(":")[1].trim() : undefined)).toString();

            let previewFile = await fetch(previewUrl).then(r => r.blob())
                .then(blobFile =>
                    new File([blobFile], previewUrl.split("/").pop(), { type: blobFile.type }
                    ));
            const previewFileName = (previewFile.name || (previewFile instanceof File && previewFile.name === undefined && previewFile.constructor && previewFile.constructor.name === "File" ? previewFile.toString().split(":")[1].trim() : undefined)).toString();

            setFileSize(rawfile.size + previewFile.size);
            setLoading(false);

            return { rawfile, rawFileName, previewFile, previewFileName }; // Değerleri obje içinde döndür
        } catch (error) {
            console.error("Error in convertForm:", error);
            setLoading(false);
            throw error; // Hata oluştuğunda uygun şekilde işleyin
        }
    }

    const dataType = async (type) => {
        console.log(type)
        setLoading(true); // Set loading to true during article creation
        setLoadingInfoText(`Creating the ${type} publication...`)
        switch (type) {
            case "Article":
                try {
                    const response = await createArticle(data, token, (progressEvent) => {
                        loadingCalculator(progressEvent);
                    });
                    console.log("article:", response.data);
                    setPublicationId(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false); // Set loading to false after article creation
                    break;
                }
            case "Chapter in a Book":
                try {
                    const response = await createChapterInABook(data, token, (progressEvent) => {
                        loadingCalculator(progressEvent);
                    });
                    console.log(response.data);
                    setPublicationId(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    break;
                }
            case "Conference Paper":
                try {
                    const response = await createConferencePaper(data, token, (progressEvent) => {
                        loadingCalculator(progressEvent);
                    });
                    console.log(response.data);
                    setPublicationId(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    break;
                }
            case "Thesis":
                try {
                    const response = await createThesis(data, token, (progressEvent) => {
                        loadingCalculator(progressEvent);
                    });
                    console.log(response.data);
                    setPublicationId(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    break;
                }
            case "Research Project":
                try {
                    const response = await createReaserachProject(data, token, (progressEvent) => {
                        loadingCalculator(progressEvent);
                    });
                    console.log(response.data);
                    setPublicationId(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    break;
                }
            case "Company Test Report":
                try {
                    const response = await createCompanyTestReport(data, token, (progressEvent) => {
                        loadingCalculator(progressEvent);
                    });
                    console.log(response.data);
                    setPublicationId(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    break;
                }

            default:
                break;
        }
    }

    const LoadRawData = async () => {
        if (publicationId) {
            rawData.map((data) => {
                setLoadingInfoText(`${data.header} file is being created...`)
                createRawDataFile(data.header, publicationId, token, (progressEvent) => {
                    loadingCalculator(progressEvent);
                }).then(res => {
                    console.log(res);
                    if (res) {
                        data.rawData.forEach(async (group) => {

                            if (group && group.name && group.name.trim() !== "") {
                                console.log(group.name)
                                const files = await convertForm(group);
                                setLoadingInfoText(`Raw data named ${data.header}-${group.name}  is being loaded...`)
                                await createRawData(group, files, res, token, (progressEvent) => {
                                    loadingCalculator(progressEvent);
                                });
                            } else {
                                console.log('Error: "name" is empty or undefined in rawdata');
                            }
                        });
                    } else {
                        console.log('Error: Response or response data is undefined');
                    }

                }).catch((e) => {
                    console.log(e);
                })
            })

            setIsFinish(true)
        } else {
            console.log("publication id yok.")
        }
    }

    useEffect(() => {
        console.log(dt);
        dataType(dt);
        // Do not call LoadRawData here; instead, wait for the publicationId to be set
    }, [dt, data, rawData, token]); // Added dependencies to useEffect

    useEffect(() => {
        if (publicationId !== null) {
            LoadRawData(); // Call LoadRawData when publicationId is set
        }
    }, [publicationId]);
    if (isFinish) {

        return (
            <Container maxWidth="md" sx={{ p: 2 }}>
                <Stack justifyContent="center" alignItems="center" spacing={1} border={"2px solid"} borderRadius={3} borderColor="primary.main" p={2}>
                    <Check sx={{ height: 100, width: 100, color: "primary.main" }} />
                    <Typography color="primary.main" variant='h4'>Installation Completed</Typography>
                    <Button variant='contained' href='/' onClick={() => dispatch(format())}>
                        Keep discovering new information</Button>
                </Stack>
            </Container>


        )
    }
    return (
        <Stack justifyContent="center" alignItems="center" p={5}>
            <PercentageProgressBar percent={progress} text={loadingInfoText} />

        </Stack>
    )
}
