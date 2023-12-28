import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { useUserContext } from '../../hooks/AuthProvider';
import { Autocomplete, Avatar, Stack, Typography } from '@mui/material';

const SearchComponent = ({ setAuthorIds, authorIds }) => {
  const [fullName, setFullName] = useState('');
  const { token } = useUserContext();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = debounce(async () => {
    try {
      const [firstName, ...rest] = fullName.split(' ');
      const lastName = rest.join(' ');

      const response = await axios.get("http://localhost:8080/api/v1/user/find", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          firstName,
          lastName,
        },
      });

      // Gelen veriyi state'e atıyoruz
      setSearchResults(response.data);

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
    // Set the selected author IDs to the parent component's state
    setAuthorIds(value.map((author) => author.id));
  };
  const renderOption = (props, option) => (
    <li {...props} key={option.id}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar /> 
        <Typography>{`${option.firstname} ${option.lastname}`}</Typography>
      </Stack>
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
    </div>
  );
};

export default SearchComponent;
