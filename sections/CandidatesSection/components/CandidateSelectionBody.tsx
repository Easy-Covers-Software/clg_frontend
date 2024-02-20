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

import GeneralFeedback from '@/components/CandidatesPage/Feedback/GeneralFeedback/GeneralFeedback';

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
import SaveCandidateInfoForm from '@/components/CandidatesPage/SaveCandidateInfoForm/SaveCandidateInfoForm';

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
  height: 78vh;
  background-color: #f8f8ff;
  border: 1px solid #006d4b;
  border-radius: 4px;
  // overflow: scroll;
`;

const CandidateSelectionBody: FC = () => {
  //=== Context ===//
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state } = useCandidatesContext();
  const { listState, bodyState } = state;

  //=== Helpers ===//
  const updateMode = (mode: string) => {
    bodyState.updateMode(mode);
  };

  const resetMainMode = () => {
    updateMode('overview');
  };

  const updateJobStatusMode = (mode: string) => {
    bodyState.updateJobStatusState('mode', mode);
  };

  const resetJobStatusMode = () => {
    updateJobStatusMode('overview');
  };

  // const handleGenerationSelection = (generation: Generation) => {
  //   bodyState.updateJobStatusState('selectedGeneration', generation);
  //   updateScoreDetailsMode('generation');
  // };

  // const handleCallSelection = (call: PhoneCall) => {
  //   bodyState.updateJobStatusState('selectedCall', call);
  //   updateScoreDetailsMode('phoneCall');
  // };

  const getTranscriptionNotes = () => {
    if (
      bodyState.mode === 'calls' ||
      bodyState.jobStatusState.mode === 'calls'
    ) {
      return listState.selected?.transcription?.notes;
    }
    return bodyState.jobStatusState?.selectedCall?.transcription?.notes;
  };

  // TODO: need to change this
  const getResumes = (section) => {
    if (section === 'candidate') {
      if (bodyState.candidateState.resumeState.resumes.length === 0) {
        return false;
      }
      return bodyState.candidateState.resumeState.resumes;
    } else if (section === 'jobStatus') {
      if (bodyState.jobStatusState.resumeState.resumes.length === 0) {
        return false;
      }
      return bodyState.jobStatusState.resumeState.resumes;
    }
  };

  const getResumeUrl = () => {
    if (bodyState.mode === 'resume') {
      return listState.selected?.file;
    } else {
      const resumes = getResumes('candidate');
      if (resumes.length > 0) {
        return resumes[0].file;
      }
    }
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

  const updateSelectedJobPosting = (jobPosting: JobPostingListObject) => {
    bodyState.updateJobStatusState('selectedJob', jobPosting);
    updateMode('jobStatus');
  };

  const handleFileChange = async (file: File) => {
    if (!file) {
      return snackbar.updateSnackbar(true, 'error', 'No file selected');
    }

    try {
      const response: APIResponse<Resume> = await uploadResume(
        file,
        bodyState.candidateState.selectedCandidate?.id
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

  //=== API Methods ===//
  const handleCalculate = async (jobPostingId: string) => {
    bodyState.updateJobStatusState('currentlyCalculating', jobPostingId);

    const response: APIResponse<MatchScore> = await calculateMatchScore(
      jobPostingId,
      bodyState.candidateState.selectedCandidate?.id
    );

    if (response.data) {
      bodyState.updateJobStatusState('currentlyCalculating', '');
      bodyState.updateCurrentJobsState('selectedJob', response.data);
    } else {
      console.log('response');
      console.log(response);
      snackbar.updateSnackbar(
        true,
        'error',
        `Error: ${response.error.response.data}`
      );
      bodyState.updateJobStatusState('currentlyCalculating', '');
    }
  };

  //=== HOOKS ===//
  //==* The following 2 are used to update the job postings list once a calculation is complete *==//
  useEffect(() => {
    const getAllJobPostingsAssociatedWithCandidate = async (id: any) => {
      const response: APIResponse<CandidateJobPostingsWithScore> =
        await fetchJobPostingsAssociatedWithCandidate(id);
      if (response) {
        bodyState.updateCurrentJobsState('jobs', response.data);
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

      bodyState.updateJobStatusState('selectedJob', updatedJobPosting);
    }
  }, [bodyState.candidateState.currentJobsState.jobs]);

  //=== RENDER ===//
  const renderCurrentCandidateProfileModeSection = () => {
    switch (bodyState.mode) {
      case 'overview':
        return (
          <FullCandidateProfileOverview
            // why is this needed? (pretty sure some bug)
            resumeUrl={bodyState.jobStatusState?.resumeUrl}
            handleFileChange={handleFileChange}
            handleDropdownPreferenceChange={handleDropdownPreferenceChange}
            // NEW
            updateMode={updateMode}
            candidateState={bodyState.candidateState}
            handleUpdateCandDetailsPanelMode={handleUpdateCandDetailsPanelMode}
            updateCandDetailsPanelMode={handleUpdateCandDetailsPanelMode}
            updateSelectedJobPosting={updateSelectedJobPosting}
            updateProfessionalDetailsState={
              bodyState.updateProfessionalDetailsState
            }
            handleCalculate={handleCalculate}
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
        return (
          <SubSectionFrame
            subSectionHeader={'Call Notes'}
            onClose={resetMainMode}
          >
            <TranscriptionNotes
              page={'candidate'}
              transcriptionNotes={getTranscriptionNotes()}
            />
          </SubSectionFrame>
        );
      case 'feedback':
        return (
          <SubSectionFrame
            subSectionHeader={'General Feedback'}
            onClose={resetMainMode}
          >
            <GeneralFeedback
              feedback={bodyState.candidateState?.selectedCandidate?.feedback}
              updateFeedbackState={bodyState.updateFeedbackState}
              selectedFeedback={
                bodyState.candidateState.feedbackState?.selectedFeedback
              }
            />
          </SubSectionFrame>
        );
      case 'update':
        return (
          <SubSectionFrame
            subSectionHeader={'General Feedback'}
            onClose={resetMainMode}
          >
            <SaveCandidateInfoForm
              candidateId={''}
              candidateName={''}
              candidateNumber={''}
              jobPosting={''}
              updateSaveForm={() => {}}
              handleSaveCandidate={() => {}}
              reset={() => {}}
            />
          </SubSectionFrame>
        );

      case 'jobStatus':
        switch (bodyState.jobStatusState.mode) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Job Status'}
                onClose={resetMainMode}
              >
                <FullCandidateJobProfile
                  page={'candidate'}
                  jobStatusState={bodyState.jobStatusState}
                  updateJobStatusState={bodyState.updateJobStatusState}
                  handleCalculate={handleCalculate}
                />
              </SubSectionFrame>
            );
          case 'generation':
            return (
              <SubSectionFrame
                subSectionHeader={'Email Generations'}
                onClose={resetJobStatusMode}
              >
                <h1>hi</h1>
                {/* <GenerationEditor
                  contentData={bodyState.generationResultsState}
                /> */}
              </SubSectionFrame>
            );
          case 'calls':
            return (
              <SubSectionFrame
                subSectionHeader={'Call Notes'}
                onClose={resetJobStatusMode}
              >
                <TranscriptionNotes
                  page={'candidate'}
                  transcriptionNotes={getTranscriptionNotes()}
                />
              </SubSectionFrame>
            );

          case 'feedback':
            return (
              <SubSectionFrame
                subSectionHeader={'Job Status Feedback'}
                onClose={resetJobStatusMode}
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
                onClose={resetJobStatusMode}
              >
                <ResumeIframe
                  resumeUrl={bodyState.jobStatusState.selectedJob.resume.file}
                />
              </SubSectionFrame>
            );

          default:
            return (
              <SubSectionFrame
                subSectionHeader={''}
                onClose={resetJobStatusMode}
              >
                <></>
              </SubSectionFrame>
            );
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
        {bodyState.candidateState.selectedCandidate !== null &&
          renderCurrentCandidateProfileModeSection()}
      </SubContainer>
    </Container>
  );
};

export default CandidateSelectionBody;
