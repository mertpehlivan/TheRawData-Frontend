import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, MenuItem, Select, Stack } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useUserContext } from '../../hooks/AuthProvider';


const baseUrl = process.env.REACT_APP_BASE_URL

export default function SelectedAuthor({role, selectedAuthor, deleteList, setRole, setSelectedAuthor }) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const dataType = useSelector((state) => state.newDataType.value)
  const {user} = useUserContext()
  const handleRoleChange = (event,author) => {
    const newRole = event.target.value;
    setSelectedAuthor(prevAuthors => {
      const updatedAuthors = prevAuthors.map(prevAuthor => {
        if (prevAuthor.user.id === author.user.id) {
          return { ...prevAuthor, role:newRole};
        }
        return prevAuthor;
      });
      return updatedAuthors;
    });
  };

  return (
    <Stack>
      <Grid item>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Authors
        </Typography>
        <Divider />
        <Box sx={{overflowY:"auto"}} maxHeight={200}>
          {
            selectedAuthor.map((author, index) => (
              <ListItem key={index} divider>
                <ListItemAvatar>
                  {author.user.profileImageName ? <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${author.user.profileImageName}`} /> : <Avatar/>}
                </ListItemAvatar>


                <ListItemText>{author.user.firstname} {author.user.lastname} <ListItemText>@{author.user.uniqueName}</ListItemText></ListItemText>
                {dataType == "Research Project" || role == "Research Project" && <Select size='small' sx={{ width: 80 }} value={author.role} onChange={e=>handleRoleChange(e,author)}>
                  <MenuItem value={"Advisor"}>Advisor</MenuItem>
                  <MenuItem value={"Project manager"}>Project manager</MenuItem>
                  <MenuItem value={"Researcher"}>Researcher</MenuItem>
                  <MenuItem value={"Student"}> Student</MenuItem>
                </Select>}
                {author.user.id !== user.id && <ListItemIcon onClick={() => deleteList(author.user.id)}><Delete /></ListItemIcon>}

              </ListItem>
            ))
          }

        </Box>

      </Grid>
    </Stack>
  );
}