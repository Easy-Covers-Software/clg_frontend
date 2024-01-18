import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { StyledPaper } from '../../FullCandidateProfileOverview.styles';
import Divider from '@mui/material/Divider';

export const ProfessionalDetailsGrid = styled(Grid)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

export const ProfessionalDetailsPaper = styled(StyledPaper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  white-space: nowrap;
  // overflow: scroll;
  // gap: 10%;
`;

export const Header = styled(Typography)`
  font-size: 1.7rem;
  padding-left: 1.5%;
  padding-top: 1%;
  letter-spacing: 0.18rem;
  line-height: 1.1;
`;

export const MainSections = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0;
  margin: 0;
`;

export const SectionHeader = styled(Typography)`
  text-align: end;
  padding-right: 2%;
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 1%;
  margin-bottom: -1.5%;
`;

export const SubDivider = styled(Divider)`
  width: 96.5%;
  margin: auto;
  border-color: #006d4b;
  opacity: 0.6;
`;
