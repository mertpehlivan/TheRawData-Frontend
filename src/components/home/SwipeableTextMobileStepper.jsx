import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import Skeleton from '@mui/material/Skeleton';
import { Stack, Typography } from '@mui/material';
import { FileIcon, defaultStyles } from 'react-file-icon';

function SwipeableTextMobileStepper({ data }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newList = [];

      for (const file of data.rawdatafiles) {
        for (const rawData of file.rawDatas) {
          newList.push({
            fileEx: rawData.rawDataExtension,
            name: rawData.title,
            url: `http://localhost:8080/api/v1/auth/previewImage/${rawData.previewImageUrl}`
          });
        }
      }

      setList(newList);
    };

    fetchData();

    // Temizleme işlemleri
    return () => {
      setList([]);
    };
  }, [data]);

  const handleNextClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackClick = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }} p={2} >
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {list.map((step, index) => (
          <div key={index}>
            <Stack direction="row" spacing={1}>
              <Box width={20} justifyItems="center">
                <FileIcon extension={step.fileEx} {...defaultStyles.docx} />
              </Box>
              <Typography>{step.name}</Typography>
            </Stack>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'flex',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.url}
                alt={step.name}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={255}
                animation="wave"
              />
            )}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={list.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNextClick}
            disabled={activeStep === list.length - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBackClick}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
