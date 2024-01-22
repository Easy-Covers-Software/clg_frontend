import * as React from 'react';
import { styled as muiStyled, alpha } from '@mui/material/styles';
import styled from '@emotion/styled';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import FilterDropdown from './FilterDropdown';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const Search = muiStyled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  color: '#006D4B',
  border: '1px solid #006D4B',
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
  width: '100%',
  height: '5.5vh',
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
  top: '15%',
  left: '15%',
  fontSize: '1.2rem',
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
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
    <Grid
      width={'99%'}
      container
      justifyContent={'space-evenly'}
      flexWrap={'nowrap'}
      p={0}
      m={0}
    >
      {/* Search Bar */}
      <Search
        style={{
          width: '100%',
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

        {/* Filter Dropdown */}
      </Search>

      <FilterDropdown />
    </Grid>
  );
};

export default SearchAndFilter;
