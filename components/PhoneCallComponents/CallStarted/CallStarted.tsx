'use client';

import { FC, useState } from 'react';

import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useAuth } from '@/context/AuthContext';
import { PrimaryButton } from '../../Global/Global';

import { Container, Header, InputField } from '../PhoneCallComponents.styles';

import { TranscriptionMethods } from '@/Utils/utils';
const { initiatePhoneCall } = TranscriptionMethods;

interface Props {}

const CallStarted: FC<Props> = () => {
  const { state } = useAuth();
  return (
    <Container>
      <Header>Call Initiated...</Header>
    </Container>
  );
};

export default CallStarted;
