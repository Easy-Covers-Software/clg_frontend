import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Container = styled(Grid)`
  display: flex;
  width: 99%;
  height: 100px;
  background-color: #f5f5f5;
  border: 1px solid #006d4b;
  border-radius: 8px 8px 0 0;
`;

const JobOverviewContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-left: 0.8%;
`;

const JobMatchScoreContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: fits-content;
  margin-right: 6%;
`;

const JobOverview = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 99%;
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
  background-color: #f8f8ff;
  padding: 16% 19%;
`;

export default function ResultsSummary() {
  return (
    <Container>
      <JobOverviewContainer>
        <JobOverview>
          <Typography pl={2} pt={2} fontSize={'1.3rem'}>
            Full Stack Software Engineer
          </Typography>
          <Typography pl={2} pb={2} fontSize={'1rem'}>
            CompanyXYZ Inc.
          </Typography>
        </JobOverview>
      </JobOverviewContainer>

      <JobMatchScoreContainer>
        <JobMatchScore>
          <Typography whiteSpace={'nowrap'} fontSize={'0.9rem'}>
            Match Score
          </Typography>
          <Typography fontSize={'1.8rem'}>8.3</Typography>
        </JobMatchScore>
      </JobMatchScoreContainer>
    </Container>
  );
}
