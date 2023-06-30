'use client';

import React from 'react';
import { PrimaryButton, UnSelectedButton } from '@/components/Global';
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';

import { useLoginContext } from '@/context/StateContext';

export interface ISidebarProps {}

const Logo = styled(Box)`
  margin-top: -50%;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px;
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: -25%;
`;

export default function Sidebar(props: ISidebarProps) {
  const { isLoginOpen, toggleLoginIsOpen } = useLoginContext();

  return (
    <>
      <Logo>
        <img
          src="/easy-covers-full.svg"
          alt="Description of Image"
          width={'100%'}
        />
      </Logo>

      <MenuContainer>
        <PrimaryButton>Generate</PrimaryButton>
        <PrimaryButton onClick={() => toggleLoginIsOpen()}>
          Sign In
        </PrimaryButton>
      </MenuContainer>

      <PrimaryButton onClick={() => toggleLoginIsOpen()}>Sign In</PrimaryButton>
    </>
  );
}
