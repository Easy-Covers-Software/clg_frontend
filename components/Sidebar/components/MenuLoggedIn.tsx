import React from 'react';
import { PrimaryButton, UnSelectedButton } from '@/components/Global';
import { useLoginContext } from '@/context/StateContext';
import { Grid } from '@mui/material';

import Divider from '@mui/material/Divider';

import styled from '@emotion/styled';

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: -24%;
`;

const HorizontalDivider = styled(Divider)`
  margin: 5%;
`;

export default function MenuLoggedIn() {
  return (
    <Container>
      <PrimaryButton>Generate</PrimaryButton>

      <Grid>
        <HorizontalDivider />

        <UnSelectedButton>Sign In</UnSelectedButton>
      </Grid>
    </Container>
  );
}
