import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { StyledPaper } from '../../FullCandidateProfileOverview.styles';

export const PersonalDetailsGrid = styled(Grid)`
  width: 100%;
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

export const Header = styled(Typography)`
  font-size: 1.7rem;
  padding-left: 1.5%;
  padding-top: 1%;
  letter-spacing: 0.18rem;
  // margin: auto 0;
  line-height: 1;
  color: #006d4b;
`;

export const DetailsContainer = styled(Grid)`
  padding: 0;
  margin: 0;
  margin-top: -1%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

export const DetailsColumn = styled(Grid)`
  max-width: 50%;
  padding: 0;
  margin: 0 auto;
`;

export const Label = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 600;
  color: #006d4b;
  margin-bottom: 1%;
`;

export const Value = styled(Typography)`
  font-size: 1.22rem;
  color: #006d4b;
`;

export const LabelsGrid = ({ label1, label2, label3, label4, size }) => (
  <Grid item xs={size}>
    <Label>{label1}</Label>
    <Label>{label2}</Label>
    <Label>{label3}</Label>
    <Label>{label4}</Label>
  </Grid>
);

export const ValuesGrid = ({ value1, value2, value3, value4 }) => (
  <Grid item xs={6}>
    <Value>{value1}</Value>
    <Value>{value2}</Value>
    <Value>{value3}</Value>
    <Value>{value4}</Value>
  </Grid>
);
