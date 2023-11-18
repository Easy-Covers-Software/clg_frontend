// EmailSettings.tsx
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';

const EmailSettings = () => {
  const [settings, setSettings] = useState({
    introductionStyle: '',
    // followUpInterval: '',
    availability: '',
    referal: '',
    networkingPurpose: '',
    communicationStyle: '',
    // keyAchievements: '',
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      p={'0 1%'}
      m={'auto'}
      width={'96%'}
    >
      <FormControl fullWidth margin='dense'>
        <InputLabel>Introduction Style</InputLabel>
        <Select
          name='introductionStyle'
          value={settings.introductionStyle}
          onChange={handleChange}
          d
        >
          <MenuItem value='formal'>Formal</MenuItem>
          <MenuItem value='casual'>Casual</MenuItem>
          <MenuItem value='enthusiastic'>Enthusiastic</MenuItem>
        </Select>
      </FormControl>

      {/* <TextField
        name='followUpInterval'
        label='Follow-Up Interval (days)'
        value={settings.followUpInterval}
        onChange={handleChange}
        fullWidth
        margin='normal'
      /> */}

      <FormControl fullWidth margin='normal'>
        <InputLabel>Networking Purpose</InputLabel>
        <Select
          name='networkingPurpose'
          value={settings.networkingPurpose}
          onChange={handleChange}
        >
          <MenuItem value='networking'>Networking</MenuItem>
          <MenuItem value='jobInquiry'>Job Inquiry</MenuItem>
          <MenuItem value='followUp'>Follow-Up After Interview</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin='normal'>
        <InputLabel>Communication Style</InputLabel>
        <Select
          name='communicationStyle'
          value={settings.communicationStyle}
          onChange={handleChange}
        >
          <MenuItem value='formal'>Formal</MenuItem>
          <MenuItem value='friendly'>Friendly</MenuItem>
          <MenuItem value='direct'>Direct</MenuItem>
        </Select>
      </FormControl>

      <TextField
        name='availability'
        label='Availability for Interviews'
        value={settings.availability}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />

      <TextField
        name='referal'
        label='Referal'
        value={settings.referal}
        onChange={handleChange}
        fullWidth
        margin='normal'
      />
      {/* <FormGroup margin='normal'>
        <FormControlLabel
          control={
            <Checkbox
              name='referralAcknowledgment'
              checked={settings.referralAcknowledgment}
              onChange={handleChange}
            />
          }
          label='Referral Acknowledgment'
        />
      </FormGroup> */}
      {/* 
      <TextField
        name='keyAchievements'
        label='Key Achievements Focus'
        value={settings.keyAchievements}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin='normal'
      /> */}
    </Box>
  );
};

export default EmailSettings;
