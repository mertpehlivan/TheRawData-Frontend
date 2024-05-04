import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import React, { useState } from 'react'

import Divider from '@mui/material/Divider';
import PublicIcon from '@mui/icons-material/Public';
import DraftsIcon from '@mui/icons-material/Drafts';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
export default function MenuComponenet({ activeItem, setActiveItem }) {
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <List sx={{ bgcolor: 'background.default', borderRadius: 2, p: 1 }}>
      <Link to='/home' style={{textDecorationLine:"none"}}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleItemClick('Explore')} selected={activeItem === 'Explore'}>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to='search' style={{textDecorationLine:"none"}}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleItemClick('Search')} selected={activeItem === 'Search'}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
      </ListItem>
      </Link>
      <Link to='followedResearchers' style={{textDecorationLine:"none"}}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleItemClick('Followed Channels')} selected={activeItem === 'Followed Channels'}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Followed Researchers" />
          </ListItemButton>
        </ListItem>
      </Link>
      
    </List>
  )
}
