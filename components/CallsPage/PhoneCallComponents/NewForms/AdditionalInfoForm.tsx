// AdditionalInfoForm.js
import React from 'react';
import { TextField, Grid } from '@mui/material';
import styled from '@emotion/styled';

const StyledTextField = styled(TextField)`
  background-color: white;
`;

const AdditionalInfoForm = ({ formData, setFormData }) => {
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Grid container spacing={3} overflow={'scroll'} mb={'3%'}>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          label='Portfolio Website'
          name='portfolio_website'
          value={formData.portfolio_website}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          label='LinkedIn Profile'
          name='linkedin_profile'
          value={formData.linkedin_profile}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          label='Feedback'
          name='feedback'
          multiline
          rows={5}
          value={formData.feedback}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default AdditionalInfoForm;
