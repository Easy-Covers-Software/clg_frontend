import { FC } from 'react';

import { Typography } from '@mui/material';

import { CircularProgress } from '@mui/material';
import Switch from '@mui/material/Switch';

import { useAuth } from '@/context/AuthContext';

import {
  Container,
  JobOverview,
  JobMatchScore,
} from './CoverLetterSummary.styles';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { SummaryHeaderProps } from '@/Types/Common.types';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

interface Props {
  summaryDetails: SummaryHeaderProps;
  checked: boolean | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
}

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: `${green[600]} !important`,
    '&:hover': {
      backgroundColor: `${alpha(
        green[600],
        theme.palette.action.hoverOpacity
      )} !important`,
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: `${green[600]} !important`,
  },
}));

const CoverLetterSummary: FC<Props> = ({
  summaryDetails,
  checked,
  handleChange,
}) => {
  const { state } = useAuth();
  const { trackers } = state;

  return (
    <Container>
      <JobOverview>
        {summaryDetails?.loading ? (
          <Grid m={'auto'}>
            <CircularProgress color='success' />
          </Grid>
        ) : (
          <>
            <Typography className='job-summary-title'>
              {summaryDetails?.mainTitle}
            </Typography>
            <Typography className='job-summary-company'>
              {summaryDetails?.secondaryTitle}
            </Typography>
          </>
        )}
      </JobOverview>

      <JobMatchScore>
        <Typography className='job-summary-match-score-header'>
          {trackers?.page === 'transcription' ? 'Mode' : 'Match Score'}
        </Typography>

        {summaryDetails?.loading ? (
          <Grid>
            <CircularProgress color='success' />
          </Grid>
        ) : (
          <>
            {trackers?.page === 'transcription' ? (
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
            ) : (
              <Typography className='job-summary-match-score'>
                {summaryDetails?.supplementalInfo}
              </Typography>
            )}
            {/* <Typography className='job-summary-match-score'>
              {summaryDetails?.supplementalInfo}
            </Typography> */}
          </>
        )}
      </JobMatchScore>
    </Container>
  );
};

export default CoverLetterSummary;
