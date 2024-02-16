import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Paper, Typography, IconButton } from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const Container = styled(Grid2)`
  width: 100%;
  // text-overflow: ellipsis;

  // on hover make the cursor a pointer
`;

const Tab = styled(Paper)`
  height: 6vh;
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  background-color: ${({ isSelected }) => (isSelected ? '#f5f5f5' : 'white')};
  opacity: ${({ otherSelected }) => (otherSelected ? '0.5' : '1')};

  border: 1px solid #13d0b7;
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const SectionHeader = styled(Typography)``;

const DropdownPreference = ({ type, details, selected }) => {
  return (
    <Container>
      <Tab
        isSelected={selected === type}
        otherSelected={selected !== '' && selected !== type}
      >
        <SectionHeader>{type}</SectionHeader>

        {selected === '' ? (
          <ExpandCircleDownIcon />
        ) : (
          selected === type && <HighlightOffIcon />
        )}
      </Tab>
    </Container>
  );
};

export default DropdownPreference;
