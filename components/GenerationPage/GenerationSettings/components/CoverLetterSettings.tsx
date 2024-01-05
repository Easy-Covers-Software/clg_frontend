// CoverLetterSettings.tsx
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

const CoverLetterSettings = () => {
  const [settings, setSettings] = useState({
    toneAndStyle: '',
    experienceLevel: '',
    achievementEmphasis: '',
    // projectContribution: '',
    teamCollaborationStyle: '',
  });

  const handleChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box component='form' noValidate autoComplete='off'>
      <FormControl fullWidth margin='normal'>
        <InputLabel>Tone and Style</InputLabel>
        <Select
          name='toneAndStyle'
          value={settings.toneAndStyle}
          onChange={handleChange}
        >
          <MenuItem value='formal'>Formal</MenuItem>
          <MenuItem value='friendly'>Friendly</MenuItem>
          <MenuItem value='professional'>Professional</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel>Experience Level</InputLabel>
        <Select
          name='experienceLevel'
          value={settings.experienceLevel}
          onChange={handleChange}
        >
          <MenuItem value='entryLevel'>Entry-Level</MenuItem>
          <MenuItem value='midCareer'>Mid-Career</MenuItem>
          <MenuItem value='seniorLevel'>Senior-Level</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel>Achievement Emphasis</InputLabel>
        <Select
          name='achievementEmphasis'
          value={settings.achievementEmphasis}
          onChange={handleChange}
        >
          <MenuItem value='leadership'>Leadership</MenuItem>
          <MenuItem value='innovation'>Innovation</MenuItem>
          <MenuItem value='teamwork'>Teamwork</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel>Team Collaboration Style</InputLabel>
        <Select
          name='teamCollaborationStyle'
          value={settings.teamCollaborationStyle}
          onChange={handleChange}
        >
          <MenuItem value='independent'>Independent</MenuItem>
          <MenuItem value='teamPlayer'>Team Player</MenuItem>
          <MenuItem value='leader'>Leader</MenuItem>
        </Select>
      </FormControl>

      {/* <TextField
        name='projectContribution'
        label='Project Contribution'
        value={settings.projectContribution}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin='normal'
      /> */}
    </Box>
  );
};

export default CoverLetterSettings;
