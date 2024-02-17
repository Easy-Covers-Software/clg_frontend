import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { PrimaryButton } from '@/components/Global/Global';

const Container = styled(Grid2)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  // margin: auto;
  padding-top: 5%;
  padding-bottom: 29%;
  border-radius: 4px;
  border: 1px solid #006d4b;
  overflow: hidden;
`;

const CalculateHeader = styled(Typography)`
  text-align: center;
  font-size: 2rem;
`;

const CalculateButton = styled(PrimaryButton)`
  height: 8vh;
  width: 20vw;
  // margin-bottom: 50%;
  margin-top: 3%;
  font-size: 1.5rem;
  margin: auto;
`;

const AwaitingCalculation = ({ page, jobPostingId, handleCalculate }) => (
  <Container>
    <CalculateHeader>Awaiting Calculation</CalculateHeader>

    <CalculateButton
      variant="contained"
      onClick={() => {
        if (page === 'candidate') {
          handleCalculate(jobPostingId);
        } else {
          handleCalculate(jobPostingId);
        }
      }}
    >
      Calculate
    </CalculateButton>
  </Container>
);

export default AwaitingCalculation;
