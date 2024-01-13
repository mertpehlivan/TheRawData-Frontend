import { Divider, List, ListItemButton, Stack, Typography } from '@mui/material'
import React from 'react'

export default function FilterButton({username,title}) {
  return (
    <Stack 
        bgcolor="background.default"
    borderRadius={3}
    p={1}
    >
        <Typography  variant='h5'>{title}</Typography>
        <Divider/>
        <List>
        
                <ListItemButton href={`/${username}/articles`}>Article (2)</ListItemButton>
                <ListItemButton href={`/${username}/thesis`}>Thesis (2)</ListItemButton>
                <ListItemButton href={`/${username}/chapterInABooks`}>Chapter in a Book (2)</ListItemButton>
                <ListItemButton href={`/${username}/reasearchProject`}>Reasearch Project (2)</ListItemButton>
                <ListItemButton href={`/${username}/conferencePaper`}>Conference Paper (3)</ListItemButton>
                <ListItemButton href={`/${username}/companyTestReport`}>Company Test Report (2)</ListItemButton>
                <ListItemButton href={`/${username}`}>All (14)</ListItemButton>
            
        </List>
        
    </Stack>
  )
}
