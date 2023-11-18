// BasicInfoForm.js
import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const StyledTextField = styled(TextField)`
  background-color: white;
`;

const BasicInfoForm = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    // // <Grid2 container direction={'column'} height={'88%'} overflow={'scroll'}>
    // // <Grid2 container direction={'column'} overflow={'scroll'}>
    // {/* <Typography variant='h4' mb={'3%'} textAlign={'center'}>
    //   Basic Candidate Info
    // </Typography> */}
    <Grid container spacing={3} overflow={'scroll'} mb={'3%'}>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='Phone Number'
          name='phone_number'
          value={formData.phone_number}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='City'
          name='city'
          value={formData.city}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='State'
          name='state'
          value={formData.state}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='Country'
          name='country'
          value={formData.country}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='Zip Code'
          name='zip_code'
          value={formData.zip_code}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          label='Age'
          name='age'
          type='number'
          value={formData.age}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default BasicInfoForm;
