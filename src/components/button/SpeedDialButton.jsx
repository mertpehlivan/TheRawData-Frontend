import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Button, Paper, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';


const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function SpeedDailButton() {
  return (
    <Paper sx={{position:"fixed", top:670, right:60 ,zIndex:1000}}>
      <Link to="/publications/create">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: -40, right: -10 }}
        icon={<Icon icon="ic:round-plus" width={25} height={25}/>}
        
      >
        
        
      </SpeedDial>
      </Link>
    </Paper>
  );
}