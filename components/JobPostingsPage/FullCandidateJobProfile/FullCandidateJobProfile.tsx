import React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid2 for the layout
import { Typography } from '@mui/material';
import { PrimaryButton } from '@/components/Global/Global';
import { CircularProgress } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScoreDetails from './components/ScoreDetails';

import {
  Container,
  SubPanelContainer,
  ScoreDetailsPaper,
  CallsPaper,
  GenerationsPaper,
  ExtraDetailsPanelPaper,
  ButtonGroupContainer,
  PanelButton,
  BackButton,
  CustomListItem,
} from './FullCandidateJobProfile.styles';

import ExtraDetailsPanel from './components/ExtraDetailsPanel';

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
    <Container container spacing={2}>
      {/* Left Side - Score Details */}
      <Grid
        xs={12}
        md={8}
        container
        direction="column"
        spacing={2}
        height={'100%'}
        flexWrap={'nowrap'}
      >
        <Grid xs={12} height={'60vh'}>
          <Typography variant="h6">Score Details</Typography>
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
                <Typography variant="h5">
                  Click Calculate to get the match score
                </Typography>
                <PrimaryButton
                  variant="contained"
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
        direction="column"
        spacing={2}
        height={'100%'}
        flexWrap={'nowrap'}
        // justifyContent={'end'}
      >
        {/* Resume Panel */}
        <SubPanelContainer xs={12} height={'20vh'}>
          <Typography variant="h6">&nbsp;</Typography>
          <ExtraDetailsPanelPaper
            elevation={3}
            onClick={setModeToResume}
            style={{
              cursor: 'pointer',
            }}
          >
            <Typography variant="h4">Résumé</Typography>
          </ExtraDetailsPanelPaper>
        </SubPanelContainer>

        {/* Calls Panel */}
        <SubPanelContainer xs={12}>
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
                <Typography variant="h5" textAlign={'center'} marginTop={'1%'}>
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
        </SubPanelContainer>

        {/* Generations Panel */}
        <SubPanelContainer xs={12}>
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
                <Typography variant="h5" textAlign={'center'} marginTop={'1%'}>
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
        </SubPanelContainer>
      </Grid>
    </Container>
  );
};

export default FullCandidateJobProfile;
