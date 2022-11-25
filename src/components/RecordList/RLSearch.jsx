import { React, useState } from 'react';
import { Box, InputBase, Select, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { default as Bksp } from '@mui/icons-material/Backspace';
import { RECORD_SEARCH_COLUMNS } from '../../database/db_tables';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  height: '40px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '7ch',
      '&:focus': {
        width: '14ch',
      },
    },
  },
}));

export default function RLSearch({onSubmit}) {
  const clean_search = {key: '', val: ''};
  const [search, setSearch] = useState(clean_search);

  const _handleChange = (event) => {
    if (event.key === 'Enter') {
      onSubmit(search);
    } else {
      const {name, value} = event.target;
      setSearch(
        prev => {
          return name === 'search_key' ?
            {...prev, key: value} :
            {...prev, val: value}
        }
      );
    }
  }
  const _handleClear = () => {
    onSubmit(clean_search);
    setSearch(clean_search);
  }

  const _createSelect = () => {
    return (
      <Select
        size='small'
        name='search_key'
        value={search.key}
        onChange={_handleChange}
        sx={{ color: 'black', width: 150, height: 40}}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {[
          <MenuItem key='menu_empty' value=''></MenuItem>,
          ...RECORD_SEARCH_COLUMNS
            .map(item =>  <MenuItem key={item.name} value={item.name}>{item.label}</MenuItem>)
        ]}
      </Select>
    );
  }
  const _createSearch = () => {
    return (
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          size='small'
          name='search_val'
          value={search.val}
          placeholder="Поиск..."
          onChange={_handleChange}
          onKeyDown={_handleChange}
          inputProps={{ 'aria-label': 'search' }} 
        />
        <IconButton sx={{color: 'white'}} onClick={_handleClear}><Bksp/></IconButton>
      </Search>
    );
  }

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-around', color: 'white' }}
    >
      {_createSelect()}
      {_createSearch()}
    </Box>
  );
}