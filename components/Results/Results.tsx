import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 56%;
  padding: 1%;
  background-color: #f8f8ff;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default function Results() {
  return <Container></Container>;
}
