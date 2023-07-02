import React, { useContext } from 'react';

import { Grid } from '@mui/material';
import styled from '@emotion/styled';

import SimpleReQueryButton from './components/SimpleReQueryButton';
import { PrimaryButton, UnSelectedButton } from '@/components/Global';

import { ReQueryContext } from '../../Results';

const Container = styled(Grid)`
  display: flex;
  align-items: flex-end;
  gap: 1%;

  width: 100%;

  height: 10%;

  // border: 1px solid #006d4b;
  // border-top: none;
  // background-color: #f5f5f5;
  background-color: #f8f8ff;
  padding: 0.5%;
  // margin: auto;
`;

const MoreOptions = styled(UnSelectedButton)`
  width: 25%;
  height: 68%;
  font-size: 0.75rem;
  background-color: #fff;
  padding: 0;
  margin: auto;
`;

export default function ReQueryOptions() {
  const { toggleIsReQuerySectionExpanded } = useContext(ReQueryContext);

  return (
    <Container>
      <SimpleReQueryButton btn1="Shorten" btn2="Lengthen" />
      <SimpleReQueryButton btn1="Less Personal" btn2="More Personal" />
      <SimpleReQueryButton btn1="Less Formal" btn2="More Formal" />

      <MoreOptions onClick={toggleIsReQuerySectionExpanded}>
        More Options
      </MoreOptions>
    </Container>
  );
}
