import { FC } from 'react';

import { Typography } from '@mui/material';

import { CircularProgress } from '@mui/material';
import Switch from '@mui/material/Switch';

import { useAuth } from '@/context/AuthContext';

import { Container, MainContent, ExtraInfo } from './SelectionSummary.styles';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { SummaryHeaderProps } from '@/Types/Common.types';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import { GreenSwitch } from '../Global/components/GreenSwitch';

interface Props {
  summaryDetails: SummaryHeaderProps;
  checked: boolean | null;
  handleChange: null | ((event: React.ChangeEvent<HTMLInputElement>) => void);
}

// const GreenSwitch = styled(Switch)(({ theme }) => ({
//   '& .MuiSwitch-switchBase': {
//     color: `${green[600]} !important`,
//     '&:hover': {
//       backgroundColor: `${alpha(
//         green[600],
//         theme.palette.action.hoverOpacity
//       )} !important`,
//     },
//   },
//   '& .MuiSwitch-track': {
//     backgroundColor: `${green[600]} !important`,
//   },
// }));

const SelectionSummary: FC<Props> = ({
  summaryDetails,
  checked,
  handleChange,
}) => {
  const { state } = useAuth();
  const { trackers } = state;

  const getSupplementalInfoHeader = (): string => {
    switch (trackers?.page) {
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
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    const year = date.getFullYear();

    // Pad single digits with leading zero
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedMonth}/${formattedDay}/${year}`;
  };

  return (
    <Container>
      <MainContent>
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
      </MainContent>

      {/* {extraInfo && ( */}
      <ExtraInfo>
        <Typography className='job-summary-match-score-header'>
          {getSupplementalInfoHeader()}
        </Typography>

        {/* <Grid>
          <CircularProgress color='success' />
        </Grid> */}

        {trackers?.page === 'calls' ? (
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
        ) : trackers?.page === 'jobPostings' ? (
          <Typography className='job-summary-match-score'>
            {formatIsoDateToReadable(summaryDetails.supplementaryInfo) || 'N/A'}
          </Typography>
        ) : trackers?.page === 'generate' ? (
          <Grid display={'flex'}>
            <Typography variant='body1' mt={'6%'} pl={'1%'}>
              Email
            </Typography>
            <GreenSwitch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography
              variant='body1'
              // mt={'6%'}
              pr={'1%'}
              // whiteSpace={'nowrap'}
            >
              Cover <br /> Letter
            </Typography>
          </Grid>
        ) : (
          <Typography className='candidate-date-updated'>
            {formatIsoDateToReadable(summaryDetails.supplementaryInfo) || 'N/A'}
          </Typography>
        )}
        {/* <Typography className='job-summary-match-score'>
              {summaryDetails?.supplementalInfo}
            </Typography> */}
      </ExtraInfo>
      {/* )} */}
    </Container>
  );
};

export default SelectionSummary;
