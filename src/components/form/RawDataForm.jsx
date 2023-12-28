import { Box, Button, Stack, Typography } from "@mui/material";
import AccordionCustom from "../view/AccordionCustom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { addExperiment } from "../../store/rawDataSlice";
import { increase } from "../../store/pageNumberSlice";


export default function RawDataForm() {
  const dispatch = useDispatch()
  const rawData = useSelector((state)=>state.rawData)
  const handleExperiment =()=>{
    dispatch(addExperiment())
  }
  return (
    
    <Stack>
        {rawData.map((data,index)=> <AccordionCustom key={index} index={index}/>)}
        <Stack mt={2} justifyContent="center" alignItems="center">
        <Typography variant="body2" color="gray">Upload another raw data variable for the same sample or study.</Typography>
          <Box sx={{width:"50px"}}>
            
            <Button
              variant="contained"
              size="small"
              onClick={handleExperiment}
            >
              <Icon icon="ph:plus-fill" 
                  width="50px" 
                  height="50px"
                />
            </Button>
            
          </Box>
         
        </Stack>
        <Stack justifyContent="end" mt={10} p={5}>
            <Button variant="contained" sx={{w:50}} onClick={()=>dispatch(increase())}>Upload</Button>
        </Stack>
        
    </Stack>
  
    

  )
}
