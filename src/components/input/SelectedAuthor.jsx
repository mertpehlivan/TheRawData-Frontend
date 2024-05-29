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
import { Button, Divider, MenuItem, Select, Stack } from '@mui/material';
import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; // useEffect import edildi
import { useUserContext } from '../../hooks/AuthProvider';
import Slide from '@mui/material/Slide';

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function SelectedAuthor({ role = null, selectedAuthor, deleteList, setRole, setSelectedAuthor }) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const dataType = useSelector((state) => state.newDataType.value);
  const { user } = useUserContext();

  const handleRoleChange = (event, author) => {
    const newRole = event.target.value;
    setSelectedAuthor(prevAuthors => {
      const updatedAuthors = prevAuthors.map(prevAuthor => {
        if (prevAuthor.user.id === author.user.id) {
          return { ...prevAuthor, role: newRole };
        }
        return prevAuthor;
      });
      return updatedAuthors;
    });
  };

  const moveAuthor = (index, direction) => {
    setSelectedAuthor((prevAuthors) => {
      const newAuthors = [...prevAuthors];
      const [movedAuthor] = newAuthors.splice(index, 1);
      newAuthors.splice(index + direction, 0, movedAuthor);
      return newAuthors;
    });
  };

  const animationDuration = 200;

  // Avatar resimlerini ön yükle
  useEffect(() => {
    selectedAuthor.forEach(author => {
      if (author.user.profileImageName) {
        const img = new Image();
        img.src = `${baseUrl}/api/v1/auth/profileImage/${author.user.profileImageName}`;
      }
    });
  }, [selectedAuthor]);

  return (
    <Stack>
      <Grid item>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Authors
        </Typography>
        <Divider />
        <Box sx={{ overflowY: "auto" }} maxHeight={200}>
          {
            selectedAuthor.map((author, index) => (
              <Slide
                key={index}
                direction="right"
                in={true}
                timeout={{ enter: index * animationDuration, exit: animationDuration }}
                mountOnEnter
                unmountOnExit
              >
                <ListItem divider>
                  <ListItemAvatar>
                    {author.user.profileImageName ? <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${author.user.profileImageName}`} /> : <Avatar />}
                  </ListItemAvatar>
                  <ListItemText>{author.user.firstname} {author.user.lastname} <ListItemText>@{author.user.uniqueName}</ListItemText></ListItemText>
                  {(dataType === "Research Project" || role === "Research Project") && (
                    <Select size='small' sx={{ width: 80 }} value={author.role} onChange={e => handleRoleChange(e, author)}>
                      <MenuItem value={"Advisor"}>Advisor</MenuItem>
                      <MenuItem value={"Project manager"}>Project manager</MenuItem>
                      <MenuItem value={"Researcher"}>Researcher</MenuItem>
                      <MenuItem value={"Student"}> Student</MenuItem>
                    </Select>
                  )}
                  {author.user.id !== user.id && (
                    <ListItemIcon onClick={() => deleteList(author.user.id)}>
                      <Delete />
                    </ListItemIcon>
                  )}
                  <Stack>
                    <Button disabled={index === 0} onClick={() => moveAuthor(index, -1)}>
                      <ArrowUpward/>
                    </Button>
                    <Button disabled={index === selectedAuthor.length - 1} onClick={() => moveAuthor(index, +1)}>
                      <ArrowDownward/>
                    </Button>
                  </Stack>
                </ListItem>
              </Slide>
            ))
          }
        </Box>
      </Grid>
    </Stack>
  );
}
