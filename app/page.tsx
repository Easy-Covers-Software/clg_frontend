'use client';

import * as React from 'react';

export interface IHomeProps {}

import { useLoginContext } from '@/context/StateContext';

import { useSession } from 'next-auth/react';

import LoginDialog from '@/components/Login/LoginDialog';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import GenerationSetup from '@/components/GenerationSetup/GenerationSetup';
import Results from '@/components/Results/Results';

export default function Home(props: IHomeProps) {
  const { isLoginOpen, toggleLoginIsOpen } = useLoginContext();
  const { data: session }: any = useSession();

  return (
    <Grid display={'flex'} justifyContent={'space-between'} width={'100%'}>
      {isLoginOpen ? <LoginDialog /> : null}
      <GenerationSetup />
      <Results />
    </Grid>
  );
}
