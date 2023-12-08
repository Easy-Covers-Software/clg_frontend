import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid2 for the layout
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { Typography, Box } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';
import { CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ScoreDetails from './components/ScoreDetails';

const Container = styled(Grid)`
  height: 100%;
  padding: 1%;
  padding-top: 0;
  width: 100%;
  display: flex;
  // flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-content: flex-end;
  margin: auto;
`;

const SubPanelContainer = styled(Grid)`
  height: 20vh;
  min-height: 100px;
`;

const StyledPaper = styled(Paper)`
  height: 100%;
  width: 100%;
  border: 3px solid #13d0b7;
  overflow: scroll;
`;

const ScoreDetailsPaper = styled(StyledPaper)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // align-items: center;
  // overflow: hidden;
`;

const CallsPaper = styled(StyledPaper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const GenerationsPaper = styled(StyledPaper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ResumePanelPaper = styled(StyledPaper)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroupContainer = styled(ButtonGroup)`
  width: 98%;
  padding-bottom: 10%;
`;

const PanelButton = styled(UnSelectedButton)`
  border: 1px solid #13d0b7 !important;
  height: 10vh;
  color: #006d4b !important;
  background-color: #f5f5ff !important;

  &:hover {
    background-color: white;
  }

  &:disabled {
    background-color: lightgray;
    color: gray !important;
    opacity: 0.4;
  }
`;
const BackButton = styled(IconButton)`
  margin-top: 3%;
`;

const CustomListItem = styled(ListItem)`
  border-bottom: 1px solid #13d0b7;
  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: #f5f5ff;
  }
`;

const GenerationsList = ({
  listType,
  generations,
  resetGenerationPanelMode,
  handleSelection,
}) => {
  return (
    // <Grid container>
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
                <Typography variant='subtitle1'>
                  {generation.save_name}
                </Typography>
              }
              secondary={new Date(generation.created_at).toLocaleDateString()}
            />
          </CustomListItem>
        ))}
      </List>
    </>
    // </Grid>
  );
};

const PanelButtonGroup = ({
  buttonLabels,
  handleLeftButtonClick,
  handleRightButtonClick,
}) => {
  return (
    <ButtonGroupContainer variant='text' aria-label='text button group'>
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
  introCall,
  followUpCalls,
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
  const emailGenerations = generations.filter(
    (item) => item.generation_type === 'email'
  );

  const coverLetterGenerations = generations.filter(
    (item) => item.generation_type === 'cover_letter'
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

  const setModeToCallsSelection = () => {
    updateGenerationsPanelMode('coverLettersSelection');
  };

  const setModeToResume = () => {
    updateSubSectionMode('resume');
  };

  console.log('selectedJobPosting ====***');
  console.log(selectedJobPosting);

  return (
    <Container container spacing={2}>
      {/* Left Side - Score Details */}
      <Grid
        xs={12}
        md={8}
        container
        direction='column'
        spacing={2}
        height={'100%'}
        flexWrap={'nowrap'}
      >
        <Grid xs={12} height={'60vh'}>
          <Typography variant='h6'>Score Details</Typography>
          <ScoreDetailsPaper elevation={3}>
            {matchScore ? (
              <ScoreDetails matchScoreDetails={matchScore} />
            ) : loading ? (
              <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Typography textAlign={'center'}>
                  Calculating Match Score for {selectedJobPosting?.job_title}
                </Typography>
                <CircularProgress style={{ color: '#13d0b7' }} />
              </Grid>
            ) : (
              <Grid
                height={'100%'}
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Typography variant='h5'>
                  Click Calculate to get the match score
                </Typography>
                <PrimaryButton
                  variant='contained'
                  onClick={() => {
                    if (page === 'candidate') {
                      handleCalculate(selectedJobPosting?.id);
                    } else {
                      handleCalculate(selectedCandidate?.id);
                    }
                  }}
                  style={{
                    height: '8vh',
                    width: '72%',
                    marginBottom: '50%',
                    marginTop: '3%',
                    fontSize: '1.5rem',
                  }}
                >
                  Calculate
                </PrimaryButton>
              </Grid>
            )}
          </ScoreDetailsPaper>
        </Grid>
      </Grid>

      {/* Right Side - Panels */}
      <Grid
        xs={12}
        md={4}
        container
        direction='column'
        spacing={2}
        height={'100%'}
        flexWrap={'nowrap'}
        // justifyContent={'end'}
      >
        {/* Calls Panel */}
        <SubPanelContainer xs={12}>
          <Typography variant='h6'>&nbsp;</Typography>
          <CallsPaper elevation={3}>
            {callMode === 'callsSelection' ? (
              <GenerationsList
                listType={'Follow Up Calls'}
                generations={followUpCalls}
                resetGenerationPanelMode={resetCallPanelMode}
                handleSelection={handleCallSelection}
              />
            ) : (
              <>
                <Typography variant='h5' textAlign={'center'} marginTop={'1%'}>
                  Calls
                </Typography>
                <ButtonGroupContainer
                  variant='text'
                  aria-label='text button group'
                >
                  <PanelButton
                    onClick={() => {
                      const phoneCall = phoneCalls.find(
                        (item) => item.call_type === 'intro'
                      );
                      console.log('phoneCall');
                      console.log(introCall);
                      handleCallSelection(introCall);
                      // TODO: TEST
                      // handleCallSelection(introCall);
                    }}
                    disabled={introCall?.transcription === null}
                  >
                    Intro
                  </PanelButton>

                  <PanelButton
                    onClick={() => {
                      if (followUpCalls) {
                        if (followUpCalls.length === 1) {
                          handleCallSelection(followUpCalls[0]);
                        } else {
                          setCallPanelModeToFollowSelection();
                        }
                      }
                    }}
                    disabled={
                      followUpCalls === null || followUpCalls.length === 0
                    }
                  >
                    Follow <br /> Up
                  </PanelButton>
                </ButtonGroupContainer>
              </>
            )}
          </CallsPaper>
        </SubPanelContainer>

        {/* Generations Panel */}
        <SubPanelContainer xs={12}>
          <Typography variant='h6'>&nbsp;</Typography>
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
                <Typography variant='h5'>Generations</Typography>
                <ButtonGroupContainer
                  variant='text'
                  aria-label='text button group'
                >
                  <PanelButton
                    onClick={() => setModeToEmailsSelection()}
                    disabled={emailGenerations.length === 0}
                  >
                    Emails
                  </PanelButton>

                  <PanelButton
                    onClick={() => setModeToCoverLettersSelection()}
                    disabled={coverLetterGenerations.length === 0}
                  >
                    Cover <br /> Letters
                  </PanelButton>
                </ButtonGroupContainer>
              </>
            )}
          </GenerationsPaper>
        </SubPanelContainer>

        {/* Resume Panel */}
        <SubPanelContainer xs={12} height={'20vh'}>
          <Typography variant='h6'>&nbsp;</Typography>
          <ResumePanelPaper elevation={3} onClick={setModeToResume}>
            <Typography variant='h4'>Resume</Typography>
          </ResumePanelPaper>
        </SubPanelContainer>
      </Grid>
    </Container>
  );
};

export default FullCandidateJobProfile;
