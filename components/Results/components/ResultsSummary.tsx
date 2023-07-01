import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Container = styled(Grid)`
  display: flex;
  width: 100%;
  height: 12vh;
  background-color: #f5f5f5;
  border: 1px solid #006d4b;
  border-radius: 8px 8px 0 0;
`;

const JobOverviewContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const JobMatchScoreContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  // border-left: 1px solid #006d4b;
  padding: 1% 4% 1% 3%;
  height: 100%;
`;

const JobOverview = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 98%;
  height: 84.8%;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
`;

const JobMatchScore = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #006d4b;
  border-radius: 4px;
  padding: 5% 20% 25% 20%;
  height: 100%;
  background-color: #f8f8ff;
`;

export default function ResultsSummary() {
  return (
    <Container>
      <JobOverviewContainer>
        <JobOverview>
          <Typography pl={2} pt={1.5} fontSize={'1.2rem'}>
            Full Stack Software Engineer
          </Typography>
          <Typography pl={2} pb={2} fontSize={'1.1rem'}>
            CompanyXYZ Inc.
          </Typography>
        </JobOverview>
      </JobOverviewContainer>

      <JobMatchScoreContainer>
        <JobMatchScore>
          <Typography whiteSpace={'nowrap'} fontSize={'0.9rem'}>
            Match Score
          </Typography>
          <Typography fontSize={'1.4rem'}>8.3</Typography>
        </JobMatchScore>
      </JobMatchScoreContainer>
    </Container>
  );
}
