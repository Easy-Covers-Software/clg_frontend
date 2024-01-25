import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, CircularProgress } from '@mui/material';

const Container = styled(Grid2)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CalculateHeader = styled(Typography)`
  text-align: center;
`;

const CustomCircularProgress = styled(CircularProgress)`
  color: #13d0b7;
`;

const LoadingScore = ({ jobTitle }) => (
  <Container>
    <CalculateHeader>Calculating Match Score for {jobTitle}</CalculateHeader>

    <CustomCircularProgress />
  </Container>
);

export default LoadingScore;
