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

const CallNoAnswer: FC<Props> = () => {
  const { state } = useAuth();
  return (
    <CallsContainer>
      <FormContainer>
        <Header>No Answer</Header>
      </FormContainer>
    </CallsContainer>
  );
};

export default CallNoAnswer;
