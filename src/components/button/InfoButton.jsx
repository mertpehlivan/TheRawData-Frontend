import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
export default function InfoButton({text}) {
  return (
    <Tooltip title={text} arrow>
    <IconButton>
      <InfoIcon />
    </IconButton>
  </Tooltip>
  )
}
