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
  width: 98%;
  height: 23vh;

  margin: 0 auto;
  margin-bottom: 1%;

  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: white;
`;

const StatusOverview = styled(Grid2)`
  width: 100%;
  height: 57%;
  display: flex;
`;

const OverviewInfo = styled(Grid2)`
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 1%;
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
  height: 44%;
`;

const CirculedIconButton = styled(IconButton)`
  border: 1px solid lightgray;
`;

type CurrentStatusState = {
  currentStatus: string; // is one of many 'choices' from backend model field or ''
  source: string; // represents the recruiter or team that is responsible for the current status
  hiringSteps: any; // will be an object for the new hiring steps model
};

const CurrentStatus = ({ selectedJobStatus, updateJobStatusMode }) => {
  const setModeToResume = () => {
    updateJobStatusMode('resume');
  };

  const setModeToCalls = () => {
    updateJobStatusMode('calls');
  };

  const setModeToFeedback = () => {
    updateJobStatusMode('feedback');
  };

  const setModeToGenerations = () => {
    updateJobStatusMode('generations');
  };

  const setModeToUpdateStatus = () => {
    updateJobStatusMode('update');
  };

  const setModeToSettings = () => {
    updateJobStatusMode('update');
  };

  return (
    <Container>
      <StatusOverview>
        <OverviewInfo>
          <OverviewInfoStatus>
            Status: <strong> {selectedJobStatus.status}</strong>
          </OverviewInfoStatus>
          <OverviewInfoSource>
            Recruiter/Team:{' '}
            {selectedJobStatus.recruiter ||
              selectedJobStatus?.search_team?.name ||
              'N/A'}
          </OverviewInfoSource>
        </OverviewInfo>

        <Divider orientation="vertical" flexItem />

        <OverviewIconOptions>
          <IconOptionsRow>
            <Tooltip title={'Résumé'}>
              <CirculedIconButton onClick={setModeToResume}>
                <DocumentScannerOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
            <Tooltip title={'Calls'}>
              <CirculedIconButton onClick={setModeToCalls}>
                <PermPhoneMsgOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
          </IconOptionsRow>
          <IconOptionsRow>
            <Tooltip title={'Feedback'}>
              <CirculedIconButton onClick={setModeToFeedback}>
                <RateReviewOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
            <Tooltip title={'Generations'}>
              <CirculedIconButton onClick={setModeToGenerations}>
                <TipsAndUpdatesOutlinedIcon fontSize="small" />
              </CirculedIconButton>
            </Tooltip>
          </IconOptionsRow>
        </OverviewIconOptions>
      </StatusOverview>

      <Divider />

      <StatusProgressVisual>
        <StatusProgress
          currentStatus={selectedJobStatus.status}
          hiringSteps={selectedJobStatus?.hiring_steps || 'N/A'}
        />
      </StatusProgressVisual>
    </Container>
  );
};

export default CurrentStatus;
