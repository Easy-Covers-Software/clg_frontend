'use client';

import * as React from 'react';

export interface IHomeProps {}

import { useLoginContext } from '@/context/StateContext';

import LoginDialog from '@/components/Login/LoginDialog';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import GenerationSetup from '@/components/GenerationSetup/GenerationSetup';

export default function Home(props: IHomeProps) {
  const { isLoginOpen, toggleLoginIsOpen } = useLoginContext();

  return (
    <Grid>
      {isLoginOpen ? <LoginDialog /> : null}
      <GenerationSetup />
    </Grid>
  );
}
