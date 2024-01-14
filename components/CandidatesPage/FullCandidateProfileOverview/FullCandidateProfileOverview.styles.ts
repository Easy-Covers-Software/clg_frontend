import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const Container = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 0.3%;
  padding: 0.5%;
  margin: auto;
  flex-wrap: nowrap;
  white-space: nowrap;
  margin: 0;
  padding-bottom: 1%;

  // max-width: 60vw;
`;

export const ProfessionDetailsGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin: 0;
`;

export const JobPostingsListGrid = styled(Grid)`
  width: 100%;
  min-height: 220px;
  flex: 1;
  padding: 0;
  margin: 0;
`;

export const ResumePanelGrid = styled(Grid)`
  height: 16vh;
  min-height: 100px;
`;


export const StyledPaper = styled(Paper)`
  height: 100%;
  border: 3px solid #13d0b7;
  overflow: hidden;
  flex: 1;
`;


export const PersonalDetailsGrid = styled(Grid)`
  width: 100%;
  // flex: 1;
  padding: 0;
  margin: 0;
`;

export const PersonalDetailsPaper = styled(StyledPaper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  // gap: 10%;
`;

export const ResumePanelPaper = styled(StyledPaper)`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

