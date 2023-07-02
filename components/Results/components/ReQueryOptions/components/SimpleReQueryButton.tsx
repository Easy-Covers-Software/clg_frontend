import React from 'react';

import { PrimaryButton, UnSelectedButton } from '@/components/Global';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';

const Container = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 25%;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f5f5f5;
  height: 88%;
  margin: auto;
`;

const SimpleReQueryBtn = styled(UnSelectedButton)`
  width: 45%;
  height: 76%;
  font-size: 0.5rem;
  background-color: #fff;
  padding: 0;
`;

export default function SimpleReQueryButton({ btn1, btn2 }) {
  return (
    <Container>
      <SimpleReQueryBtn>{btn1}</SimpleReQueryBtn>

      <Divider orientation="vertical" />

      <SimpleReQueryBtn>{btn2}</SimpleReQueryBtn>
    </Container>
  );
}
