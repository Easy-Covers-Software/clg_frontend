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
import {
  Resume,
  MatchScore,
  CandidateJobPostingsWithScore,
} from '@/Types/CandidatesSection.types';
import { JobPostingListObject } from '@/Types/JobPostingsSection.types';
import { Generation } from '@/Types/Generation.types';
import { PhoneCall } from '@/Types/TranscriptionSection.types';

// const Container = styled(Grid)`
const Container = styled.div`
  width: 100%;
  padding: 0.2%;

  display: flex;
  flex-direction: column;
  gap: 0.2%;

  border-radius: 4px;
  border: 1px solid #006d4b;
  background-color: white;
`;

// const SubContainer = styled(Grid)`
const SubContainer = styled.div`
  height: 100%;
  background-color: #f8f8ff;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

const CandidateSelectionBody: FC = () => {
  //=== Context ===//
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state } = useCandidatesContext();
  const { listState, selectedListItem, bodyState } = state;

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

  const updateSelectedJobPosting = (jobPosting: JobPostingListObject) => {
    bodyState.updateCandidateJobPostingsListState(
      'selectedJobPosting',
      jobPosting
    );
    updateMode('jobPosting');
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

  const handleGenerationSelection = (generation: Generation) => {
    bodyState.updateSelectedCandidateScoreDetailsState(
      'selectedGeneration',
      generation
    );
    updateScoreDetailsMode('generation');
  };

  const handleCallSelection = (call: PhoneCall) => {
    bodyState.updateSelectedCandidateScoreDetailsState('selectedCall', call);
    updateScoreDetailsMode('phoneCall');
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

  const getSelectedJobPosting = () => {
    return bodyState.candidateJobPostingsListState?.selectedJobPosting;
  };

  const getCallPanelMode = () => {
    return bodyState.selectedCandidateScoreDetailsState?.callPanelMode;
  };

  const getGenerationPanelMode = () => {
    return bodyState.selectedCandidateScoreDetailsState?.generationPanelMode;
  };

  const getMatchScore = () => {
    return bodyState.candidateJobPostingsListState?.selectedJobPosting
      ?.match_score;
  };

  const getResumeUrl = () => {
    return bodyState.selectedCandidateScoreDetailsState?.resumeUrl;
  };

  const getScoreDetailsMode = () => {
    return bodyState.selectedCandidateScoreDetailsState?.selectedCandidateMode;
  };

  const getTranscriptionNotes = () => {
    return bodyState.selectedCandidateScoreDetailsState?.selectedCall
      ?.transcription?.notes;
  };

  //=== API Methods ===//
  const handleCalculate = async (jobPostingId: string) => {
    bodyState.updateCurrentlyCalculating(jobPostingId);

    const response: APIResponse<MatchScore> = await calculateMatchScore(
      jobPostingId,
      selectedListItem?.id
    );

    if (response.data) {
      bodyState.updateCurrentlyCalculating(null);
      listState.toggleRefresh();
    } else {
      console.log('response');
      console.log(response);
      snackbar.updateSnackbar(
        true,
        'error',
        `Error: ${response.error.response.data}`
      );
      bodyState.updateCurrentlyCalculating(null);
    }
  };

  //=== HOOKS ===//
  //==* The following 2 are used to update the job postings list once a calculation is complete *==//
  useEffect(() => {
    const getAllJobPostingsAssociatedWithCandidate = async (id: any) => {
      const response: APIResponse<CandidateJobPostingsWithScore> =
        await fetchJobPostingsAssociatedWithCandidate(id);
      if (response) {
        bodyState.updateCandidateJobPostingsListState(
          'jobPostings',
          response.data
        );
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

      bodyState.updateCandidateJobPostingsListState(
        'selectedJobPosting',
        updatedJobPosting
      );
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
            resumeUrl={bodyState.selectedCandidateScoreDetailsState?.resumeUrl}
            updateSelectedJobPosting={updateSelectedJobPosting}
            updateMode={updateMode}
            handleCalculate={handleCalculate}
            handleFileChange={handleFileChange}
          />
        );
      case 'resume':
        return (
          <SubSectionFrame
            subSectionHeader={'Résumé Viewer'}
            onClose={resetMainMode}
          >
            <ResumeIframe resumeUrl={getResumeUrl()} />
          </SubSectionFrame>
        );
      case 'jobPosting':
        switch (getScoreDetailsMode()) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Candidate Score Details'}
                onClose={resetMainMode}
              >
                <FullCandidateJobProfile
                  page={'candidate'}
                  selectedJobPosting={getSelectedJobPosting()}
                  selectedCandidate={selectedListItem}
                  phoneCalls={selectedListItem?.phone_calls}
                  generations={selectedListItem?.generations}
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
                />
              </SubSectionFrame>
            );
          case 'phoneCall':
            return (
              <SubSectionFrame
                subSectionHeader={'Call Notes'}
                onClose={resetScoreDetailsMode}
              >
                <TranscriptionNotes
                  page={'candidate'}
                  transcriptionNotes={getTranscriptionNotes()}
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
