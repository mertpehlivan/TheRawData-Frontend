import { Search } from '@mui/icons-material'
import { Box, InputAdornment, Stack, TextField } from '@mui/material'
import React from 'react'

export default function SearchSimple({width}) {
  return (

        <TextField
            size='small'
            sx={{
              width,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <Search />
                </InputAdornment>
              ),
            }}
            placeholder="Search for research, journals, people, etc."
        />
  
  )
}
