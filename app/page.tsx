'use client';

import * as React from 'react';

export interface IHomeProps {}

import { useLoginContext } from '@/context/StateContext';

import LoginDialog from '@/components/Login/LoginDialog';

export default function Home(props: IHomeProps) {
  const { isLoginOpen, toggleLoginIsOpen } = useLoginContext();

  if (isLoginOpen) {
    return <LoginDialog />;
  }

  return <></>;
}
