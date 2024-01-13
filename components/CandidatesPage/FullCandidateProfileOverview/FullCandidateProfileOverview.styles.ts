import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import styled from '@emotion/styled';
import { Paper } from '@mui/material';

const Container = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  margin: auto;
  // padding: 1%;
  flex-wrap: nowrap;
  white-space: nowrap;
  margin: 0;

  // max-width: 60vw;
`;

const ProfessionDetailsGrid = styled(Grid)`
  height: 28vh;
  min-height: 200px;
`;

const JobPostingsListGrid = styled(Grid)`
  // height: 41.7vh;
  // height: fit-content;
  flex-grow: 1;
  height: 40%;
  min-height: 220px;
  // overflow: scroll;
  white-space: nowrap;
  flex-wrap: nowrap;
`;

const ResumePanelGrid = styled(Grid)`
  height: 16vh;
  min-height: 100px;
`;

const PersonalDetailsGrid = styled(Grid)`
  // height: 45%;
  // margin-top: 5%;
  flex: 1;
  width: auto !important;
`;

const StyledPaper = styled(Paper)`
  height: 100%;
  width: 100%;
  border: 3px solid #13d0b7;
  overflow: scroll;
`;

const ResumePanelPaper = styled(StyledPaper)`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

export {
  Container,
  ProfessionDetailsGrid,
  JobPostingsListGrid,
  ResumePanelGrid,
  PersonalDetailsGrid,
  StyledPaper,
  ResumePanelPaper,
}