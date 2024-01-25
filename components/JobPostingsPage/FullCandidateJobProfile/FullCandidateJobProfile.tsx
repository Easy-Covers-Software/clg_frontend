import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid2 for the layout
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { PrimaryButton } from '@/components/Global/Global';
import { CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScoreDetails from './components/ScoreDetails/ScoreDetails';

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

const LeftSide = styled(Grid)`
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0;
  padding: 0;
`;

const RightSide = styled(Grid)`
  height: 98.8%;
  width: 25%;
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
  selectedJobPosting,
  selectedCandidate,
  phoneCalls,
  generations,
  genMode,
  callMode,
  matchScore,
  loading,
  updateSubSectionMode,
  updateGenerationsPanelMode,
  updateCallsPanelMode,
  handleCalculate,
  handleGenerationSelection,
  handleCallSelection,
}) => {
  console.log('selectedJobPosting', selectedJobPosting);

  const emailGenerations = generations?.filter(
    (item) => item?.generation_type === 'email'
  );

  const coverLetterGenerations = generations?.filter(
    (item) => item?.generation_type === 'cover_letter'
  );

  console.log('phone calls', phoneCalls);

  const introPhoneCall = phoneCalls?.filter(
    (item) => item?.call_type === 'intro'
  )[0];

  console.log('intro phone call', phoneCalls);

  const followUpPhoneCalls = phoneCalls?.filter(
    (item) => item?.call_type === 'follow_up'
  );

  const setModeToIntroCall = () => {
    updateSubSectionMode('introCall');
  };

  const setModeToFollowUpCall = () => {
    updateSubSectionMode('followUpCall');
  };

  const setModeToEmails = () => {
    updateSubSectionMode('emails');
  };

  const setModeToEmailsSelection = () => {
    updateGenerationsPanelMode('emailsSelection');
  };

  const resetGenerationPanelMode = () => {
    updateGenerationsPanelMode('overview');
  };

  const setCallPanelModeToFollowSelection = () => {
    updateCallsPanelMode('callsSelection');
  };

  const resetCallPanelMode = () => {
    updateCallsPanelMode('overview');
  };

  const setModeToCoverLetters = () => {
    updateSubSectionMode('coverLetters');
  };

  const setModeToCoverLettersSelection = () => {
    updateGenerationsPanelMode('coverLettersSelection');
  };

  const setModeToResume = () => {
    updateSubSectionMode('resume');
  };

  console.log('selectedJobPosting ====***');
  console.log(followUpPhoneCalls);

  return (
    <Container>
      {/* Left Side - Score Details */}
      <LeftSide>
        <Typography fontSize={'1.5rem'}>Score Details</Typography>
        <ScoreDetails
          page={page}
          jobPostingId={selectedJobPosting?.job_posting?.id}
          jobTitle={selectedJobPosting?.job_title}
          matchScoreDetails={matchScore}
          loading={loading}
          handleCalculate={handleCalculate}
        />
      </LeftSide>

      {/* Right Side - Panels */}
      <RightSide>
        <Typography fontSize={'1.5rem'}>Status Overview</Typography>

        <RightSideMain>
          {/* Resume Panel */}
          <ResumeFeedbackPanel />

          {/* <SubPanelContainer>
          <Typography variant="h6">&nbsp;</Typography>
          <ExtraDetailsPanelPaperScore
            elevation={3}
            onClick={setModeToResume}
            style={{
              cursor: 'pointer',
            }}
          >
            <Typography fontSize={'1.8rem'}>Résumé</Typography>
          </ExtraDetailsPanelPaperScore>
        </SubPanelContainer> */}

          {/* Calls Panel */}
          <CallsPanel />

          {/* <SubPanelContainer>
          <Typography variant="h6">&nbsp;</Typography>
          <CallsPaper elevation={3}>
            {callMode === 'callsSelection' ? (
              <GenerationsList
                listType={'Follow Up Calls'}
                generations={followUpPhoneCalls}
                resetGenerationPanelMode={resetCallPanelMode}
                handleSelection={handleGenerationSelection}
              />
            ) : (
              <>
                <Typography fontSize={'1.4rem'} textAlign={'center'}>
                  Calls
                </Typography>
                <ButtonGroupContainer
                  variant="text"
                  aria-label="text button group"
                >
                  <PanelButton
                    onClick={() => {
                      handleCallSelection(introPhoneCall);
                    }}
                    disabled={!introPhoneCall}
                  >
                    Intro
                  </PanelButton>

                  <PanelButton
                    onClick={() => {
                      if (followUpPhoneCalls) {
                        if (followUpPhoneCalls?.length === 1) {
                          handleCallSelection(followUpPhoneCalls[0]);
                        } else {
                          setCallPanelModeToFollowSelection();
                        }
                      }
                    }}
                    disabled={
                      !followUpPhoneCalls || followUpPhoneCalls?.length === 0
                    }
                  >
                    Follow <br /> Up
                  </PanelButton>
                </ButtonGroupContainer>
              </>
            )}
          </CallsPaper>
        </SubPanelContainer> */}

          {/* Generations Panel */}
          <GenerationsPanel />
        </RightSideMain>

        {/* <SubPanelContainer>
          <Typography variant="h6">&nbsp;</Typography>
          <GenerationsPaper elevation={3}>
            {genMode === 'emailsSelection' ? (
              <GenerationsList
                listType={'Emails'}
                generations={emailGenerations}
                resetGenerationPanelMode={resetGenerationPanelMode}
                handleSelection={handleGenerationSelection}
              />
            ) : genMode === 'coverLettersSelection' ? (
              <GenerationsList
                listType={'Cover Letters'}
                generations={coverLetterGenerations}
                resetGenerationPanelMode={resetGenerationPanelMode}
                handleSelection={handleGenerationSelection}
              />
            ) : (
              <>
                <Typography textAlign={'center'} fontSize={'1.4rem'}>
                  Generations
                </Typography>
                <ButtonGroupContainer
                  variant="text"
                  aria-label="text button group"
                >
                  <PanelButton
                    onClick={() => setModeToEmailsSelection()}
                    disabled={emailGenerations?.length === 0}
                  >
                    Emails
                  </PanelButton>

                  <PanelButton
                    onClick={() => setModeToCoverLettersSelection()}
                    disabled={coverLetterGenerations?.length === 0}
                  >
                    Cover <br /> Letters
                  </PanelButton>
                </ButtonGroupContainer>
              </>
            )}
          </GenerationsPaper>
        </SubPanelContainer> */}
      </RightSide>
    </Container>
  );
};

export default FullCandidateJobProfile;
