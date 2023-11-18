import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CandidatePersonalDetails = ({
  name,
  phoneNumber,
  email,
  city,
  state,
  country,
  zipCode,
  age,
}) => {
  return (
    <Box p={2}>
      <Typography fontSize={'1.7rem'} gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>Name: {name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>Age: {age}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>
            Phone: {phoneNumber || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>Email: {email || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>City: {city || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>State: {state || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>
            Country: {country || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'1.3rem'}>
            Zip Code: {zipCode || 'N/A'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidatePersonalDetails;
