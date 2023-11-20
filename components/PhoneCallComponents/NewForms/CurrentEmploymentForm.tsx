// CurrentEmploymentForm.js
import React from 'react';
import { TextField, Grid } from '@mui/material';
import styled from '@emotion/styled';

const StyledTextField = styled(TextField)`
  background-color: white;
`;

const CurrentEmploymentForm = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Grid container spacing={3} overflow={'scroll'} mb={'3%'}>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Current Title'
          name='current_title'
          value={formData.current_title}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Current Employer'
          name='current_employer'
          value={formData.current_employer}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Education Level'
          name='education_level'
          value={formData.education_level}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Education Field'
          name='education_field'
          value={formData.education_field}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Education Institution'
          name='education_institution'
          value={formData.education_institution}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Employment Field'
          name='employment_field'
          value={formData.employment_field}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Skills'
          name='skills'
          // multiline
          // rows={4}
          value={formData.skills}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StyledTextField
          fullWidth
          label='Years of Experience'
          name='years_of_experience'
          type='number'
          value={formData.years_of_experience}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default CurrentEmploymentForm;
