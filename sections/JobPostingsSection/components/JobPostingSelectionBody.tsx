import { FC, useEffect, useState } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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

const Container = styled(Grid2)`
  height: 100%;
  width: 100%;
  padding: 0.2%;

  display: flex;
  flex-direction: column;
  gap: 0.2%;

  border-radius: 4px;
  border: 1px solid #006d4b;
  background-color: white;
  margin: 0;
  // overflow: scroll;
`;

const SubContainer = styled(Grid2)`
  height: 100%;
  width: 100%;
  max-height: 75vh;
  background-color: #f8f8ff;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

const JobPostingSelectionBody: FC = () => {
  //=== Context ===//
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useJobPostingsContext();
  const { selectedListItem, bodyState } = state;

  //=== Helpers ===//
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

  //= candidate rankings state =//
  const getPhoneCalls = () => {
    return bodyState.candidateRankingsState?.selectedCandidate?.phone_calls;
  };

  const getGenerations = () => {
    return bodyState.candidateRankingsState?.selectedCandidate?.generations;
  };

  const getScoreDetailsMode = () => {
    return bodyState.jobStatusState?.selectedCandidateMode;
  };

  const getMatchScore = () => {
    return bodyState.candidateRankingsState?.selectedCandidate?.match_score[0];
  };

  const isCurrentlyCalculating = () => {
    return bodyState?.currentlyCalculating !== null ? true : false;
  };

  const getSelectedCandidate = () => {
    return bodyState.candidateRankingsState.selectedCandidate;
  };

  //= candidate score details state =//
  const getResumeUrl = () => {
    return bodyState.jobStatusState?.resumeUrl;
  };

  const getCallPanelMode = () => {
    return bodyState.jobStatusState?.callPanelMode;
  };

  const getGenerationPanelMode = () => {
    return bodyState.jobStatusState?.generationPanelMode;
  };

  //= phone call mode =//
  const getSelectedCallNotes = () => {
    return bodyState.jobStatusState?.selectedCall?.transcription?.notes;
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

  //=== API Methods ===//
  const handleCalculate = async (candidateId) => {
    bodyState.updateCurrentlyCalculating(candidateId);

    const response: any = await calculateMatchScore(
      bodyState.candidateJobPostingsListState?.id,
      candidateId
    );

    if (response.data) {
      console.log('response', response);
      bodyState.updateCurrentlyCalculating(null);
      bodyState.updateSelectedCandidateScoreDetailsState(
        'refreshCandidate',
        !bodyState.jobStatusState.refreshCandidate
      );
    } else {
      snackbar.updateSnackbar(
        true,
        'error',
        `Error! ${response.error.response.data}`
      );
      bodyState.updateCurrentlyCalculating(null);
    }
  };

  //=== Hooks ===//
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
                  generations={getGenerations()}
                  loading={isCurrentlyCalculating()}
                  callMode={getCallPanelMode()}
                  genMode={getGenerationPanelMode()}
                  matchScore={getMatchScore()}
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
                  transcriptionNotes={getSelectedCallNotes()}
                />
              </SubSectionFrame>
            );

          case 'resume':
            return (
              <SubSectionFrame
                subSectionHeader={'Résumé Viewer'}
                onClose={resetScoreDetailsMode}
              >
                <ResumeIframe resumeUrl={getResumeUrl()} />
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
