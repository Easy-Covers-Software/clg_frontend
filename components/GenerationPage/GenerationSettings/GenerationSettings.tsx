// GenerationSettings.tsx
import React, { useState } from 'react';
import { Switch, Typography, Box } from '@mui/material';
import { GreenSwitch } from '@/components/Global/components/GreenSwitch';
import EmailSettings from './components/EmailSettings';
import CoverLetterSettings from './components/CoverLetterSettings';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

const GenerationSettings = ({ mode, toggleMode }) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt={'1%'}>
        <Typography>Email</Typography>
        <GreenSwitch
          checked={typeof mode === 'boolean' ? mode : false}
          onChange={toggleMode}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography>Cover Letter</Typography>
      </Box>

      {mode ? <EmailSettings /> : <CoverLetterSettings />}
    </Box>
  );
};

export default GenerationSettings;
