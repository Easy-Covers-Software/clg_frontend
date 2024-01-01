import { FC, useEffect, useState } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useJobPostingsContext } from '@/context/JobPostingsContext';

//-- import components --//
import SelectionSummary from '@/components/SelectionSummary/SelectionSummary';
import SubSectionFrame from '@/components/Global/components/SubSectionFrame';
import FullJobPostingsOverview from '@/components/JobPostings/FullJobPostingsOverview/FullJobPostingsOverview';
import FullCandidateJobProfile from '@/components/JobPostings/FullCandidateJobProfile/FullCandidateJobProfile';
import GenerationEditor from '@/components/GenerationEditor/GenerationEditor';
import TranscriptionNotes from '@/components/Transcription/TranscriptionNotes';
import ResumeIframe from '@/components/CandidateProfile/ResumeIframe';

//-- import api methods --//
import { JobPostingMethods, GenerationMethods } from '@/Utils/utils';
const { calculateMatchScore } = GenerationMethods;

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
  const {
    selectedJobPosting,
    selectionSummary,
    selectedJobPostingState,
    selectedJobPostingMode,
    generationResultsState,
    saveProps,
    downloadProps,
  } = state;

  const updateSelectedJobPostingMode = (mode: string) => {
    dispatch({
      type: 'SET_SELECTED_JOB_POSTING_MODE',
      payload: mode,
    });
  };

  const updateCandidateViewMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_MODE',
      payload: mode,
    });
  };

  const resetSelectedJobPostingMode = () => {
    updateSelectedJobPostingMode('overview');
  };

  const resetCandidateViewMode = () => {
    updateCandidateViewMode('overview');
  };

  const updateGenerationsPanelMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_GENERATIONS_PANEL_MODE',
      payload: mode,
    });
  };

  const updateCallsPanelMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_CALL_PANEL_MODE',
      payload: mode,
    });
  };

  const updateSelectedCandidate = (candidate: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE',
      payload: candidate,
    });
    dispatch({
      type: 'SET_SELECTED_JOB_POSTING_MODE',
      payload: 'candidate',
    });
  };

  const handleGenerationSelection = (generation: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_GENERATION',
      payload: generation,
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_MODE',
      payload: 'generation',
    });
  };

  const handleCallSelection = (call: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_PHONE_CALL',
      payload: call,
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_MODE',
      payload: 'phoneCall',
    });
  };

  const handleCalculate = async (candidateId) => {
    dispatch({
      type: 'UPDATE_CURRENTLY_CALCULATING',
      payload: candidateId,
    });

    const response = await calculateMatchScore(
      selectedJobPosting?.id,
      candidateId
    );

    if (response) {
      console.log('response', response);

      dispatch({
        type: 'UPDATE_CURRENTLY_CALCULATING',
        payload: '',
      });
      dispatch({
        type: 'REFRESH_CANDIDATES',
      });
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error calculating match score');
      dispatch({
        type: 'UPDATE_CURRENTLY_CALCULATING',
        payload: '',
      });
    }
  };

  const getIntroCall = () => {
    return (
      selectedJobPostingState?.selectedCandidate?.phone_calls.find(
        (phoneCall) => phoneCall.call_type === 'intro'
      ) || null
    );
  };

  const getFollowUpCalls = () => {
    return (
      selectedJobPostingState?.selectedCandidate?.phone_calls.filter(
        (phoneCall) => phoneCall.call_type !== 'intro'
      ) || null
    );
  };

  const isCurrentlyCalculating = () => {
    return selectedJobPostingState?.currentlyCalculating !== '' ? true : false;
  };

  const handleListFilterChange = (event) => {
    dispatch({
      type: 'UPDATE_LIST_FILTER',
      payload: event.target.value,
    });
  };

  const handleScoreFilterChange = (event) => {
    dispatch({
      type: 'UPDATE_SCORE_FILTER',
      payload: event.target.value,
    });
  };

  const getCandidatesList = () => {
    switch (selectedJobPostingState?.listFilter) {
      case 'rankings':
        return selectedJobPostingState?.rankings;
      case 'all':
        return selectedJobPostingState?.allCandidates;
      case 'unscored':
        return selectedJobPostingState?.unscoredCandidates;
      default:
        return selectedJobPostingState?.rankings;
    }
  };

  useEffect(() => {
    if (selectedJobPostingState?.selectedCandidate) {
      const updatedCandidate = selectedJobPostingState?.allCandidates.find(
        (candidate) =>
          candidate.id === selectedJobPostingState?.selectedCandidate?.id
      );

      dispatch({
        type: 'UPDATE_SELECTED_CANDIDATE',
        payload: updatedCandidate,
      });
    }
  }, [selectedJobPostingState?.allCandidates]);

  const renderCurrentJobPostingModeSection = () => {
    switch (selectedJobPostingMode) {
      case 'overview':
        return (
          <FullJobPostingsOverview
            selectedJobPosting={selectedJobPosting}
            candidatesList={getCandidatesList()}
            loadingId={selectedJobPostingState?.currentlyCalculating}
            updateSelectedCandidate={updateSelectedCandidate}
            handleCalculate={handleCalculate}
            handleListFilterChange={handleListFilterChange}
            handleScoreFilterChange={handleScoreFilterChange}
          />
        );
      case 'candidate':
        switch (selectedJobPostingState?.selectedCandidateMode) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Candidate Profile'}
                onClose={resetSelectedJobPostingMode}
              >
                <FullCandidateJobProfile
                  page={'jobPosting'}
                  selectedJobPosting={selectedJobPosting}
                  selectedCandidate={selectedJobPostingState?.selectedCandidate}
                  phoneCalls={
                    selectedJobPostingState?.selectedCandidate?.phone_calls
                  }
                  introCall={getIntroCall()}
                  followUpCalls={getFollowUpCalls()}
                  generations={
                    selectedJobPostingState?.selectedCandidate?.generations
                  }
                  genMode={selectedJobPostingState?.generationPanelMode}
                  callMode={selectedJobPostingState?.callPanelMode}
                  matchScore={
                    selectedJobPostingState?.selectedCandidate?.match_score
                  }
                  loading={isCurrentlyCalculating()}
                  updateSubSectionMode={updateCandidateViewMode}
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
                onClose={resetCandidateViewMode}
              >
                <GenerationEditor
                  contentData={generationResultsState}
                  saveProps={saveProps}
                  downloadProps={downloadProps}
                />
              </SubSectionFrame>
            );
          case 'phoneCall':
            return (
              <SubSectionFrame
                subSectionHeader={'Generation'}
                onClose={resetCandidateViewMode}
              >
                <TranscriptionNotes
                  page={'jobPosting'}
                  transcriptionNotes={
                    selectedJobPostingState?.selectedCall?.transcription?.notes
                  }
                />
              </SubSectionFrame>
            );

          case 'resume':
            return (
              <SubSectionFrame
                subSectionHeader={'Résumé Viewer'}
                onClose={resetCandidateViewMode}
              >
                <ResumeIframe resumeUrl={selectedJobPostingState?.resumeUrl} />
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
        summaryDetails={selectionSummary}
        checked={null}
        handleChange={null}
      />
      <SubContainer>
        {selectedJobPosting !== null && renderCurrentJobPostingModeSection()}
      </SubContainer>
    </Container>
  );
};

export default JobPostingSelectionBody;
