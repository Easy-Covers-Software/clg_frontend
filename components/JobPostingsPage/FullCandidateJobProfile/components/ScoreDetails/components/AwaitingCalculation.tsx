import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { PrimaryButton } from '@/components/Global/Global';

const Container = styled(Grid2)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CalculateHeader = styled(Typography)`
  text-align: center;
`;

const CalculateButton = styled(PrimaryButton)`
  height: 8vh;
  width: 72%;
  margin-bottom: 50%;
  margin-top: 3%;
  font-size: 1.5rem;
`;

const AwaitingCalculation = ({ page, jobPostingId, handleCalculate }) => (
  <Container>
    <CalculateHeader>
      Awaiting Calculation for Job Posting {jobPostingId}
    </CalculateHeader>

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
