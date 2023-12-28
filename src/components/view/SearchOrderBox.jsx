import { MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import SearchSimple from '../input/SearchSimple'

export default function SearchOrderBox() {
  return (
    <Stack direction="row" bgcolor="background.default" p={1} borderRadius={3} spacing={1}>
                    <SearchSimple width="50%"/>
                    <Stack direction="row" alignItems="center">
                        <Typography>Sorted by:</Typography>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            
                            size='small'
                           
                            >
                            <MenuItem value="None">
                                None
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Stack>
                    
                </Stack>   
  )
}
