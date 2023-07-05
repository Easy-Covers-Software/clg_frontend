'use client';

import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import { IconButton } from '@mui/material';

import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

const Container = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  padding: 32px 12px;
`;

const IconContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 4vw;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #006d4b;
  cursor: pointer;
`;

export default function AuthProviderButtons() {
  const { data: session, status } = useSession();

  const createAccount = () => {
    // need to create an endpoint in the backend to create a user
  };

  return (
    <Container>
      <IconContainer onClick={() => signIn()}>
        <IconButton disableFocusRipple disableRipple>
          <img src="/GoogleIcon.svg" alt="google icon" width={40} height={40} />
        </IconButton>
      </IconContainer>

      <IconContainer>
        <IconButton onClick={createAccount} disableRipple disableFocusRipple>
          <img
            src="/easy-covers-full.svg"
            alt="google icon"
            width={130}
            height={130}
          />
        </IconButton>
      </IconContainer>
    </Container>
  );
}
