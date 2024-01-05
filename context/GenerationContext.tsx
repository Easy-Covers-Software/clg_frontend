import { createContext, useContext, useReducer, useEffect, use } from 'react';

import { addPTags, addDivTag } from '@/Utils/utils';

import { fetchCandidateProfiles } from '@/api/CandidateProfileMethods';
import { fetchJobPostings } from '@/api/JobPostingsMethods';

const Context = createContext<any>({
  state: {},
  dispatch: () => null,
});

// const initialState: GenerationState = {
const initialState = {
  //=== Generation Setup State ==//
  generationSetupState: {
    mode: 'email', // email == true && cover letter == false
    candidateSelectionState: {
      candidates: [],
      filteredCandidates: [],
      candidateSearch: '',
      selectedCandidate: null,
    },
    jobPostingSelectionState: {
      jobPostings: [],
      filteredJobPostings: [],
      jobPostingSearch: '',
      selectedJobPosting: null,
    },
    additionalDetailsState: {
      emailGenerationSettings: {
        introductionStyle: '',
        interviewAvailability: '',
        referal: '',
        networkingPurpose: '',
        communicationStyle: '',
      },
      coverLetterGenerationSettings: {
        tone: '',
        experienceLevel: '',
        achievementEmphasis: '',
        teamCollabStyle: '',
      },
    },
    updateGenerationMode: (mode: string): void => {},
    updateCandidateSelectionState: (field: any, state: any): void => {},
    updateJobPostingSelectionState: (field: any, state: any): void => {},
    updateEmailGenerationSettings: (field: any, state: any): void => {},
    updateCoverLetterGenerationSettings: (field: any, state: any): void => {},
  },
  bodyState: {
    selectionSummaryState: {
      id: '',
      mainTitle: 'Job Title',
      secondaryTitle: 'Company Name',
      supplementaryInfo: '',
      loading: false,
    },
    generationResultsState: {
      id: '',
      content: null,
      contentHtml: '',
      editedContent: null,
      editedContentHtml: '',
      saveName: '',
      loading: false,
      isSavedDropdownOpen: false,
      disableSavedButton: true,
      isDownloadDropdownOpen: false,
      disableDownloads: true,
    },
    generationAdjustmentsState: {
      //== Simple Adjustments ==//
      simpleAdjustmentState: {
        disableSimpleAdjustment: true,
      },
      //== Intermediate Adjustments ==//
      intermediateAdjustmentState: {
        addSkillInput: '',
        insertKeywordInput: '',
        removeRedundancyInput: '',
        intermediateType: null,
        disableAddSkill: false,
        disableInsertKeyword: false,
        disableRemoveRedundancy: false,
        disableIntermediateAdjustment: true,
      },
      //== Custom Adjustments ==//
      customAdjustmentState: {
        customAdjustment: '',
        disableCustomAdjustment: true,
      },
      //== Adjustments Section ==//
      isAdjustmentsSectionExpanded: false,
    },
    updateSelectionSummaryState: (field: any, state: any): void => {},
    updateGenerationResultsState: (field: any, state: any): void => {},
    updateSimpleAdjustmentState: (field: any, state: any): void => {},
    updateIntermediateAdjustmentState: (field: any, state: any): void => {},
    updateCustomAdjustmentState: (field: any, state: any): void => {},
    toggleIsAdjustmentsSectionExpanded: (): void => {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    //== generationSetupState ==//
    case 'SET_GENERATION_SETUP_STATE':
      return {
        ...state,
        generationSetupState: action.payload,
      };
    case 'UPDATE_GENERATION_MODE':
      return {
        ...state,
        generationSetupState: {
          ...state.generationSetupState,
          mode: action.payload,
        },
      };
    case 'UPDATE_CANDIDATE_SELECTION_STATE':
      return {
        ...state,
        generationSetupState: {
          ...state.generationSetupState,
          candidateSelectionState: {
            ...state.generationSetupState.candidateSelectionState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_JOB_POSTING_SELECTION_STATE':
      return {
        ...state,
        generationSetupState: {
          ...state.generationSetupState,
          jobPostingSelectionState: {
            ...state.generationSetupState.jobPostingSelectionState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_EMAIL_GENERATION_SETTINGS':
      return {
        ...state,
        generationSetupState: {
          ...state.generationSetupState,
          additionalDetailsState: {
            ...state.generationSetupState.additionalDetailsState,
            emailGenerationSettings: {
              ...state.generationSetupState.additionalDetailsState
                .emailGenerationSettings,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_COVER_LETTER_GENERATION_SETTINGS':
      return {
        ...state,
        generationSetupState: {
          ...state.generationSetupState,
          additionalDetailsState: {
            ...state.generationSetupState.additionalDetailsState,
            coverLetterGenerationSettings: {
              ...state.generationSetupState.additionalDetailsState
                .coverLetterGenerationSettings,
              ...action.payload,
            },
          },
        },
      };

    //== bodyState ==//
    case 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE':
      return {
        ...state,
        bodyState: action.payload,
      };
    case 'UPDATE_GENERATION_SELECTION_SUMMARY_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          selectionSummaryState: {
            ...state.bodyState.selectionSummaryState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_GENERATION_RESULTS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          generationResultsState: {
            ...state.bodyState.generationResultsState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_SIMPLE_ADJUSTMENT_DISABLED':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          generationAdjustmentsState: {
            ...state.bodyState.generationAdjustmentsState,
            simpleAdjustmentState: {
              ...state.bodyState.generationAdjustmentsState
                .simpleAdjustmentState,
              disableSimpleAdjustment: action.payload,
            },
          },
        },
      };
    case 'UPDATE_INTERMEDIATE_ADJUSTMENT_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          generationAdjustmentsState: {
            ...state.bodyState.generationAdjustmentsState,
            intermediateAdjustmentState: {
              ...state.bodyState.generationAdjustmentsState
                .intermediateAdjustmentState,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_CUSTOM_ADJUSTMENT_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          generationAdjustmentsState: {
            ...state.bodyState.generationAdjustmentsState,
            customAdjustmentState: {
              ...state.bodyState.generationAdjustmentsState
                .customAdjustmentState,
              ...action.payload,
            },
          },
        },
      };
    case 'TOGGLE_IS_ADJUSTMENTS_SECTION_EXPANDED':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          generationAdjustmentsState: {
            ...state.bodyState.generationAdjustmentsState,
            isAdjustmentsSectionExpanded:
              !state.bodyState.generationAdjustmentsState
                .isAdjustmentsSectionExpanded,
          },
        },
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function GenerationContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getCandidateProfiles = async (): Promise<void> => {
      try {
        const response = await fetchCandidateProfiles();
        console.log('response ======*****', response);
        if (response.data) {
          // generationSetupState.updateCandidateSelectionState(
          //   'candidates',
          //   response.data
          // );
          // generationSetupState.updateCandidateSelectionState(
          //   'filteredCandidates',
          //   response.data
          // );
          dispatch({
            type: 'UPDATE_CANDIDATE_SELECTION_STATE',
            payload: {
              candidates: response.data,
              filteredCandidates: response.data,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getJobPostings = async (): Promise<void> => {
      try {
        const response = await fetchJobPostings();
        if (response) {
          dispatch({
            type: 'UPDATE_JOB_POSTING_SELECTION_STATE',
            payload: {
              jobPostings: response.data,
              filteredJobPostings: response.data,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getJobPostings();
    getCandidateProfiles();
  }, []);

  //=== generationSetupState ==//
  useEffect(() => {
    dispatch({
      type: 'SET_GENERATION_SETUP_STATE',
      payload: {
        mode: initialState.generationSetupState.mode,
        candidateSelectionState:
          initialState.generationSetupState.candidateSelectionState,
        jobPostingSelectionState:
          initialState.generationSetupState.jobPostingSelectionState,
        additionalDetailsState:
          initialState.generationSetupState.additionalDetailsState,
        updateGenerationMode: (mode: string): void => {
          dispatch({
            type: 'UPDATE_GENERATION_MODE',
            payload: mode,
          });
        },
        updateCandidateSelectionState: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_SELECTION_STATE',
            payload: { [field]: state },
          });
        },
        updateJobPostingSelectionState: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_JOB_POSTING_SELECTION_STATE',
            payload: { [field]: state },
          });
        },
        updateEmailGenerationSettings: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_EMAIL_GENERATION_SETTINGS',
            payload: { [field]: state },
          });
        },
        updateCoverLetterGenerationSettings: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_COVER_LETTER_GENERATION_SETTINGS',
            payload: { [field]: state },
          });
        },
      },
    });
  }, []);

  //=== bodyState ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE',
      payload: {
        selectionSummaryState: initialState.bodyState.selectionSummaryState,
        generationResultsState: initialState.bodyState.generationResultsState,
        generationAdjustmentsState:
          initialState.bodyState.generationAdjustmentsState,

        updateGenerationResultsState: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_STATE',
            payload: { [field]: state },
          });
        },
        updateSimpleAdjustmentState: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_SIMPLE_ADJUSTMENT_STATE',
            payload: { [field]: state },
          });
        },
        updateIntermediateAdjustmentState: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_INTERMEDIATE_ADJUSTMENT_STATE',
            payload: { [field]: state },
          });
        },
        updateCustomAdjustmentState: (field: any, state: any): void => {
          dispatch({
            type: 'UPDATE_CUSTOM_ADJUSTMENT_STATE',
            payload: { [field]: state },
          });
        },
        toggleIsAdjustmentsSectionExpanded: (): void => {
          dispatch({
            type: 'TOGGLE_IS_ADJUSTMENTS_SECTION_EXPANDED',
          });
        },
      },
    });
  }, []);

  useEffect(() => {
    if (state.bodyState?.generationResultsState?.content) {
      dispatch({
        type: 'UPDATE_GENERATION_RESULTS_STATE',
        payload: {
          contentHtml: addDivTag(
            addPTags(state.bodyState.generationResultsState.content)
          ),
        },
      });
    }
  }, [state.bodyState.generationResultsState.content]);

  //-- update selection summary --//
  useEffect(() => {
    if (state.generationSetupState.candidateSelectionState?.selectedCandidate) {
      dispatch({
        type: 'UPDATE_GENERATION_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle:
            state.generationSetupState.candidateSelectionState
              ?.selectedCandidate.name,
          secondaryTitle:
            state.generationSetupState.candidateSelectionState
              ?.selectedCandidate.current_title,
          supplementaryInfo:
            state.generationSetupState.candidateSelectionState
              ?.selectedCandidate.created_at,
        },
      });
    }
  }, [state.generationSetupState.candidateSelectionState?.selectedCandidate]);

  console.log('gen state', state);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGenerationContext = () => useContext(Context);
