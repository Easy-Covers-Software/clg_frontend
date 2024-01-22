import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Paper from '@mui/material/Paper';
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
  background-color: white !important;

  border: 1px solid #13d0b7 !important;

  &:hover {
    background-color: #f8f8ff !important;
  }

  &:disabled {
    background-color: lightgray;
    color: gray !important;
    opacity: 0.4;
  }
`;

const ExtraDetailsPanel = ({ updateMode }) => {
  return (
    <SubPanelContainer xs={12}>
      <ExtraDetailsPanelPaper elevation={3}>
        <Grid container height={'100%'} p={0} m={0}>
          <PanelButton
            onClick={() => {
              updateMode('resume');
            }}
          >
            Résumé
          </PanelButton>
          <PanelButton
            onClick={() => {
              updateMode('calls');
            }}
          >
            Calls
          </PanelButton>
        </Grid>

        <Grid container height={'100%'} p={0} m={0}>
          <PanelButton
            onClick={() => {
              updateMode('feedback');
            }}
          >
            Feedback
          </PanelButton>
          <PanelButton
            onClick={() => {
              updateMode('update');
            }}
          >
            Update
          </PanelButton>
        </Grid>
      </ExtraDetailsPanelPaper>
    </SubPanelContainer>
  );
};

export default ExtraDetailsPanel;
