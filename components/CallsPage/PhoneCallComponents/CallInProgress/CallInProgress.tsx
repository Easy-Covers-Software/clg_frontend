'use client';

import { FC, useState } from 'react';

import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useAuth } from '@/context/AuthContext';
import { PrimaryButton } from '../../../Global/Global';
import Timer from '@/components/Global/components/Timer';

import {
  StatusContainer,
  Header,
  InputField,
} from '../PhoneCallComponents.styles';

interface Props {}

const CallInProgress: FC<Props> = () => {
  const { state } = useAuth();
  return (
    <StatusContainer>
      <Header>Call In Progress...</Header>
      <Timer />
    </StatusContainer>
  );
};

export default CallInProgress;
