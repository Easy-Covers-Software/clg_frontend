import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// import { CandidateListItem } from '@/Types/CandidatesSection.types';

interface Props {
  // selectedCandidate: CandidateListItem;
  selectedCandidate: any;
}

const CandidatePersonalDetails: React.FC<Props> = ({ selectedCandidate }) => {
  return (
    <Box p={2}>
      <Typography fontSize={'1.7rem'} gutterBottom>
        Personal Details
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
            Zip Code: {selectedCandidate.zipCode || 'N/A'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidatePersonalDetails;
