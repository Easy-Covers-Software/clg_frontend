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
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useCandidatesContext();
  const {
    savedCandidatesListState,
    selectedCandidateProfile,
    jobPostingsState,
    selectionSummary,
    resumeState,
    selectedCandidateMode,
    generationResultsState,
    saveProps,
    downloadProps,

    listState,
    selectedListItemFullDetails,
    selectedItemBodyDisplayState,
  } = state;

  const updateSelectedCandidateMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE',
      payload: mode,
    });
  };

  const resetSelectedCandidateMode = () => {
    updateSelectedCandidateMode('overview');
  };

  const resetJobPostingMode = () => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { selectedCandidateMode: 'overview' },
    });
  };

  const updateSelectedJobPosting = (jobPosting: any) => {
    dispatch({
      type: 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE',
      payload: 'jobPosting',
    });

    dispatch({
      type: 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE',
      payload: { selectedJobPosting: jobPosting },
    });
  };

  const updateJobPostingMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { selectedCandidateMode: mode },
    });
  };

  const updateGenerationsPanelMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { generationPanelMode: mode },
    });
  };

  const updateCallsPanelMode = (mode: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { callPanelMode: mode },
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Call your uploadResume function here with necessary parameters
        const response = await uploadResume(
          file,
          selectedListItemFullDetails?.id
        );
        console.log('RESOINBSEE 321: ', response);

        // Check if the response includes data and no error
        if (response.data && !response.error) {
          // Handle successful upload
          console.log('Resume uploaded successfully', response.data);
          dispatch({
            type: 'UPDATE_RESUME_URL',
            payload: response.data.file,
          });
          dispatch({
            type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
            payload: { resumeUrl: file },
          });
          dispatch({
            type: 'UPDATE_PDF_IFRAME_PATH',
            payload: response.data.file,
          });
          // You can update the state or UI here as needed
        } else {
          // Handle error in response
          console.error('Error uploading resume', response.error);
          // Show error notification to the user or handle error
        }
      } catch (error) {
        // Handle any exceptions during the upload process
        console.error('Exception while uploading resume', error);
        // Show error notification to the user or handle error
      }
    }
  };

  const handleGenerationSelection = (generation: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { selectedGeneration: generation },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { selectedCandidateMode: 'generation' },
    });
  };

  const handleCallSelection = (call: any) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { selectedCall: call },
    });
    dispatch({
      type: 'UPDATE_JOB_POSTING_MODE',
      payload: 'phoneCall',
    });

    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { selectedCall: call },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
      payload: { selectedCandidateMode: 'phoneCall' },
    });
  };

  const handleCalculate = async (jobPostingId) => {
    dispatch({
      type: 'UPDATE_CURRENTLY_CALCULATING',
      payload: jobPostingId,
    });

    const response = await calculateMatchScore(
      jobPostingId,
      selectedListItemFullDetails?.id
    );

    if (response) {
      console.log('response', response);

      dispatch({
        type: 'UPDATE_CURRENTLY_CALCULATING',
        payload: null,
      });
      dispatch({
        type: 'REFRESH_CANDIDATES_LIST',
        // payload: {
        //   refreshCandidate:
        //     !selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
        //       .refreshJobPostings,
        // },
      });
      // dispatch({
      //   type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
      //   payload: {
      //     refreshCandidate:
      //       !selectedItemBodyDisplayState.candidateJobPostingsListState
      //         .refreshJobPostings,
      //   },
      // });
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error calculating match score');
      dispatch({
        type: 'UPDATE_CURRENTLY_CALCULATING',
        payload: null,
      });
    }
  };

  const getIntroCall = () => {
    return (
      selectedListItemFullDetails?.phone_calls.find(
        (phoneCall) => phoneCall.call_type === 'intro'
      ) || null
    );
  };

  const getFollowUpCalls = () => {
    return (
      selectedListItemFullDetails?.phone_calls.filter(
        (phoneCall) => phoneCall.call_type !== 'intro'
      ) || null
    );
  };

  const isCurrentlyCalculating = () => {
    return selectedItemBodyDisplayState?.currentlyCalculating !== null
      ? true
      : false;
  };

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
  }, [
    selectedItemBodyDisplayState.candidateJobPostingsListState
      .refreshJobPostings,
  ]);

  useEffect(() => {
    if (
      selectedItemBodyDisplayState.candidateJobPostingsListState
        ?.selectedJobPosting !== null
    ) {
      const updatedJobPosting =
        selectedItemBodyDisplayState.candidateJobPostingsListState?.jobPostings.find(
          (jobPosting) =>
            jobPosting.id ===
            selectedItemBodyDisplayState.candidateJobPostingsListState
              ?.selectedJobPosting?.id
        );

      dispatch({
        type: 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE',
        payload: { selectedJobPosting: updatedJobPosting },
      });
    }
  }, [selectedItemBodyDisplayState.candidateJobPostingsListState.jobPostings]);

  const renderCurrentCandidateProfileModeSection = () => {
    switch (selectedItemBodyDisplayState.mode) {
      case 'overview':
        return (
          <FullCandidateProfileOverview
            selectedCandidate={selectedListItemFullDetails}
            jobPostings={
              selectedItemBodyDisplayState.candidateJobPostingsListState
                .jobPostings
            }
            jobLoadingId={selectedItemBodyDisplayState?.currentlyCalculating}
            updateSelectedJobPosting={updateSelectedJobPosting}
            updateSelectedCandidateMode={updateSelectedCandidateMode}
            handleCalculate={handleCalculate}
            resumeUrl={
              selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
                ?.resumeUrl
            }
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
                selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
                  ?.resumeUrl
              }
            />
          </SubSectionFrame>
        );
      case 'jobPosting':
        switch (
          selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
            .selectedCandidateMode
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
                    selectedItemBodyDisplayState.candidateJobPostingsListState
                      ?.selectedJobPosting
                  }
                  selectedCandidate={selectedListItemFullDetails}
                  phoneCalls={selectedListItemFullDetails?.phone_calls}
                  introCall={getIntroCall()}
                  followUpCalls={getFollowUpCalls()}
                  generations={selectedListItemFullDetails?.generations}
                  genMode={
                    selectedItemBodyDisplayState
                      .selectedCandidateScoreDetailsState?.generationPanelMode
                  }
                  callMode={
                    selectedItemBodyDisplayState
                      .selectedCandidateScoreDetailsState?.callPanelMode
                  }
                  matchScore={
                    selectedItemBodyDisplayState.candidateJobPostingsListState
                      ?.selectedJobPosting?.match_score
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
                  contentData={
                    selectedItemBodyDisplayState.generationResultsState
                  }
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
                onClose={resetJobPostingMode}
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
            return <></>;
        }

      default:
        return <></>;
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
          renderCurrentCandidateProfileModeSection()}
      </SubContainer>
    </Container>
  );
};

export default CandidateSelectionBody;
