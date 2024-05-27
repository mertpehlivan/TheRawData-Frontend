import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';

const UniversitySearch = ({ setSelected,selected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setSelectedUniversity(selected)
    }
    
  }, []);
  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      setLoading(true);
      try {
        const response = await axios.get(`http://universities.hipolabs.com/search?name=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching universities:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleUniversitySelect = (event, value) => {
    setSelectedUniversity(value);
    setSelected(value);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        size='small'
        id="university-search"
        options={searchResults.map((option) => option.name)}
        value={selectedUniversity}
        onChange={handleUniversitySelect}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            label="Choose Your University"
            onChange={handleSearchInputChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
};

export default UniversitySearch;