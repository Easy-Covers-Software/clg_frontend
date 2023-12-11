import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#13d0b7',
  },
}));

// Inspired by the former Facebook spinners.
function LoadingCircle(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: '#13d0b7',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function TranscriptionProgress({ step }) {
  const determineProgressBarValue = (step) => {
    switch (step) {
      case '0':
        return 0;
      case '1':
        return 25;
      case '2':
        return 50;
      case '3':
        return 75;
      case '4':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '30%',
        width: '60%',
        padding: '2%',
        marginBottom: '10%',
        margin: 'auto',
        marginTop: '10%'
      }}
    >
      <Grid
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
      >
        <Typography fontSize={'1.8rem'}>
          Transcription in progress...
        </Typography>
        <LoadingCircle />
      </Grid>
      <br />
      <Grid width={'86%'} m={'auto'}>
        <BorderLinearProgress
          variant='determinate'
          value={determineProgressBarValue(step)}
        />
      </Grid>
    </Paper>
  );
}
