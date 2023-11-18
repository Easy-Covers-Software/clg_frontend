'use client';

import { FC, useState } from 'react';

import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';
import { PrimaryButton, UnSelectedButton } from '../../Global/Global';

import {
  FormContainer,
  Header,
  InputField,
} from '../PhoneCallComponents.styles';

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
  const [feedback, setFeedback] = useState(null);
  const [resume, setResume] = useState(null);

  const { state, dispatch } = useTranscriptionContext();
  const { callModeState } = state;
  const { callCompleteForm } = callModeState;

  return (
    <FormContainer>
      {/* <Header>Call Complete</Header> */}

      <Box component='form' noValidate autoComplete='off'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Candidate Name'
                value={callCompleteForm.candidateName}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_CANDIDATE_NAME',
                    payload: e.target.value,
                  })
                }
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Phone Number'
                value={callCompleteForm.phone}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_PHONE',
                    payload: e.target.value,
                  })
                }
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Job Posting</InputLabel>
              <Select
                value={callCompleteForm.jobPosting}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_JOB_POSTING',
                    payload: e.target.value,
                  })
                }
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
                value={callCompleteForm.email}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_EMAIL',
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='LinkedIn'
                value={callCompleteForm.linkedin}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_LINKEDIN',
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Portfolio Site'
                value={callCompleteForm.portfolio}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_PORTFOLIO',
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Location'
                value={callCompleteForm.location}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_LOCATION',
                    payload: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              {/* <InputLabel htmlFor='resume-upload'>Upload Resume</InputLabel> */}
              <InputField
                type='file'
                id='resume-upload'
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_RESUME',
                    payload: e.target.files[0],
                  })
                }
                style={{
                  minHeight: '16px',
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputField
                label='Feedback'
                value={feedback}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CALL_COMPLETE_FORM_FEEDBACK',
                    payload: e.target.value,
                  })
                }
                multiline
                rows={4}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box display='flex' justifyContent='flex-end' mt={2}>
          <UnSelectedButton
            variant='outlined'
            style={{
              marginTop: '16px',
              marginRight: '16px',
              width: '16vw',
            }}
            onClick={() => {
              // Handle logic for not saving the candidate here
            }}
          >
            Don't Save
          </UnSelectedButton>
          <PrimaryButton
            type='submit'
            style={{
              marginTop: '16px',
              textAlign: 'end',
              width: '16vw',
            }}
          >
            Save Candidate
          </PrimaryButton>
        </Box>
      </Box>
    </FormContainer>
  );
};

export default CallComplete;
