import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';

import { SubPanelContainer } from '../../FullCandidateJobProfile.styles';

import { StyledPaper } from '@/components/CandidatesPage/FullCandidateProfileOverview/FullCandidateProfileOverview.styles';

import { PanelButton } from '../ExtraDetailsPanel';
import { ButtonGroupContainer } from '../../FullCandidateJobProfile.styles';

const Container = styled(Grid)`
  height: 30%;
  width: 100%;
  // min-height: 100px;
  padding: 0;
  margin: 0;
`;

const PanelPaper = styled(StyledPaper)`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 0.5%;
  border: 3px solid #13d0b7;
  cursor: pointer;
`;

const GenerationsPanel = () => (
  <Container>
    <PanelPaper>
      <Typography fontSize={'1.4rem'} textAlign={'center'}>
        Generations
      </Typography>

      <ButtonGroupContainer variant="text">
        <PanelButton>Intro</PanelButton>

        <PanelButton>
          Cover <br /> Letters
        </PanelButton>
      </ButtonGroupContainer>
    </PanelPaper>
  </Container>
);

export default GenerationsPanel;
