'use client';

import { FC, useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';
import { PrimaryButton } from '../../../Global/Global';

import { CallsContainer } from '@/sections/TranscriptionSection/TranscriptionSection.styles';

import {
  FormContainer,
  StatusContainer,
  Header,
  InputField,
} from '../PhoneCallComponents.styles';

interface Props {
  handleInitiatePhoneCall: any;
  updateNewCallForm: any;
  jobPostings: any;
}

const initialFormData = {
  candidate_name: '',
  candidate_number: '',
  job_posting: '',
};

const NewCall: FC<Props> = ({
  handleInitiatePhoneCall,
  updateNewCallForm,
  jobPostings,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  // console.log('formData', formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [candidateName, setCandidateName] = useState('');
  const [phone, setPhone] = useState('+15555555555');
  const [jobPosting, setJobPosting] = useState('');

  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useTranscriptionContext();
  const { callModeState, bodyState } = state;
  const { newCallForm } = bodyState.callModeState;

  useEffect(() => {
    updateNewCallForm(formData);
  }, [formData]);

  return (
    <CallsContainer>
      <StatusContainer
        style={{
          width: '60%',
          height: '72%',
          marginBottom: '10%',
          marginTop: '6%',
          padding: '0 3%',
          backgroundColor: 'white',
        }}
      >
        <Header>New Call</Header>

        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputField
                  name="candidate_name"
                  label="Candidate Name"
                  value={formData.candidate_name}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputField
                  name="candidate_number"
                  label="Phone Number"
                  value={formData.candidate_number}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Job Posting</InputLabel>
                <Select
                  name="job_posting"
                  value={formData.job_posting}
                  onChange={handleChange}
                  required
                >
                  {/* map job postings into menu items */}
                  {jobPostings?.map((jobPosting) => (
                    <MenuItem value={jobPosting.id} key={jobPosting.id}>
                      {jobPosting.position_title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <PrimaryButton
              type="submit"
              style={{
                marginTop: '16px',
                textAlign: 'end',
                width: '16vw',
              }}
              onClick={(e) =>
                handleInitiatePhoneCall(
                  e,
                  formData.candidate_name,
                  formData.candidate_number,
                  formData.job_posting
                )
              }
            >
              Start Call
            </PrimaryButton>
          </Box>
        </Box>
      </StatusContainer>
    </CallsContainer>
  );
};

export default NewCall;
