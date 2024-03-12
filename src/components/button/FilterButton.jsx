import { Divider, List, ListItemButton, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { countPublications } from '../../services/userService';
import { useUserContext } from '../../hooks/AuthProvider';

export default function FilterButton({username,title}) {
  const {token} = useUserContext()
  const [data,setData] = useState({})
  const [loading,setLoading] = useState(false)
  useEffect(() => {
   const counFetch = async ()=>{
      setLoading(true)
      const res = await countPublications(token,username) 
      setData(res.data)
      setLoading(false)
   } 
   counFetch()
  }, []);
  return (
    <Stack 
        bgcolor="background.default"
    borderRadius={3}
    p={1}
    >
        <Typography  variant='h5'>{title}</Typography>
        <Divider/>
        { loading &&
          <List>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
            <Skeleton height={40}/>
          </List>
        }
        {!loading && <List>
         
        
                <Link to={`/users/${username}/articles`} style={{textDecoration:"none"}}><ListItemButton >Article ({data.articleCount})</ListItemButton></Link>
                <Link to={`/users/${username}/thesis`} style={{textDecoration:"none"}}><ListItemButton>Thesis ({data.thesis})</ListItemButton></Link>
                <Link to={`/users/${username}/chapterInABooks`} style={{textDecoration:"none"}}><ListItemButton>Chapter in a Book ({data.chapterInBook})</ListItemButton></Link>
                <Link to={`/users/${username}/reasearchProject`} style={{textDecoration:"none"}}><ListItemButton >Reasearch Project ({data.researchProject})</ListItemButton></Link>
                <Link to={`/users/${username}/conferencePaper`} style={{textDecoration:"none"}}><ListItemButton >Conference Paper ({data.conferencePaper})</ListItemButton></Link>
                <Link to={`/users/${username}/companyTestReport`} style={{textDecoration:"none"}}><ListItemButton>Company Test Report ({data.companyTestReport})</ListItemButton></Link>
                <Link to={`/users/${username}/`} style={{textDecoration:"none"}}><ListItemButton>All ({data.articleCount + data.thesis + data.chapterInBook + data.researchProject + data.conferencePaper + data.companyTestReport})</ListItemButton></Link>
            
        </List>}
        
    </Stack>
  )
}
