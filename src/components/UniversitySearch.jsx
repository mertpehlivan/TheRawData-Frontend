import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import SchoolIcon from '@mui/icons-material/School';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../hooks/AuthProvider';
const baseUrl = process.env.REACT_APP_BASE_URL;
const API_URL = `${baseUrl}/api/v1/university/search`;
const filter = createFilterOptions();

const capitalize = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export default function UniversitySearch({ selected, setSelected }) {
  const [value, setValue] = React.useState(selected ? selected : null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {token} = useUserContext()
  React.useEffect(() => {
   if(value){ setSelected(value.name);}
  }, [value, setSelected]);
  useEffect(() => {
    if (selected) {
      console.log("girdi")
      setValue({ name: selected });
    }
  }, []);

  const fetchUniversities = React.useMemo(
    () =>
      debounce(async (input, callback) => {
        try {
          setLoading(true);
          const response = await axios.get(`${API_URL}?name=${input}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const universities = await response.data;
          const type = universities.map((university,index)=>({name:university.name,id:index}))
          setLoading(false);
          callback(type);
        } catch (error) {
          console.error('Error fetching universities:', error);
          callback([]);
        } finally {
          
        }
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchUniversities(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchUniversities]);

  return (
    <Autocomplete
      loading={loading}
      id="university-search-demo"
      size="small"
      sx={{ width: '100%' }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new university
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: capitalize(params.inputValue),
            name: `Add "${capitalize(params.inputValue)}"`,
          });
        }

        return filtered;
      }}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No universities"
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            name: capitalize(newValue),
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: capitalize(newValue.inputValue),
          });
          setOptions((prevOptions) => [
            ...prevOptions,
            { name: capitalize(newValue.inputValue) },
          ]);
        } else {
          setValue(newValue);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(capitalize(newInputValue));
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for a university" fullWidth />
      )}
      renderOption={(props, option) => {
       
        const matches = [];
        const parts = parse(
          option.name,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li  {...props} key={option.id}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <SchoolIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      fontWeight: part.highlight ? 'bold' : 'regular',
                    }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.country || ''}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
