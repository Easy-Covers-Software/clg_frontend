import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import MediumReQueryInput from './MediumReQueryInput';
import CustomReQuery from './CustomReQuery';

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 1%;
  width: 50%;
`;

const MediumOptionsContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function MoreOptionsReQueries() {
  return (
    <Container>
      <MediumOptionsContainer>
        <MediumReQueryInput label={'Add Skill'} />
        <MediumReQueryInput label={'Insert Keyword'} />
        <MediumReQueryInput label={'Elaborate Resume Item'} />
        <MediumReQueryInput label={'Remove Redundancy'} />
      </MediumOptionsContainer>

      <CustomReQuery />
    </Container>
  );
}
