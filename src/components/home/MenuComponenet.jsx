import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import React, { useState } from 'react'

import Divider from '@mui/material/Divider';
import PublicIcon from '@mui/icons-material/Public';
import DraftsIcon from '@mui/icons-material/Drafts';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SearchIcon from '@mui/icons-material/Search';
export default function MenuComponenet({activeItem, setActiveItem}) {
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <List sx={{ bgcolor: 'background.default', borderRadius: 2, p: 1 }}>
      <ListItem disablePadding>
        <ListItemButton href='/' selected={activeItem === 'Explore'}>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton href='followedResearchers' onClick={() => handleItemClick('Followed Channels')} selected={activeItem === 'Followed Channels'}>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Followed Researchers" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleItemClick('Search')} selected={activeItem === 'Search'}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
      </ListItem>
    </List>
  )
}
