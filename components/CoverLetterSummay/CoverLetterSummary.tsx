import { FC } from 'react';

import { Typography } from '@mui/material';

import { CircularProgress } from '@mui/material';

import { useGenerationContext } from '@/context/GenerationContext';

import {
  Container,
  JobOverview,
  JobMatchScore,
} from './CoverLetterSummary.styles';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { JobDetailsProps } from '@/Types/GenerationContext.types';

interface Props {
  jobDetailsProps: JobDetailsProps;
}

const CoverLetterSummary: FC<Props> = ({ jobDetailsProps }) => {
  return (
    <Container>
      <JobOverview>
        {jobDetailsProps?.loadingSummary ? (
          <Grid m={'auto'}>
            <CircularProgress color='success' />
          </Grid>
        ) : (
          <>
            <Typography className='job-summary-title'>
              {jobDetailsProps?.jobTitle}
            </Typography>
            <Typography className='job-summary-company'>
              {jobDetailsProps?.companyName}
            </Typography>
          </>
        )}
      </JobOverview>

      <JobMatchScore>
        <Typography className='job-summary-match-score-header'>
          Match Score
        </Typography>
        {jobDetailsProps?.loadingSummary ? (
          <Grid>
            <CircularProgress color='success' />
          </Grid>
        ) : (
          <Typography className='job-summary-match-score'>
            {jobDetailsProps?.matchScore}
          </Typography>
        )}
      </JobMatchScore>
    </Container>
  );
};

export default CoverLetterSummary;
