import { FC, useEffect } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useCandidatesContext } from '@/context/CandidatesContext';

//-- import components --//
import SelectionSummary from '@/components/SelectionSummary/SelectionSummary';
import FullCandidateProfileOverview from '@/components/CandidateProfile/FullCandidateProfileOverview/FullCandidateProfileOverview';
import ResumeIframe from '@/components/CandidateProfile/ResumeIframe';
import SubSectionFrame from '@/components/Global/components/SubSectionFrame';
import FullCandidateJobProfile from '@/components/JobPostings/FullCandidateJobProfile/FullCandidateJobProfile';
import GenerationEditor from '@/components/GenerationEditor/GenerationEditor';
import TranscriptionNotes from '@/components/Transcription/TranscriptionNotes';

//-- import api methods --//
import { GenerationMethods, CandidateProfileMethods } from '@/Utils/utils';
const { calculateMatchScore } = GenerationMethods;
const { fetchJobPostingsAssociatedWithCandidate } = CandidateProfileMethods;

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
  background-color: #f8f8ff;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #006d4b;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const CandidateSelectionBody: FC = () => {
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useCandidatesContext();
  const {
    savedCandidatesListState,
    selectedCandidateProfile,
    selectionSummary,
    resumeState,
    selectedCandidateMode,
    jobPostingsState,
    generationResultsState,
    saveProps,
    downloadProps,
  } = state;

  const updateSelectedCandidateMode = (mode: string) => {
    dispatch({
      type: 'SET_SELECTED_CANDIDATE_MODE',
      payload: mode,
    });
  };

  const resetSelectedCandidateMode = () => {
    updateSelectedCandidateMode('overview');
  };

  const resetJobPostingMode = () => {
    dispatch({
      type: 'UPDATE_JOB_POSTING_MODE',
      payload: 'overview',
    });
  };

  const updateSelectedJobPosting = (jobPosting: any) => {
    dispatch({
      type: 'SET_SELECTED_CANDIDATE_MODE',
      payload: 'jobPosting',
    });

    dispatch({
      type: 'UPDATE_SELECTED_JOB_POSTING',
      payload: jobPosting,
    });
  };

  const updateJobPostingMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_JOB_POSTING_MODE',
      payload: mode,
    });
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

  const handleGenerationSelection = (generation: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_GENERATION',
      payload: generation,
    });
    dispatch({
      type: 'UPDATE_JOB_POSTING_MODE',
      payload: 'generation',
    });
  };

  const handleCallSelection = (call: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_PHONE_CALL',
      payload: call,
    });
    dispatch({
      type: 'UPDATE_JOB_POSTING_MODE',
      payload: 'phoneCall',
    });
  };

  const handleCalculate = async (jobPostingId) => {
    dispatch({
      type: 'UPDATE_CURRENTLY_CALCULATING',
      payload: jobPostingId,
    });

    const response = await calculateMatchScore(
      jobPostingId,
      selectedCandidateProfile?.id
    );

    if (response) {
      console.log('response', response);

      dispatch({
        type: 'UPDATE_CURRENTLY_CALCULATING',
        payload: '',
      });
      dispatch({
        type: 'REFRESH_JOB_POSTINGS',
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
      selectedCandidateProfile?.phone_calls.find(
        (phoneCall) => phoneCall.call_type === 'intro'
      ) || null
    );
  };

  const getFollowUpCalls = () => {
    return (
      selectedCandidateProfile?.phone_calls.filter(
        (phoneCall) => phoneCall.call_type !== 'intro'
      ) || null
    );
  };

  const isCurrentlyCalculating = () => {
    return jobPostingsState?.currentlyCalculating !== '' ? true : false;
  };

  useEffect(() => {
    const getAllJobPostingsAssociatedWithCandidate = async (id: any) => {
      const response = await fetchJobPostingsAssociatedWithCandidate(id);
      if (response) {
        dispatch({
          type: 'UPDATE_JOB_POSTINGS',
          payload: response.data,
        });
      } else {
        snackbar.updateSnackbar(
          true,
          'Error fetching job postings associated with candidate',
          'error'
        );
      }
    };
    getAllJobPostingsAssociatedWithCandidate(
      savedCandidatesListState.selected?.id
    );
  }, [jobPostingsState.refreshJobPostings]);

  useEffect(() => {
    if (jobPostingsState?.selectedJobPosting !== null) {
      const updatedJobPosting = jobPostingsState?.jobPostings.find(
        (jobPosting) =>
          jobPosting.id === jobPostingsState?.selectedJobPosting?.id
      );

      dispatch({
        type: 'UPDATE_SELECTED_JOB_POSTING',
        payload: updatedJobPosting,
      });
    }
  }, [jobPostingsState.jobPostings]);

  const renderCurrentCandidateProfileModeSection = () => {
    switch (selectedCandidateMode) {
      case 'overview':
        return (
          <FullCandidateProfileOverview
            selectedCandidate={selectedCandidateProfile}
            jobPostings={jobPostingsState?.jobPostings}
            jobLoadingId={jobPostingsState?.currentlyCalculating}
            updateSelectedJobPosting={updateSelectedJobPosting}
            updateSelectedCandidateMode={updateSelectedCandidateMode}
            handleCalculate={handleCalculate}
          />
        );
      case 'resume':
        return (
          <SubSectionFrame
            subSectionHeader={'Résumé Viewer'}
            onClose={resetSelectedCandidateMode}
          >
            <ResumeIframe resumeUrl={resumeState?.pdfIframePath} />
          </SubSectionFrame>
        );
      case 'jobPosting':
        switch (jobPostingsState?.mode) {
          case 'overview':
            return (
              <SubSectionFrame
                subSectionHeader={'Candidate Score Details'}
                onClose={resetSelectedCandidateMode}
              >
                <FullCandidateJobProfile
                  page={'candidate'}
                  selectedJobPosting={jobPostingsState?.selectedJobPosting}
                  selectedCandidate={selectedCandidateProfile}
                  phoneCalls={selectedCandidateProfile?.phone_calls}
                  introCall={getIntroCall()}
                  followUpCalls={getFollowUpCalls()}
                  generations={selectedCandidateProfile?.generations}
                  genMode={jobPostingsState?.generationPanelMode}
                  callMode={jobPostingsState?.callPanelMode}
                  matchScore={jobPostingsState.selectedJobPosting?.match_score}
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
                  contentData={generationResultsState}
                  saveProps={saveProps}
                  downloadProps={downloadProps}
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
                    jobPostingsState.selectedPhoneCall?.transcription?.notes
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
                <ResumeIframe resumeUrl={jobPostingsState.resumeUrl} />
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
        summaryDetails={selectionSummary}
        checked={null}
        handleChange={null}
      />
      <SubContainer>
        {selectedCandidateProfile !== null &&
          renderCurrentCandidateProfileModeSection()}
      </SubContainer>
    </Container>
  );
};

export default CandidateSelectionBody;
