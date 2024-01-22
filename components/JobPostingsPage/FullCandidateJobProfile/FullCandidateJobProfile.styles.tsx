// import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid2 for the layout
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem';
import { IconButton } from '@mui/material';
import { UnSelectedButton } from '@/components/Global/Global';
import ButtonGroup from '@mui/material/ButtonGroup';

import { StyledPaper as StyledPaper2 } from '@/components/CandidatesPage/FullCandidateProfileOverview/FullCandidateProfileOverview.styles';

export const Container = styled(Grid)`
  height: 100%;
  max-height: 60vh;
  padding: 1%;
  padding-top: 0;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  justify-content: flex-end;
  margin: auto;
  flex-wrap: nowrap;
`;

export const SubPanelContainer = styled(Grid)`
  // height: 20vh;
  height: 20%;
  width: 100%;
  // min-height: 100px;
  padding: 0;
  margin: 0;
`;

export const StyledPaper = styled(Paper)`
  height: 100%;
  width: 100%;
  border: 3px solid #13d0b7;
  overflow: scroll;
`;

export const ScoreDetailsPaper = styled(StyledPaper)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // align-items: center;
  // overflow: hidden;
`;

export const CallsPaper = styled(StyledPaper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3%;
  overflow: hidden;
`;

export const GenerationsPaper = styled(StyledPaper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3%;
  overflow: hidden;
`;

export const ExtraDetailsPanelPaper = styled(StyledPaper2)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0.5%;
`;

export const ExtraDetailsPanelPaperScore = styled(StyledPaper2)`
  height: 13vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0.5%;
  border: 3px solid #13d0b7;
`;

export const ButtonGroupContainer = styled(ButtonGroup)`
  width: 98%;
  padding-bottom: 3%;
`;

export const PanelButton = styled(UnSelectedButton)`
  border: 1px solid #13d0b7 !important;
  height: 14vh;
  color: #006d4b !important;
  background-color: #f5f5ff !important;

  &:hover {
    background-color: white;
  }

  &:disabled {
    background-color: lightgray;
    color: gray !important;
    opacity: 0.4;
  }
`;

export const BackButton = styled(IconButton)`
  margin-top: 3%;
`;

export const CustomListItem = styled(ListItem)`
  border-bottom: 1px solid #13d0b7;
  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: #f5f5ff;
  }
`;
