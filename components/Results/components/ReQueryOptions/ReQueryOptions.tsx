'use client';

import React, { useContext } from 'react';

import { Grid } from '@mui/material';
import styled from '@emotion/styled';

import SimpleReQueryButton from './components/SimpleReQueryButton';
import { PrimaryButton, UnSelectedButton } from '@/components/Global';

import { ReQueryContext } from '../../Results';

const Container = styled(Grid)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 99%;
  height: 10%;
  background-color: #f8f8ff;
  padding: 0.5%;
`;

const MoreOptions = styled(UnSelectedButton)`
  width: 25%;
  height: 72%;
  font-size: 0.75rem;
  background-color: #fff;
  padding: 0;
  margin: auto;
`;

export default function ReQueryOptions() {
  const { toggleIsReQuerySectionExpanded } = useContext<any>(ReQueryContext);

  return (
    <Container>
      <SimpleReQueryButton buttonLabel="Length" />
      <SimpleReQueryButton buttonLabel="Formality" />
      <SimpleReQueryButton buttonLabel="Personability" />

      <MoreOptions onClick={toggleIsReQuerySectionExpanded}>
        More Options
      </MoreOptions>
    </Container>
  );
}
