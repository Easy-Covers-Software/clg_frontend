// MainContent.js
import React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { MainContentContainer } from '../SelectionSummary.styles';
import styled from '@emotion/styled';

import PersonalDetailsDialog from '@/components/CandidatesPage/FullCandidateProfileOverview/components/PersonalDetailsDialog/PersonalDetailsDialog';

const PrimaryInfo = styled(Typography)`
  font-size: 1.9rem !important;
  color: #006d4b;
  letter-spacing: 0.32rem;
  white-space: nowrap !important;
`;

const SecondaryInfo = styled(Typography)`
  font-size: 1.25rem !important;
  color: #006d4b;
  letter-spacing: 0.2rem;
  white-space: nowrap;
`;

const MainContent = ({ summaryDetails }) => {
  return (
    <MainContentContainer>
      <PrimaryInfo>{summaryDetails?.mainTitle}</PrimaryInfo>
      <SecondaryInfo>{summaryDetails?.secondaryTitle}</SecondaryInfo>
    </MainContentContainer>
  );
};

export default MainContent;
