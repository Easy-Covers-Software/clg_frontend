'use client';

import React from 'react';
import { PrimaryButton, UnSelectedButton } from '@/components/Global';
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useLoginContext } from '@/context/StateContext';

export interface ISidebarProps {}

const Logo = styled(Grid)`
  display: flex;
  margin-top: -35%;
  white-space: nowrap;
  padding: 0;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px;
  width: 100%;
  height: 100%;
  gap: 24px;
`;

export default function Sidebar(props: ISidebarProps) {
  const { isLoginOpen, toggleLoginIsOpen } = useLoginContext();

  return (
    <>
      <Logo>
        <img
          src="/easy-covers-full.png"
          alt="Description of Image"
          height={120}
          width={220}
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
