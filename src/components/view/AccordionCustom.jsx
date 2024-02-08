import { Icon } from '@iconify/react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import UploadBox from './UploadBox';
import { useTheme } from '@emotion/react';
import zIndex from '@mui/material/styles/zIndex';
import { useDispatch, useSelector } from 'react-redux';
import { addDataBox, deleteExperiment, updateHeader } from '../../store/rawDataSlice';

export default function AccordionCustom({index}) {

  const [expanded, setExpanded] = useState(false);
  
  const dispatch =useDispatch()
  const rawData = useSelector((state)=>state.rawData)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleAddEmptyRawData = () => {
    console.log("Add button clicked"); 
    
  
    dispatch(addDataBox({index}));
  };
  
  const theme = useTheme()
  
  return (
    
    <Stack p={3} >
        <Stack alignItems="end">
          <Box>
            <Button 
              variant='contained' 
              color='error'  
              size='small'
            >
              <Icon 
                icon="material-symbols:delete" 
                color="white" 
                width={"20px "} 
                height={"20px"} 
                onClick={()=>{dispatch(deleteExperiment(index))}}
              />
              </Button>
          </Box>
          
        </Stack>
        
        <Accordion 
          sx={{
            
            border:"2px solid "+ theme.palette.primary.main,
            
          }}
          expanded={expanded === 'panel4'} 
          onChange={handleChange('panel4')
          
        }>
        <AccordionSummary
          expandIcon={<Icon icon="oi:caret-bottom" />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          sx={{
            backgroundColor:theme.palette.primary,
            height:"30px"
          }}
        >
          <Typography>{rawData[index].header}</Typography>

        </AccordionSummary>
        
        <AccordionDetails>
        <TextField 
          label="" size='small' 
          sx={{zIndex:"0",mt:-2}}
          onChange={(e)=>{dispatch(updateHeader({index:index,header:e.target.value}))}}
          placeholder="Type the name of the raw data"
          helperText="e.g.; Load-Displacement; Questionary Survey; FEM; Coding"
        />
        <Divider sx={{mb:2}}/>
        <Stack direction="row" flexWrap="wrap" spacing={1} alignItems="center">
            {rawData[index].rawData.map((data, key) => (
              
              <UploadBox
                key={key}
                boxKey={key}
                headerIndex={index}
                
              ></UploadBox>
            ))}
          <Box>
            <Button
              onClick={handleAddEmptyRawData}
            >
              <Icon icon="ph:plus-fill" 
                  width={50} 
                  height={50}
              />
              
            </Button>
          </Box>
          
        </Stack>
        
        </AccordionDetails>
      </Accordion>
    </Stack>
    
  )
}
