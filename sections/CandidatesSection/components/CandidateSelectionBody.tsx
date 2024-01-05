import { FC, useEffect } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useCandidatesContext } from '@/context/CandidatesContext';

//-- import components --//
import SelectionSummary from '@/components/PageStructure/SelectionSummary/SelectionSummary';
import FullCandidateProfileOverview from '@/components/CandidatesPage/FullCandidateProfileOverview/FullCandidateProfileOverview';
import ResumeIframe from '@/components/CandidatesPage/ResumeIframe';
import SubSectionFrame from '@/components/Global/components/SubSectionFrame';
import FullCandidateJobProfile from '@/components/JobPostingsPage/FullCandidateJobProfile/FullCandidateJobProfile';
import GenerationEditor from '@/components/GenerationPage/GenerationEditor/GenerationEditor';
import TranscriptionNotes from '@/components/CallsPage/Transcription/TranscriptionNotes';

//-- import api methods --//
import { calculateMatchScore } from '@/api/GenerationMethods';
import {
  fetchJobPostingsAssociatedWithCandidate,
  uploadResume,
} from '@/api/CandidateProfileMethods';

import { APIResponse } from '@/Types/Api.types';
import { Resume, MatchScore } from '@/Types/CandidatesSection.types';
import { JobPostingListObject } from '@/Types/JobPostingsSection.types';

// const Container = styled(Grid)`
const Container = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 98px);
  max-height: calc(100vh - 98px);
  min-height: calc(100vh - 98px);
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin-left: 0.3%;
  // padding-bottom: 2%;
  // padding: 2%;
  background-color: white;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
  }
`;

// const SubContainer = styled(Grid)`
const SubContainer = styled.div`
  height: 100%;
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

const CandidateSelectionBody: FC = () => {
  //=== Context ===//
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useCandidatesContext();
  const { listState, selectedListItem, bodyState } = state;

  //=== Helpers ===//
  const updateSelectedCandidateMode = (mode: string) => {
    bodyState.updateMode(mode);
  };

  const resetSelectedCandidateMode = () => {
    updateSelectedCandidateMode('overview');
  };

  const updateJobPostingMode = (mode: string) => {
    bodyState.updateSelectedCandidateScoreDetailsState(
      'selectedCandidateMode',
      mode
    );
  };

  const resetJobPostingMode = () => {
    updateJobPostingMode('overview');
  };

  const updateSelectedJobPosting = (jobPosting: JobPostingListObject) => {
    updateSelectedCandidateMode('jobPosting');
    bodyState.updateCandidateJobPostingsListState(
      'selectedJobPosting',
      jobPosting
    );
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

  const handleFileChange = async (file: File) => {
    if (!file) {
      return snackbar.updateSnackbar(true, 'error', 'No file selected');
    }

    try {
      const response: APIResponse<Resume> = await uploadResume(
        file,
        selectedListItem?.id
      );

      // Check if the response includes data and no error
      if (response.data) {
        bodyState.updateSelectedCandidateScoreDetailsState(
          'resume',
          response.data
        );
      } else {
        console.error('Error uploading resume', response.error);
        snackbar.updateSnackbar(true, 'error', 'Error uploading resume');
      }
    } catch (error) {
      console.error('Exception while uploading resume', error);
      snackbar.updateSnackbar(true, 'error', 'Error uploading resume');
    }
  };

  const handleGenerationSelection = (generation: any) => {
    bodyState.updateSelectedCandidateScoreDetailsState(
      'selectedGeneration',
      generation
    );
    updateJobPostingMode('generation');
  };

  const handleCallSelection = (call: any) => {
    bodyState.updateSelectedCandidateScoreDetailsState('selectedCall', call);
    updateJobPostingMode('phoneCall');
  };

  const checkPhoneCalls = () => {
    if (
      !selectedListItem?.phone_calls ||
      selectedListItem.phone_calls.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const getIntroCall = () => {
    if (!checkPhoneCalls()) return null;

    return selectedListItem?.phone_calls.find(
      (phoneCall) => phoneCall.call_type === 'intro'
    );
  };

  const getFollowUpCalls = () => {
    if (!checkPhoneCalls()) return null;

    return selectedListItem?.phone_calls.filter(
      (phoneCall) => phoneCall.call_type !== 'intro'
    );
  };

  const isCurrentlyCalculating = () => {
    return bodyState?.currentlyCalculating !== null ? true : false;
  };

  //=== API Methods ===//
  const handleCalculate = async (jobPostingId: string) => {
    bodyState.updateCurrentlyCalculating(jobPostingId);

    const response: APIResponse<MatchScore> = await calculateMatchScore(
      jobPostingId,
      selectedListItem?.id
    );

    if (response) {
      bodyState.updateCurrentlyCalculating(null);
      listState.toggleRefresh();
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error calculating match score');
      bodyState.updateCurrentlyCalculating(null);
    }
  };

  //=== HOOKS ===//
  //==* The following 2 are used to update the job postings list once a calculation is complete *==//
  useEffect(() => {
    const getAllJobPostingsAssociatedWithCandidate = async (id: any) => {
      const response = await fetchJobPostingsAssociatedWithCandidate(id);
      if (response) {
        dispatch({
          type: 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE',
          payload: { jobPostings: response.data },
        });
      } else {
        snackbar.updateSnackbar(
          true,
          'Error fetching job postings associated with candidate',
          'error'
        );
      }
    };
    getAllJobPostingsAssociatedWithCandidate(listState.selected?.id);
  }, [bodyState.candidateJobPostingsListState.refreshJobPostings]);

  useEffect(() => {
    if (bodyState.candidateJobPostingsListState?.selectedJobPosting !== null) {
      const updatedJobPosting =
        bodyState.candidateJobPostingsListState?.jobPostings.find(
          (jobPosting) =>
            jobPosting.id ===
            bodyState.candidateJobPostingsListState?.selectedJobPosting?.id
        );

      dispatch({
        type: 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE',
        payload: { selectedJobPosting: updatedJobPosting },
      });
    }
  }, [bodyState.candidateJobPostingsListState.jobPostings]);

  //=== RENDER ===//
  const renderCurrentCandidateProfileModeSection = () => {
    switch (bodyState.mode) {
      case 'overview':
        return (
          <FullCandidateProfileOverview
            selectedCandidate={selectedListItem}
            jobPostings={bodyState.candidateJobPostingsListState.jobPostings}
            jobLoadingId={bodyState?.currentlyCalculating}
            updateSelectedJobPosting={updateSelectedJobPosting}
            updateSelectedCandidateMode={updateSelectedCandidateMode}
            handleCalculate={handleCalculate}
            resumeUrl={bodyState.selectedCandidateScoreDetailsState?.resumeUrl}
            handleFileChange={handleFileChange}
          />
        );
      case 'resume':
        return (
          <SubSectionFrame
            subSectionHeader={'Résumé Viewer'}
            onClose={resetSelectedCandidateMode}
          >
            <ResumeIframe
              resumeUrl={
                bodyState.selectedCandidateScoreDetailsState?.resumeUrl
              }
            />
          </SubSectionFrame>
        );
      case 'jobPosting':
        switch (
          bodyState.selectedCandidateScoreDetailsState.selectedCandidateMode
        ) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Candidate Score Details'}
                onClose={resetSelectedCandidateMode}
              >
                <FullCandidateJobProfile
                  page={'candidate'}
                  selectedJobPosting={
                    bodyState.candidateJobPostingsListState?.selectedJobPosting
                  }
                  selectedCandidate={selectedListItem}
                  phoneCalls={selectedListItem?.phone_calls}
                  introCall={getIntroCall()}
                  followUpCalls={getFollowUpCalls()}
                  generations={selectedListItem?.generations}
                  genMode={
                    bodyState.selectedCandidateScoreDetailsState
                      ?.generationPanelMode
                  }
                  callMode={
                    bodyState.selectedCandidateScoreDetailsState?.callPanelMode
                  }
                  matchScore={
                    bodyState.candidateJobPostingsListState?.selectedJobPosting
                      ?.match_score
                  }
                  loading={isCurrentlyCalculating()}
                  updateSubSectionMode={updateJobPostingMode}
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
                onClose={resetJobPostingMode}
              >
                <GenerationEditor
                  contentData={bodyState.generationResultsState}
                />
              </SubSectionFrame>
            );
          case 'phoneCall':
            return (
              <SubSectionFrame
                subSectionHeader={'Call Notes'}
                onClose={resetJobPostingMode}
              >
                <TranscriptionNotes
                  page={'candidate'}
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
                onClose={resetJobPostingMode}
              >
                <ResumeIframe
                  resumeUrl={
                    bodyState.selectedCandidateScoreDetailsState?.resumeUrl
                  }
                />
              </SubSectionFrame>
            );

          default:
            return <></>;
        }

      default:
        return <></>;
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
        {selectedListItem !== null &&
          renderCurrentCandidateProfileModeSection()}
      </SubContainer>
    </Container>
  );
};

export default CandidateSelectionBody;
