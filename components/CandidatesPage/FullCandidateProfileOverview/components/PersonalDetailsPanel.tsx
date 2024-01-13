import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { CandidateListItem } from '@/Types/CandidatesSection.types';

import { PersonalDetailsGrid } from '../FullCandidateProfileOverview.styles';
// import { StyledPaper } from '../FullCandidateProfileOverview.styles';
import { StyledPaper } from '@/components/JobPostingsPage/FullCandidateJobProfile/FullCandidateJobProfile.styles';

interface Props {
  selectedCandidate: CandidateListItem;
}

const PersonalDetailsPanel: React.FC<Props> = ({ selectedCandidate }) => {
  return (
    <PersonalDetailsGrid xs={12} p={0}>
      <StyledPaper
        elevation={3}
        style={{
          overflow: 'hidden',
          margin: 'auto',
          width: 'auto',
        }}
      >
        <Box p={2} width={'100%'}>
          <Typography fontSize={'1.7rem'} gutterBottom>
            Personal Info
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                Name: {selectedCandidate.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                Age: {selectedCandidate.age}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                Phone: {selectedCandidate.phone_number || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                Email: {selectedCandidate.email || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                City: {selectedCandidate.city || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                State: {selectedCandidate.state || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                Country: {selectedCandidate.country || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={'1.3rem'}>
                Zip Code: {selectedCandidate.zip_code || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </PersonalDetailsGrid>
  );
};

export default PersonalDetailsPanel;
