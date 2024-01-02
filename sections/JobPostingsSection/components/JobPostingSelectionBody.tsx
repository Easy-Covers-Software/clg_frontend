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

    listState,
    selectedListItemFullDetails,
    selectedItemBodyDisplayState,
  } = state;

  const updateSelectedJobPostingMode = (mode: string) => {
    // dispatch({
    //   type: 'SET_SELECTED_JOB_POSTING_MODE',
    //   payload: mode,
    // });
    dispatch({
      type: 'UPDATE_JOB_POSTING_BODY_DISPLAY_MODE',
      payload: mode,
    });
  };

  const updateCandidateViewMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      payload: { selectedCandidateMode: mode },
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
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      payload: { generationPanelMode: mode },
    });
  };

  const updateCallsPanelMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      payload: { callPanelMode: mode },
    });
  };

  const updateSelectedCandidate = (candidate: any) => {
    console.log('candidate', candidate);
    dispatch({
      type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
      payload: { selectedCandidate: candidate },
    });
    // dispatch({
    //   type: 'SET_SELECTED_JOB_POSTING_MODE',
    //   payload: 'candidate',
    // });
    dispatch({
      type: 'UPDATE_JOB_POSTING_BODY_DISPLAY_MODE',
      payload: 'candidate',
    });
  };

  const handleGenerationSelection = (generation: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      payload: { selectedGeneration: generation },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      payload: { selectedCandidateMode: 'generation' },
    });
  };

  const handleCallSelection = (call: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      payload: { selectedCall: call },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      payload: { selectedCandidateMode: 'phoneCall' },
    });
  };

  const handleCalculate = async (candidateId) => {
    dispatch({
      type: 'UPDATE_CURRENTLY_CALCULATING',
      payload: candidateId,
    });

    const response = await calculateMatchScore(
      selectedItemBodyDisplayState.candidateJobPostingsListState?.id,
      candidateId
    );

    if (response) {
      console.log('response', response);

      dispatch({
        type: 'UPDATE_CURRENTLY_CALCULATING_CANDIDATE',
        payload: '',
      });
      dispatch({
        type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
        payload: {
          refreshCandidate:
            !selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
              .refreshCandidate,
        },
      });
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error calculating match score');
      dispatch({
        type: 'UPDATE_CURRENTLY_CALCULATING_CANDIDATE',
        payload: null,
      });
    }
  };

  const getIntroCall = () => {
    return (
      selectedListItemFullDetails?.selectedCandidate?.phone_calls.find(
        (phoneCall) => phoneCall.call_type === 'intro'
      ) || null
    );
  };

  const getFollowUpCalls = () => {
    return (
      selectedListItemFullDetails?.selectedCandidate?.phone_calls.filter(
        (phoneCall) => phoneCall.call_type !== 'intro'
      ) || null
    );
  };

  const isCurrentlyCalculating = () => {
    return selectedItemBodyDisplayState?.currentlyCalculatingInOverviewMode !==
      null
      ? true
      : false;
  };

  const handleListFilterChange = (event) => {
    dispatch({
      type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
      payload: { listFilter: event.target.value },
    });
  };

  const handleScoreFilterChange = (event) => {
    dispatch({
      type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
      payload: { scoreFilter: event.target.value },
    });
  };

  const getCandidatesList = () => {
    switch (selectedItemBodyDisplayState.candidateRankingsState.listFilter) {
      case 'rankings':
        return selectedItemBodyDisplayState.candidateRankingsState.rankings;
      case 'all':
        return selectedItemBodyDisplayState.candidateRankingsState
          .allCandidates;
      case 'unscored':
        return selectedItemBodyDisplayState.candidateRankingsState
          .unscoredCandidates;
      default:
        return selectedItemBodyDisplayState.candidateRankingsState.rankings;
    }
  };

  useEffect(() => {
    if (selectedListItemFullDetails?.selectedCandidate) {
      const updatedCandidate = selectedListItemFullDetails?.allCandidates.find(
        (candidate) =>
          candidate.id === selectedListItemFullDetails?.selectedCandidate?.id
      );

      // dispatch({
      //   type: 'UPDATE_SELECTED_CANDIDATE',
      //   payload: updatedCandidate,
      // });
      dispatch({
        type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
        payload: { selectedCandidate: updatedCandidate },
      });
    }
  }, [selectedListItemFullDetails?.allCandidates]);

  const renderCurrentJobPostingModeSection = () => {
    switch (selectedItemBodyDisplayState.mode) {
      case 'overview':
        return (
          <FullJobPostingsOverview
            selectedJobPosting={selectedListItemFullDetails}
            candidatesList={getCandidatesList()}
            loadingId={
              selectedListItemFullDetails.currentlyCalculatingInOverviewMode
            }
            updateSelectedCandidate={updateSelectedCandidate}
            handleCalculate={handleCalculate}
            handleListFilterChange={handleListFilterChange}
            handleScoreFilterChange={handleScoreFilterChange}
          />
        );
      case 'candidate':
        switch (
          selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
            .selectedCandidateMode
        ) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Candidate Profile'}
                onClose={resetSelectedJobPostingMode}
              >
                <FullCandidateJobProfile
                  page={'jobPosting'}
                  selectedJobPosting={selectedListItemFullDetails}
                  selectedCandidate={
                    selectedItemBodyDisplayState.candidateRankingsState
                      .selectedCandidate
                  }
                  phoneCalls={
                    selectedItemBodyDisplayState.candidateRankingsState
                      ?.selectedCandidate?.phone_calls
                  }
                  introCall={getIntroCall()}
                  followUpCalls={getFollowUpCalls()}
                  generations={
                    selectedItemBodyDisplayState.candidateRankingsState
                      ?.selectedCandidate?.generations
                  }
                  genMode={
                    selectedItemBodyDisplayState
                      .selectedCandidateScoreDetailsState.generationPanelMode
                  }
                  callMode={
                    selectedItemBodyDisplayState
                      .selectedCandidateScoreDetailsState.callPanelMode
                  }
                  matchScore={
                    selectedItemBodyDisplayState.candidateRankingsState
                      .selectedCandidate?.match_score
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
                  contentData={
                    selectedItemBodyDisplayState.generationResultsState
                  }
                  dispatch={dispatch}
                  saveProps={saveProps}
                  downloadProps={downloadProps}
                />
              </SubSectionFrame>
            );
          case 'phoneCall':
            return (
              <SubSectionFrame
                subSectionHeader={'Phone Call'}
                onClose={resetCandidateViewMode}
              >
                <TranscriptionNotes
                  page={'jobPosting'}
                  transcriptionNotes={
                    selectedItemBodyDisplayState
                      .selectedCandidateScoreDetailsState?.selectedCall
                      ?.transcription?.notes
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
                <ResumeIframe
                  resumeUrl={
                    selectedItemBodyDisplayState
                      .selectedCandidateScoreDetailsState?.resumeUrl
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
        summaryDetails={selectedItemBodyDisplayState.selectionSummaryState}
        checked={null}
        handleChange={null}
      />
      <SubContainer>
        {selectedListItemFullDetails !== null &&
          renderCurrentJobPostingModeSection()}
      </SubContainer>
    </Container>
  );
};

export default JobPostingSelectionBody;
