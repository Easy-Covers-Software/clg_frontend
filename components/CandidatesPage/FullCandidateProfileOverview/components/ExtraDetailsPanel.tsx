import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { SubPanelContainer } from '@/components/JobPostingsPage/FullCandidateJobProfile/FullCandidateJobProfile.styles';
import { ExtraDetailsPanelPaper } from '@/components/JobPostingsPage/FullCandidateJobProfile/FullCandidateJobProfile.styles';
import styled from '@emotion/styled';
// icon imports
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone'; // if no resume associated to candidate
import FileOpenTwoToneIcon from '@mui/icons-material/FileOpenTwoTone'; // if resume associated to candidate
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone'; // generations icon
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone'; // feedback icon
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'; // settings icon

import { UnSelectedButton } from '@/components/Global/Global';

export const PanelButton = styled(UnSelectedButton)`
  width: 50%;
  height: 100%;

  color: #006d4b !important;
  background-color: #f5f5ff !important;

  border: 1px solid #13d0b7 !important;

  &:hover {
    background-color: white;
  }

  &:disabled {
    background-color: lightgray;
    color: gray !important;
    opacity: 0.4;
  }
`;

const ExtraDetailsPanel = ({ updateMode }) => {
  return (
    <SubPanelContainer xs={12} height={'14vh'}>
      <ExtraDetailsPanelPaper>
        <Grid container height={'100%'} p={0} m={'auto'}>
          <PanelButton>Résumé</PanelButton>
          <PanelButton>Generations</PanelButton>
        </Grid>

        <Grid container height={'100%'} p={0} m={'auto'}>
          <PanelButton>Feedback</PanelButton>
          <PanelButton>Update Info</PanelButton>
        </Grid>
      </ExtraDetailsPanelPaper>
    </SubPanelContainer>
  );
};

export default ExtraDetailsPanel;
