import styled from '@emotion/styled';
import { Paper } from '@mui/material';

// ScoreDetails.tsx
import { Box, Typography, Grid } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import LoadingScore from './components/LoadingScore';
import AwaitingCalculation from './components/AwaitingCalculation';
import { Divider } from '@mui/material';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#006D4B',
  },
}));

export const ScoreTypeContainer = styled(Grid2)`
  width: 100%;
  height: 7vh;
  display: flex;
`;

export const ScoreHeaderBox = styled(Box)`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? '#f5f5f5' : 'white')};

  &:hover {
    cursor: ${({ isSelected }) => (isSelected ? 'default' : 'pointer')};
  }
`;

export const ScoreHeader = styled(Typography)`
  font-size: 1.42rem;
  text-decoration: ${({ isSelected }) => (isSelected ? 'underline' : 'none')};
  color: #006d4b;
`;

export const ScoreDetailsContainer = styled(Grid2)`
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: space-between;
  // overflow: scroll;
  border: 1px solid #13d0b7;
  border-radius: 4px;
  padding-top: 1%;
`;

export const ScoreDetailsBox = styled(Grid2)`
  width: 50%;
  margin-left: 3%;
  // margin-top: 1%;
`;

export const ScoreBox = styled(Box)`
  width: 86%;
  margin: ${({ scoreName }) =>
    scoreName === 'skill_match_score' ||
    scoreName === 'problem_solving_match_score'
      ? '0'
      : '7.2% 0'};
`;

export const ScoreValueBox = styled(Grid)`
  display: flex;
  justify-content: space-between;
`;

export const ScoreValue = styled(Typography)`
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ScoreVisualProgress = styled(BorderLinearProgress)`
  width: 100%;
  height: 10px;
  margin-top: 1%;
`;

export const ScoreDetailsPaper = styled(Paper)`
  height: 46.6vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // overflow: hidden;
  border: 1px solid #006d4b;
  box-shadow: none;
`;

export const Header = styled(Typography)`
  font-size: 1.42rem !important;
  color: #006d4b;
  position: relative;
  top: 1%;
  left: 1%;
`;
