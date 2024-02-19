import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid2 for the layout
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { PrimaryButton } from '@/components/Global/Global';
import { CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  Container,
  SubPanelContainer,
  ScoreDetailsPaper,
  CallsPaper,
  GenerationsPaper,
  ExtraDetailsPanelPaper,
  ExtraDetailsPanelPaperScore,
  ButtonGroupContainer,
  PanelButton,
  BackButton,
  CustomListItem,
} from './FullCandidateJobProfile.styles';

import ExtraDetailsPanel from './components/ExtraDetailsPanel';
import ResumeFeedbackPanel from './components/ScoringMaterials/ResumeFeedbackPanel';
import GenerationsPanel from './components/ScoringMaterials/GenerationsPanel';
import CallsPanel from './components/ScoringMaterials/CallsPanel';

import CurrentStatus from './components/CurrentStatus/CurrentStatus';
import ScoreDetails from './components/ScoreDetails/ScoreDetails';

const LeftSide = styled(Grid)`
  // height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
`;

const RightSide = styled(Grid)`
  height: 98.4%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
`;

const RightSideMain = styled(Grid)`
  height: 95%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const GenerationsList = ({
  listType,
  generations,
  resetGenerationPanelMode,
  handleSelection,
}) => {
  return (
    <>
      <Grid container justifyContent={'space-between'} width={'100%'}>
        <BackButton onClick={resetGenerationPanelMode}>
          <ArrowBackIcon />
          <Typography>back</Typography>
        </BackButton>
        <Typography
          variant={listType === 'Follow Up Calls' ? 'subtitle1' : 'h5'}
          style={{
            marginTop: '5%',
            marginRight: '8%',
          }}
        >
          {listType}
        </Typography>
      </Grid>
      <List
        dense
        style={{
          width: '100%',
        }}
      >
        {generations.map((generation, index) => (
          <CustomListItem
            key={index}
            dense
            onClick={() => handleSelection(generation)}
            style={{
              borderTop: index === 0 ? '1px solid #13d0b7' : 'none',
            }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle1">
                  {generation.save_name}
                </Typography>
              }
              secondary={new Date(generation.created_at).toLocaleDateString()}
            />
          </CustomListItem>
        ))}
      </List>
    </>
  );
};

const PanelButtonGroup = ({
  buttonLabels,
  handleLeftButtonClick,
  handleRightButtonClick,
}) => {
  return (
    <ButtonGroupContainer variant="text" aria-label="text button group">
      <PanelButton onClick={() => handleLeftButtonClick()}>
        {buttonLabels[0]}
      </PanelButton>

      <PanelButton onClick={() => handleRightButtonClick()}>
        {buttonLabels[1]} <br /> {buttonLabels[2]}
      </PanelButton>
    </ButtonGroupContainer>
  );
};

const FullCandidateJobProfile = ({
  page,
  jobStatusState,
  updateJobStatusState,
  handleCalculate,
}) => {
  const updateJobStatusMode = (mode: string) => {
    updateJobStatusState('mode', mode);
  };

  // new
  const updateScoreMode = (mode) => {
    updateJobStatusState('scoreMode', mode);
  };

  return (
    <Container>
      {/* CurrentStatus Component */}
      <CurrentStatus
        selectedJobStatus={jobStatusState.selectedJob}
        updateJobStatusMode={updateJobStatusMode}
      />

      {/* Score Details */}
      <ScoreDetails
        page={page}
        jobStatusState={jobStatusState}
        updateScoreMode={updateScoreMode}
        handleCalculate={handleCalculate}
      />
    </Container>
  );
};

export default FullCandidateJobProfile;
