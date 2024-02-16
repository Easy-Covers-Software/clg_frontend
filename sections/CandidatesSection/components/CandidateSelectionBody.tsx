import { FC, useEffect } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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

// const Container = styled.div`
const Container = styled(Grid2)`
  width: 100%;
  padding: 0.2%;

  display: flex;
  flex-direction: column;
  gap: 0.2%;

  border-radius: 4px;
  border: 1px solid #006d4b;
  background-color: white;
`;

// const SubContainer = styled.div`
const SubContainer = styled(Grid2)`
  height: 100%;
  max-height: 78vh;
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
    bodyState.updateJobStatusState('selectedCandidateMode', mode);
  };

  const resetScoreDetailsMode = () => {
    updateScoreDetailsMode('overview');
  };

  const updateGenerationsPanelMode = (mode: string) => {
    bodyState.updateJobStatusState('generationPanelMode', mode);
  };

  const updateCallsPanelMode = (mode: string) => {
    bodyState.updateJobStatusState('callPanelMode', mode);
  };

  const updateSelectedJobPosting = (jobPosting: JobPostingListObject) => {
    bodyState.updateCandidateJobPostingsListState(
      'selectedJobPosting',
      jobPosting
    );
    updateMode('scoreDetails');
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
        bodyState.updateJobStatusState('resume', response.data);
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
    bodyState.updateJobStatusState('selectedGeneration', generation);
    updateScoreDetailsMode('generation');
  };

  const handleCallSelection = (call: PhoneCall) => {
    bodyState.updateJobStatusState('selectedCall', call);
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
    return bodyState.jobStatusState?.callPanelMode;
  };

  const getGenerationPanelMode = () => {
    return bodyState.jobStatusState?.generationPanelMode;
  };

  const getMatchScore = () => {
    return bodyState.candidateJobPostingsListState?.selectedJobPosting
      ?.match_score[0];
  };

  const getResumeUrl = () => {
    return selectedListItem?.resumes[0]?.file;
  };

  const getScoreDetailsMode = () => {
    return bodyState.jobStatusState?.selectedCandidateMode;
  };

  const getTranscriptionNotes = () => {
    return bodyState.jobStatusState?.selectedCall?.transcription?.notes;
  };

  //=** NEW **=//
  const handleDropdownPreferenceChange = (selection) => {
    bodyState.updateWorkPreferencesState(
      'selectedDropdownPreference',
      selection
    );
  };

  const handleUpdateCandDetailsPanelMode = (mode: string) => {
    bodyState.updateCandidateState('candidateDetailsMode', mode);
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
  }, [bodyState.candidateState.candidateDetailsMode]);

  useEffect(() => {
    if (bodyState.candidateState.currentJobsState.selectedJob !== null) {
      const updatedJobPosting = bodyState.candidateState?.jobs.find(
        (job) =>
          job.id === bodyState.candidateState.currentJobsState.selectedJob?.id
      );

      bodyState.updateCandidateJobPostingsListState(
        'selectedJobPosting',
        updatedJobPosting
      );
    }
  }, [bodyState.candidateState.currentJobsState.jobs]);

  //=== RENDER ===//
  const renderCurrentCandidateProfileModeSection = () => {
    switch (bodyState.mode) {
      case 'overview':
        return (
          <FullCandidateProfileOverview
            selectedCandidate={selectedListItem}
            jobPostings={bodyState.candidateState.jobs}
            resumeUrl={bodyState.jobStatusState?.resumeUrl}
            updateSelectedJobPosting={updateSelectedJobPosting}
            updateMode={updateMode}
            handleCalculate={handleCalculate}
            handleFileChange={handleFileChange}
            professionalDetails={bodyState.professionalDetailsState}
            updateProfessionalDetails={bodyState.updateProfessionalDetailsState}
            candidatePanelMode={bodyState.candidateState.candidateDetailsMode}
            handleDropdownPreferenceChange={handleDropdownPreferenceChange}
            jobLoadingId={bodyState?.currentlyCalculating}
            // NEW
            candidateState={handleUpdateCandDetailsPanelMode}
            updateCandDetailsPanelMode={bodyState.updateCandDetailsPanelMode}
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
      case 'calls':
        return <></>;
      case 'feedback':
        return <></>;
      case 'update':
        return <></>;

      case 'jobStatus':
        switch (getScoreDetailsMode()) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Job Status'}
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
                  // new
                  jobStatusState={bodyState.jobStatusState}
                  updateJobStatusState={bodyState.updateJobStatusState}
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
