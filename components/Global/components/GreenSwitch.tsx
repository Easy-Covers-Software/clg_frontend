import { FC } from 'react';

import { Typography } from '@mui/material';

import { CircularProgress } from '@mui/material';
import Switch from '@mui/material/Switch';

import { useAuth } from '@/context/AuthContext';

// import {
//   Container,
//   MainContent,
//   ExtraInfo,
// } from '@/components/PageStructure/SelectionSummary/SelectionSummary.styles';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import { SummaryHeaderProps } from '@/Types/Common.types';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export const GreenSwitch = styled(Switch)(({ theme }) => ({
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
