import { Divider, List, ListItemButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

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
        
                <Link to={`/users/${username}/articles`} style={{textDecoration:"none"}}><ListItemButton >Article (2)</ListItemButton></Link>
                <Link to={`/users/${username}/thesis`} style={{textDecoration:"none"}}><ListItemButton>Thesis (2)</ListItemButton></Link>
                <Link to={`/users/${username}/chapterInABooks`} style={{textDecoration:"none"}}><ListItemButton>Chapter in a Book (2)</ListItemButton></Link>
                <Link to={`/users/${username}/reasearchProject`} style={{textDecoration:"none"}}><ListItemButton >Reasearch Project (2)</ListItemButton></Link>
                <Link to={`/users/${username}/conferencePaper`} style={{textDecoration:"none"}}><ListItemButton >Conference Paper (3)</ListItemButton></Link>
                <Link to={`/users/${username}/companyTestReport`} style={{textDecoration:"none"}}><ListItemButton>Company Test Report (2)</ListItemButton></Link>
                <Link to={`/users/${username}/`} style={{textDecoration:"none"}}><ListItemButton>All (14)</ListItemButton></Link>
            
        </List>
        
    </Stack>
  )
}
