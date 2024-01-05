import * as React from 'react';
import { styled as muiStyled, alpha } from '@mui/material/styles';
import styled from '@emotion/styled';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import FilterDropdown from './FilterDropdown';

const Search = muiStyled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  color: '#006D4B',
  border: '1px solid #006D4B',
  '&:hover': {
    // backgroundColor: alpha(theme.palette.grey[00], 0.18),
  },
  width: '100%',
  height: '6vh',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#006D4B',
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: '#006D4B',
  '& .MuiInputBase-input': {
    paddingLeft: '25%',
    paddingTop: '6%',
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#006D4B',
  },
}));

interface Props {
  type: string;
  search: string;
  handleSearchChange: (searchValue: string) => void;
}

const SearchAndFilter: React.FC<Props> = ({
  type,
  search,
  handleSearchChange,
}) => {
  return (
    <Search
      style={{
        width: '97.5%',
        marginBottom: type === 'full' ? '0' : '1%',
      }}
    >
      <SearchIconWrapper>
        {' '}
        <SearchIcon />{' '}
      </SearchIconWrapper>
      <StyledInputBase
        sx={{ color: 'white' }}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </Search>
  );
};

export default SearchAndFilter;
