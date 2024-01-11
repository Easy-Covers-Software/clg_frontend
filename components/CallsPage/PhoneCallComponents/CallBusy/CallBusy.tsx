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

import { CallsContainer } from '@/sections/TranscriptionSection/TranscriptionSection.styles';

import {
  FormContainer,
  Header,
  InputField,
} from '../PhoneCallComponents.styles';

interface Props {}

const CallBusy: FC<Props> = () => {
  const { state } = useAuth();
  return (
    <CallsContainer>
      <FormContainer>
        <Header>Call Busy</Header>
      </FormContainer>
    </CallsContainer>
  );
};

export default CallBusy;
