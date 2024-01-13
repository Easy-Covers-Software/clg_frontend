// ExtraInfo.js
import React from 'react';
import { Typography, Grid } from '@mui/material';
import { GreenSwitch } from '@/components/Global/components/GreenSwitch';
import styled from '@emotion/styled';
import { SupplementalInfoContainer } from '../SelectionSummary.styles';

const Header = styled(Typography)`
  font-size: 1.3rem !important;
  color: #006d4b;
  letter-spacing: 0.05rem;
  margin-top: 3%;
  white-space: nowrap;
`;

const CandidatesLastUpdated = styled(Typography)`
  font-size: 2.2rem !important;
  color: #006d4b;
`;

const SupplementalInfo = ({ page, summaryDetails, checked, handleChange }) => {
  const getSupplementalInfoHeader = () => {
    switch (page) {
      case 'jobPostings':
        return 'Date Added';
      case 'candidates':
        return 'Last Updated';
      case 'generate':
        return 'Mode';
      case 'calls':
        return 'Mode';
      default:
        return '';
    }
  };

  const formatIsoDateToReadable = (isoDate) => {
    if (!isoDate) return false;
    const date = new Date(isoDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${formattedMonth}/${formattedDay}/${year}`;
  };

  return (
    <SupplementalInfoContainer>
      <Header>{getSupplementalInfoHeader()}</Header>

      {page === 'calls' && (
        <Grid display={'flex'}>
          <Typography mt={'6%'} pl={'1%'}>
            Notes
          </Typography>
          <GreenSwitch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography mt={'6%'} pr={'1%'}>
            Call
          </Typography>
        </Grid>
      )}

      {page === 'jobPostings' && (
        <Typography className="job-summary-match-score">
          {formatIsoDateToReadable(summaryDetails?.supplementaryInfo) || 'N/A'}
        </Typography>
      )}

      {page === 'generate' && (
        <Grid display={'flex'}>
          <Typography variant="body1" mt={'6%'} pl={'1%'}>
            Email
          </Typography>
          <GreenSwitch
            checked={checked === 'email' ? false : true}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant="body1" pr={'1%'}>
            Cover <br /> Letter
          </Typography>
        </Grid>
      )}

      {page === 'candidates' && (
        <CandidatesLastUpdated>
          {formatIsoDateToReadable(summaryDetails.supplementaryInfo) || 'N/A'}
        </CandidatesLastUpdated>
      )}
    </SupplementalInfoContainer>
  );
};

export default SupplementalInfo;
