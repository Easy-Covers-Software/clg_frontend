import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

import JobInformationAccordion from './components/JobInformationAccordion';
import CandidateRankings from './components/CandidateRankings';

const Container = styled(Grid)`
  height: 100%;
  padding: 1%;
  padding-top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: auto;
`;

const StyledPaper = styled(Paper)`
  height: 100%;
  width: 100%;
  border: 3px solid #13d0b7;
  overflow: scroll;
`;

const FullJobPostingsOverview = ({
  selectedJobPosting,
  candidatesList,
  loadingId,
  updateSelectedCandidate,
  handleCalculate,
  handleListFilterChange,
  handleScoreFilterChange,
}) => {
  return (
    <Container container spacing={2}>
      {/* Job Postings List - Left Column */}
      <Grid
        xs={12}
        md={7}
        container
        direction="column"
        spacing={2}
        height={'100%'}
        flexWrap={'nowrap'}
      >
        <Grid xs={12} height={'94%'} minHeight={'400px'}>
          <Box sx={{ position: 'relative', top: 0, left: 2 }}>
            <Typography variant="h6">Job Posting Details</Typography>
          </Box>
          <StyledPaper elevation={3}>
            <JobInformationAccordion jobPosting={selectedJobPosting} />
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Job Posting Details - Right Column */}
      <Grid
        xs={12}
        md={5}
        container
        direction="column"
        spacing={2}
        height={'100%'}
        mr={'0.1%'}
        flexWrap={'nowrap'}
      >
        <Grid xs={12} height={'94%'}>
          <Box sx={{ position: 'relative', top: 0, left: 2 }}>
            <Typography variant="h6">Candidate Rankings</Typography>
          </Box>
          <StyledPaper elevation={3}>
            <CandidateRankings
              candidateProfiles={candidatesList}
              jobPostingId={selectedJobPosting?.id}
              loadingId={loadingId}
              updateSelectedCandidate={updateSelectedCandidate}
              handleCalculate={handleCalculate}
              handleListFilterChange={handleListFilterChange}
              handleScoreFilterChange={handleScoreFilterChange}
            />
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FullJobPostingsOverview;
