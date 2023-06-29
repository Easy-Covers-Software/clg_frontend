'use client';

import * as React from 'react';
import { PrimaryButton, UnSelectedButton } from '@/components/Global';
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Divider } from '@mui/material';

export interface ISidebarProps {}

const Logo = styled(Grid)`
  display: flex;
  margin-top: -38%;
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
  return (
    <>
      {/* <Logo>
        <img
          src="/EasyCovers.png"
          alt="Description of Image"
          height={100}
          width={250}
        />
      </Logo> */}

      <Logo>
        <h1 style={{ fontSize: '2.4rem' }}>Easy Covers</h1>
      </Logo>

      <MenuContainer>
        <PrimaryButton>Generate</PrimaryButton>
        <PrimaryButton>Sign In</PrimaryButton>
      </MenuContainer>

      <PrimaryButton>Sign In</PrimaryButton>
    </>
  );
}
