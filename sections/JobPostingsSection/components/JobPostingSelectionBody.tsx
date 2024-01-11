import { FC, useEffect, useState } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useJobPostingsContext } from '@/context/JobPostingsContext';

//-- import components --//
import SelectionSummary from '@/components/PageStructure/SelectionSummary/SelectionSummary';
import SubSectionFrame from '@/components/Global/components/SubSectionFrame';
import FullJobPostingsOverview from '@/components/JobPostingsPage/FullJobPostingsOverview/FullJobPostingsOverview';
import FullCandidateJobProfile from '@/components/JobPostingsPage/FullCandidateJobProfile/FullCandidateJobProfile';
import GenerationEditor from '@/components/GenerationPage/GenerationEditor/GenerationEditor';
import TranscriptionNotes from '@/components/CallsPage/Transcription/TranscriptionNotes';
import ResumeIframe from '@/components/CandidatesPage/ResumeIframe';

//-- import api methods --//
import { calculateMatchScore } from '@/api/GenerationMethods';
import { get } from 'http';

const Container = styled(Grid)`
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 98px);
  max-height: calc(100vh - 98px);
  min-height: calc(100vh - 98px);
  display: flex;
  flex-direction: column;
  margin-left: 0.3%;
  background-color: white;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
  }
`;

const SubContainer = styled(Grid)`
  height: 100%;
  // width: 100%;
  margin: 0.75%;
  margin-top: 0;
  background-color: #f8f8ff;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #006d4b;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const JobPostingSelectionBody: FC = () => {
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useJobPostingsContext();
  const { listState, selectedListItem, bodyState } = state;

  const updateMode = (mode: string) => {
    bodyState.updateMode(mode);
  };

  const resetMainMode = () => {
    updateMode('overview');
  };

  const updateScoreDetailsMode = (mode: string) => {
    bodyState.updateSelectedCandidateScoreDetailsState(
      'selectedCandidateMode',
      mode
    );
  };

  const resetScoreDetailsMode = () => {
    updateScoreDetailsMode('overview');
  };

  const updateGenerationsPanelMode = (mode: string) => {
    bodyState.updateSelectedCandidateScoreDetailsState(
      'generationPanelMode',
      mode
    );
  };

  const updateCallsPanelMode = (mode: string) => {
    bodyState.updateSelectedCandidateScoreDetailsState('callPanelMode', mode);
  };

  const updateSelectedCandidate = (candidate: any) => {
    bodyState.updateCandidateRankingsState('selectedCandidate', candidate);
    updateMode('candidate');
  };

  const handleGenerationSelection = (generation: any) => {
    updateScoreDetailsMode('generation');
    bodyState.updateSelectedCandidateScoreDetailsState(
      'selectedGeneration',
      generation
    );
  };

  const handleCallSelection = (call: any) => {
    updateScoreDetailsMode('phoneCall');
    bodyState.updateSelectedCandidateScoreDetailsState('selectedCall', call);
  };

  const handleCalculate = async (candidateId) => {
    bodyState.updateCurrentlyCalculating(candidateId);

    const response = await calculateMatchScore(
      bodyState.candidateJobPostingsListState?.id,
      candidateId
    );

    if (response) {
      console.log('response', response);
      bodyState.updateCurrentlyCalculating(null);
      bodyState.updateSelectedCandidateScoreDetailsState(
        'refreshCandidate',
        !bodyState.selectedCandidateScoreDetailsState.refreshCandidate
      );
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error calculating match score');
      bodyState.updateCurrentlyCalculating(null);
    }
  };

  const checkPhoneCalls = () => {
    bodyState.candidateRankingsState?.selectedCandidate?.phone_calls;
    if (
      !bodyState.candidateRankingsState?.selectedCandidate?.phone_calls ||
      bodyState.candidateRankingsState?.selectedCandidate?.phone_calls
        .length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const getIntroCall = () => {
    if (!checkPhoneCalls()) return null;

    return bodyState.candidateRankingsState?.selectedCandidate?.phone_calls.find(
      (phoneCall) => phoneCall.call_type === 'intro'
    );
  };

  const getFollowUpCalls = () => {
    if (!checkPhoneCalls()) return null;

    return bodyState.candidateRankingsState?.selectedCandidate?.phone_calls.find(
      (phoneCall) => phoneCall?.call_type === 'follow_up' || null
    );
  };

  const isCurrentlyCalculating = () => {
    return bodyState?.currentlyCalculating !== null ? true : false;
  };

  const getSelectedCandidate = () => {
    return bodyState.candidateRankingsState.selectedCandidate;
  };

  const getGenerations = () => {
    return bodyState.candidateRankingsState?.selectedCandidate?.generations;
  };

  const getCallPanelMode = () => {
    return bodyState.selectedCandidateScoreDetailsState?.callPanelMode;
  };

  const getGenerationPanelMode = () => {
    return bodyState.selectedCandidateScoreDetailsState?.generationPanelMode;
  };

  const getMatchScore = () => {
    return bodyState.candidateRankingsState?.selectedCandidate?.match_score;
  };

  const getResumeUrl = () => {
    return bodyState.selectedCandidateScoreDetailsState?.resumeUrl;
  };

  const getScoreDetailsMode = () => {
    return bodyState.selectedCandidateScoreDetailsState?.selectedCandidateMode;
  };

  const getTranscriptionNotes = () => {
    bodyState.selectedCandidateScoreDetailsState?.selectedCall?.transcription
      ?.notes;
  };

  const getPhoneCalls = () => {
    return bodyState.candidateRankingsState?.selectedCandidate?.phone_calls;
  };

  const handleListFilterChange = (event) => {
    bodyState.updateCandidateRankingsState('listFilter', event.target.value);
  };

  const handleScoreFilterChange = (event) => {
    bodyState.updateCandidateRankingsState('scoreFilter', event.target.value);
  };

  const getCandidatesList = () => {
    switch (bodyState.candidateRankingsState.listFilter) {
      case 'rankings':
        return bodyState.candidateRankingsState.rankings;
      case 'all':
        return bodyState.candidateRankingsState.allCandidates;
      case 'unscored':
        return bodyState.candidateRankingsState.unscoredCandidates;
      default:
        return bodyState.candidateRankingsState.rankings;
    }
  };

  useEffect(() => {
    if (selectedListItem?.selectedCandidate) {
      const updatedCandidate = selectedListItem?.allCandidates.find(
        (candidate) => candidate.id === selectedListItem?.selectedCandidate?.id
      );
      bodyState.updateCandidateRankingsState(
        'selectedCandidate',
        updatedCandidate
      );
    }
  }, [selectedListItem?.allCandidates]);

  const renderCurrentJobPostingModeSection = () => {
    switch (bodyState.mode) {
      case 'overview':
        return (
          <FullJobPostingsOverview
            selectedJobPosting={selectedListItem}
            loadingId={selectedListItem.currentlyCalculating}
            candidatesList={getCandidatesList()}
            updateSelectedCandidate={updateSelectedCandidate}
            handleCalculate={handleCalculate}
            handleListFilterChange={handleListFilterChange}
            handleScoreFilterChange={handleScoreFilterChange}
          />
        );
      case 'candidate':
        switch (getScoreDetailsMode()) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Candidate Profile'}
                onClose={resetMainMode}
              >
                <FullCandidateJobProfile
                  page={'jobPosting'}
                  selectedJobPosting={selectedListItem}
                  selectedCandidate={getSelectedCandidate()}
                  phoneCalls={getPhoneCalls()}
                  introCall={getIntroCall()}
                  followUpCalls={getFollowUpCalls()}
                  generations={getGenerations()}
                  genMode={getGenerationPanelMode()}
                  callMode={getCallPanelMode()}
                  matchScore={getMatchScore()}
                  loading={isCurrentlyCalculating()}
                  updateSubSectionMode={updateScoreDetailsMode}
                  updateGenerationsPanelMode={updateGenerationsPanelMode}
                  updateCallsPanelMode={updateCallsPanelMode}
                  handleCalculate={handleCalculate}
                  handleGenerationSelection={handleGenerationSelection}
                  handleCallSelection={handleCallSelection}
                />
              </SubSectionFrame>
            );
          case 'generation':
            return (
              <SubSectionFrame
                subSectionHeader={'Generation'}
                onClose={resetScoreDetailsMode}
              >
                <GenerationEditor
                  contentData={bodyState.generationResultsState}
                  dispatch={dispatch}
                />
              </SubSectionFrame>
            );
          case 'phoneCall':
            return (
              <SubSectionFrame
                subSectionHeader={'Phone Call'}
                onClose={resetScoreDetailsMode}
              >
                <TranscriptionNotes
                  page={'jobPosting'}
                  transcriptionNotes={
                    bodyState.selectedCandidateScoreDetailsState?.selectedCall
                      ?.transcription?.notes
                  }
                />
              </SubSectionFrame>
            );

          case 'resume':
            return (
              <SubSectionFrame
                subSectionHeader={'Résumé Viewer'}
                onClose={resetScoreDetailsMode}
              >
                <ResumeIframe
                  resumeUrl={
                    bodyState.selectedCandidateScoreDetailsState?.resumeUrl
                  }
                />
              </SubSectionFrame>
            );

          default:
            return (
              <>
                <p>error</p>
              </>
            );
        }
    }
  };

  return (
    <Container>
      <SelectionSummary
        summaryDetails={bodyState.selectionSummaryState}
        checked={null}
        handleChange={null}
      />
      <SubContainer>
        {selectedListItem !== null && renderCurrentJobPostingModeSection()}
      </SubContainer>
    </Container>
  );
};

export default JobPostingSelectionBody;
