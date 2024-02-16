import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Divider, Typography, IconButton, Tooltip } from '@mui/material';

import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import StatusProgress from './components/StatusProgress';

const Container = styled(Grid2)`
  width: 100%;
  height: 24vh;
  margin-bottom: 1%;

  border: 1px solid #13d0b7;
  border-radius: 4px;
  background-color: white;
`;

const StatusOverview = styled(Grid2)`
  width: 100%;
  height: 45%;
  display: flex;
`;

const OverviewInfo = styled(Grid2)`
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
`;

const OverviewInfoStatus = styled(Typography)`
  font-size: 2rem !important;
  letter-spacing: 0.05rem;
  color: #006d4b;
  margin-top: 1%;
  margin-left: 1%;
`;

const OverviewInfoSource = styled(Typography)`
  font-size: 1.6rem !important;
  letter-spacing: 0.12rem;
  color: #006d4b;
  margin-left: 1%;
`;

const OverviewIconOptions = styled(Grid2)`
  height: 100%;
  width: 25%;
  // border: 1px solid red;
`;

const IconOptionsRow = styled(Grid2)`
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const StatusProgressVisual = styled(Grid2)`
  width: 100%;
  height: 55%;
`;

const CirculedIconButton = styled(IconButton)`
  border: 1px solid lightgray;
`;

const CurrentStatus = ({ updateJobStatusState }) => {
  const setJobStatusModeToResume = () => {
    updateJobStatusState('mode', 'resume');
  };

  const setJobStatusModeToCalls = () => {
    updateJobStatusState('mode', 'calls');
  };

  const setJobStatusModeToFeedback = () => {
    updateJobStatusState('mode', 'feedback');
  };

  const setJobStatusModeToGenerations = () => {
    updateJobStatusState('mode', 'generations');
  };

  const setJobStatusModeToUpdateStatus = () => {
    updateJobStatusState('mode', 'update');
  };

  const setJobStatusModeToSettings = () => {
    updateJobStatusState('mode', 'settings');
  };

  return (
    <Container>
      <StatusOverview>
        <OverviewInfo>
          <OverviewInfoStatus>
            Status: <strong> Phone Screening</strong>
          </OverviewInfoStatus>
          <OverviewInfoSource>
            Recruiter/Team: David Silveira
          </OverviewInfoSource>
        </OverviewInfo>

        <Divider orientation="vertical" flexItem color={'#13d0b7'} />

        <OverviewIconOptions>
          <IconOptionsRow>
            <Tooltip title={'Résumé'}>
              <CirculedIconButton onClick={setJobStatusModeToResume}>
                <DocumentScannerOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
            <Tooltip title={'Calls'}>
              <CirculedIconButton onClick={setJobStatusModeToCalls}>
                <PermPhoneMsgOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
            <Tooltip title={'Feedback'}>
              <CirculedIconButton onClick={setJobStatusModeToFeedback}>
                <RateReviewOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
          </IconOptionsRow>
          <IconOptionsRow>
            <Tooltip title={'Generations'}>
              <CirculedIconButton onClick={setJobStatusModeToGenerations}>
                <TipsAndUpdatesOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
            <Tooltip title={'Update Status'}>
              <CirculedIconButton onClick={setJobStatusModeToUpdateStatus}>
                <CreateOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
            <Tooltip title={'Settings'}>
              <CirculedIconButton onClick={setJobStatusModeToSettings}>
                <SettingsOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
          </IconOptionsRow>
        </OverviewIconOptions>
      </StatusOverview>

      <Divider color={'#13d0b7'} />

      <StatusProgressVisual>
        <StatusProgress />
      </StatusProgressVisual>
    </Container>
  );
};

export default CurrentStatus;
