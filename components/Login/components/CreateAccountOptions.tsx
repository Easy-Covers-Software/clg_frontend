import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import { IconButton } from '@mui/material';

const Container = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  padding: 32px 12px;
`;

const IconContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vw;
  height: 3vw;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #006d4b;
`;

export default function AuthProviderButtons() {
  const handleGoogleAuth = () => {
    // Implement Google Authentication here
  };

  const handleAppleAuth = () => {
    // Implement Apple Authentication here
  };

  const handleFacebookAuth = () => {
    // Implement Facebook Authentication here
  };

  return (
    <Container>
      <IconContainer>
        <IconButton onClick={handleGoogleAuth}>
          <img src="/GoogleIcon.svg" alt="google icon" />
        </IconButton>
      </IconContainer>

      <IconContainer>
        <IconButton onClick={handleAppleAuth}>
          <img src="/AppleIcon.svg" alt="google icon" />
        </IconButton>
      </IconContainer>

      <IconContainer>
        <IconButton onClick={handleFacebookAuth}>
          <img src="/FacebookIcon.svg" alt="google icon" />
        </IconButton>
      </IconContainer>
    </Container>
  );
}
