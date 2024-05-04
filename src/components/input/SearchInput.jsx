import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { useUserContext } from '../../hooks/AuthProvider';
import { Autocomplete, Avatar, Button, Divider, Stack, Typography } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import InviteAuthor from '../form/InviteAuthor';
import { searchUser, searchUserByUniqueName } from '../../services/userService';

const SearchComponent = ({ setAuthorIds, authorIds }) => {
  const [fullName, setFullName] = useState('');
  const { token, user } = useUserContext();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]); // New state to store selected authors
  const [inviteBox, setInviteBox] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleInvite = (invitedAuthor) => {
    setSelectedAuthors((prevAuthors) => [...prevAuthors, invitedAuthor]);
    setAuthorIds((prevIds) => [...prevIds, invitedAuthor.id]);
    console.log(invitedAuthor)
    setInviteBox(false);
  };
  const handleSearch = debounce(async () => {
    try {
      const [firstName, ...rest] = fullName.split(' ');
      const lastName = rest.join(' ');
      
      let response = null;
      if (firstName.startsWith('@')) {
        const cleanedSearchData = firstName.substring(1);
        response = await searchUserByUniqueName(token, cleanedSearchData);
      } else {
        response = await searchUser(token, fullName);
      }
  
      const additionalName = rest.length > 1 ? rest[1] : '';
      const updatedResults = response.data.map(result => ({
        ...result,
        fullName: `${result.firstname} ${result.lastname} ${additionalName}`,
      }));
  
      setSearchResults(updatedResults);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }, 500);

  const handleChange = (e) => {
    setFullName(e.target.value);
    handleSearch();
  };

  const getOptionLabel = (searchResult) => `${searchResult.firstname} ${searchResult.lastname}`;

  const handleAutocompleteChange = (_, value) => {
    // Set the selected authors to the state
    setSelectedAuthors(value);
    // Set the selected author IDs to the parent component's state
    setAuthorIds(value.map((author) => author.id));
  };

  const renderOption = (props, option) => (
    <li {...props} key={option.id}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar src={`${baseUrl}/api/v1/auth/profileImage/${option.profileImageName}`} sx={{ width: "25px", height: "25px" }} />
        <Stack>
          <Typography>{`${option.firstname} ${option.lastname}`}</Typography>
          <Typography variant='body1'>@{option.uniqueName}</Typography>
        </Stack>
      </Stack>
      <Divider/>
    </li>
  );

  const isOptionEqualToValue = (option, value) => {
    if (!option || !value) {
      return false;
    }

    return (
      option.id === value.id &&
      option.firstname === value.firstname &&
      option.lastname === value.lastname &&
      option.email === value.email &&
      option.country === value.country
    );
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-default"
        options={searchResults}
        getOptionLabel={getOptionLabel}
        onChange={handleAutocompleteChange}
        onInputChange={handleChange}
        isOptionEqualToValue={isOptionEqualToValue}
        value={selectedAuthors} // Set the selected authors to the search input
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Authors"
            placeholder="Search Authors"
          />
        )}
        renderOption={renderOption}
      />
      <Button onClick={() => setInviteBox(prev => !prev)} startIcon={<PersonAdd/>}>Invite Researcher</Button>
      {inviteBox && <InviteAuthor onInvite={handleInvite} setInviteBox = {setInviteBox} />}
    </div>
  );
};

export default SearchComponent;
