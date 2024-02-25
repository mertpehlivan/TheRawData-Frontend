import { Box, Button, Stack, Typography } from "@mui/material";
import AccordionCustom from "../view/AccordionCustom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { addExperiment, clearRawData } from "../../store/rawDataSlice";
import { format, increase } from "../../store/pageNumberSlice";
import { clearData } from "../../store/dataSlice";
import { clearType } from "../../store/newDataTypeSlice";
import { Link } from "react-router-dom";


export default function RawDataForm() {
  const dispatch = useDispatch()
  const rawData = useSelector((state) => state.rawData)
  const isRawDataEmpty = rawData.every(experiment => experiment.rawData.every(data => !data.name));
  const handlerCancel = () => {
    dispatch(format())
    dispatch(clearData())
    dispatch(clearType())
    dispatch(clearRawData())
  }
  const handleExperiment = () => {
    dispatch(addExperiment())
  }
  return (

    <Stack>
      {rawData.map((data, index) => <AccordionCustom key={index} index={index} />)}
      <Stack mt={2} justifyContent="center" alignItems="center">
        <Typography variant="h6" mb={1} color="gray">Upload another raw data variable for the same sample or study.</Typography>
        <Box sx={{ width: "50px" }}>

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
      <Stack direction="row" justifyContent="end" mt={10} p={5} spacing={1}>
        <Link to='/'><Button
          color='error'
          variant='outlined'
          onClick={handlerCancel}

        >
          Cancel
        </Button></Link>
        <Button disabled={isRawDataEmpty} variant="contained" sx={{ w: 50 }} onClick={() => dispatch(increase())}>Upload</Button>
      </Stack>

    </Stack>



  )
}
