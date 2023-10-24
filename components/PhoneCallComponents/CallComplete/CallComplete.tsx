'use client';

import { FC, useState } from 'react';

import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useAuth } from '@/context/AuthContext';
import { PrimaryButton } from '../../Global/Global';

import { Container, Header, InputField } from '../PhoneCallComponents.styles';

import { TranscriptionMethods } from '@/Utils/utils';
const { initiatePhoneCall } = TranscriptionMethods;

interface Props {}

const CallComplete: FC<Props> = () => {
  const [candidateName, setCandidateName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [location, setLocation] = useState(null);
  const [jobPosting, setJobPosting] = useState(null);

  return (
    <Container>
      <Header>Call Complete</Header>

      <Box component='form' noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputField
                label='Candidate Name'
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputField
                label='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Job Posting</InputLabel>
              <Select
                value={jobPosting}
                onChange={(e) => setJobPosting(e.target.value as string)}
                required
                sx={{
                  backgroundColor: 'white',
                }}
              >
                {/* Replace with your job postings */}
                <MenuItem value='job1'>Job 1</MenuItem>
                <MenuItem value='job2'>Job 2</MenuItem>
                {/* ... */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='LinkedIn'
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Portfolio Site'
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box display='flex' justifyContent='flex-end' mt={2}>
          <PrimaryButton
            type='submit'
            style={{
              marginTop: '16px',
              textAlign: 'end',
              width: '16vw',
            }}
          >
            Start Call
          </PrimaryButton>
        </Box>
      </Box>
    </Container>
  );
};

export default CallComplete;
