import { createContext, useContext, useReducer, useEffect } from 'react';
import { addPTags, addDivTag } from '@/Utils/utils';

import { fetchCandidateProfiles } from '@/api/CandidateProfileMethods';

import {
  CandidatesContext,
  CandidateContextState,
} from '@/Types/CandidatesSection.types';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const initialState: CandidateContextState = {
  listState: {
    listItems: [],
    filteredListItems: [],
    selected: null,
    search: '',
    loading: false,
    refresh: false,
    updateListItems: (list: any): void => {},
    updateFilteredListItems: (list: any): void => {},
    updateSelected: (selected: any): void => {},
    updateSearch: (search: string): void => {},
    updateLoading: (loading: boolean): void => {},
    toggleRefresh: (): void => {},
    setFullCandidateProfile: (candidate: any): void => {},
  },
  selectedListItem: null,
  bodyState: {
    mode: 'overview', // overview, scoreDetails, resume, calls, feedback, update
    selectionSummaryState: {
      id: '',
      mainTitle: 'Job Title',
      secondaryTitle: 'Company Name',
      supplementaryInfo: '',
      loading: false,
    },

    // professionalDetailsState
    professionalDetailsState: {
      selectedExperience: null,
      selectedEducation: null,
    },

    candidateDetailsMode: 'professional', // professional, personal

    // personalDetailsState
    personalDetailsState: {},

    // jobPostingsAssociatedWithCandidateState
    candidateJobPostingsListState: {
      jobPostings: [],
      selectedJobPosting: null,
      refreshJobPostings: true,
      matchScores: [], // NOTE: might not need
    },

    // currently calculating job posting in overview mode
    currentlyCalculating: null,

    // candidateRankingsState
    selectedCandidateScoreDetailsState: {
      selectedCandidateMode: 'overview', // overview, phoneCall, generation
      generationPanelMode: 'overview', // overview, emailSelection, coverLetterSelection
      callPanelMode: 'overview', // overview, followUpSelection
      selectedGeneration: null,
      selectedCall: null,
      loading: false,
      resumeUrl: '',
      refreshJobPostings: true,
    },

    // generationResultsState
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

    updateMode: (mode: string): void => {},
    updateSelectionSummaryState: (field, state: any): void => {},
    updateCandidatePanelMode: (mode: string): void => {},
    updateProfessionalDetailsState: (field, state: any): void => {},
    updateCandidateJobPostingsListState: (field, state: any): void => {},
    updateCurrentlyCalculating: (candidateId: any): void => {},
    updateSelectedCandidateScoreDetailsState: (field, state: any): void => {},
    updateGenerationResultsState: (field, state: any): void => {},
    setFullCandidateProfile: (field, state: any): void => {},
  },
};

const CandidatesContext = createContext<CandidatesContext>({
  state: initialState,
  dispatch: () => null,
});

const candidatesReducer = (state: any, action: any) => {
  switch (action.type) {
    //=== List State --//
    case 'SET_CANDIDATE_LIST_STATE':
      return {
        ...state,
        listState: action.payload,
      };
    case 'UPDATE_CANDIDATE_LIST_STATE':
      return {
        ...state,
        listState: {
          ...state.listState,
          ...action.payload,
        },
      };

    //=== Selected Full Details --//
    case 'SET_SELECTED_CANDIDATE_PROFILE':
      return {
        ...state,
        selectedListItem: action.payload,
      };

    //=== Selected Item Body Display State --//
    case 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE':
      return {
        ...state,
        bodyState: action.payload,
      };
    case 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          mode: action.payload,
        },
      };
    case 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE':
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

    case 'UPDATE_CANDIDATE_PANEL_MODE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateDetailsMode: action.payload,
        },
      };

    case 'UPDATE_PROFESSIONAL_DETAILS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          professionalDetailsState: {
            ...state.bodyState.professionalDetailsState,
            ...action.payload,
          },
        },
      };

    case 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateJobPostingsListState: {
            ...state.bodyState.candidateJobPostingsListState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_CURRENTLY_CALCULATING':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          currentlyCalculating: action.payload,
        },
      };
    case 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          selectedCandidateScoreDetailsState: {
            ...state.bodyState.selectedCandidateScoreDetailsState,
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

    default:
      return state;
  }
};

export const CandidatesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(candidatesReducer, initialState);

  const getCandidateProfiles = async (): Promise<void> => {
    try {
      const response = await fetchCandidateProfiles();
      if (response) {
        dispatch({
          type: 'UPDATE_CANDIDATE_LIST_STATE',
          payload: {
            listItems: response.data,
            filteredListItems: response.data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidateProfiles();
  }, []);

  //=== Selection Summary State ===//
  useEffect(() => {
    if (state.selectedListItem) {
      dispatch({
        type: 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle: state.selectedListItem.name,
          secondaryTitle: `${state.selectedListItem.current_job_title} @${state.selectedListItem.current_employer}`,
          supplementaryInfo: state.selectedListItem.updated_at,
        },
      });
    }
  }, [state.selectedListItem]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath = state.selectedListItem.resume.file;
      const fullPath = `${DOMAIN}/${filePath}`;

      dispatch({
        type: 'UPDATE_RESUME_URL',
        payload: fullPath,
      });

      dispatch({
        type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
        payload: { resumeUrl: fullPath },
      });
    };

    // set selected eduction to first if exists
    if (state.selectedListItem && state.selectedListItem.education_history) {
      dispatch({
        type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
        payload: {
          selectedEducation: state.selectedListItem.education_history[0],
        },
      });
    }

    // set selected experience to first if exists
    if (state.selectedListItem && state.selectedListItem.employment_history) {
      dispatch({
        type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
        payload: {
          selectedExperience: state.selectedListItem.employment_history[0],
        },
      });
    }

    if (state.selectedListItem?.resume?.file) {
      updateResumeUrl();
    }
  }, [state.selectedListItem]);

  useEffect(() => {
    if (
      !state.bodyState.selectedCandidateScoreDetailsState?.selectedGeneration
    ) {
      return;
    }

    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_STATE',
      payload: {
        id: state.bodyState.selectedCandidateScoreDetailsState
          .selectedGeneration?.id,
        content:
          state.bodyState.selectedCandidateScoreDetailsState.selectedGeneration
            ?.content,
        contentHtml: addDivTag(
          addPTags(
            state.bodyState.selectedCandidateScoreDetailsState
              .selectedGeneration?.content
          )
        ),
      },
    });
  }, [state.bodyState.selectedCandidateScoreDetailsState.selectedGeneration]);

  //== List State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_CANDIDATE_LIST_STATE',
      payload: {
        listItems: [],
        filteredListItems: [],
        selected: null,
        search: '',
        loading: false,
        refresh: false,
        updateListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { listItems: list },
          });
        },
        updateFilteredListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { filteredListItems: list },
          });
        },
        updateSelected: (id: string): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { selected: id },
          });
        },
        updateSearch: (search: string): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { search: search },
          });
        },
        updateLoading: (loading: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { loading: loading },
          });
        },
        toggleRefresh: (): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_LIST_STATE',
            payload: { refresh: !state.listState.refresh },
          });
        },
        setFullCandidateProfile: (candidate: any): void => {
          dispatch({
            type: 'SET_SELECTED_CANDIDATE_PROFILE',
            payload: candidate,
          });
        },
      },
    });
  }, []);

  //== Selected Item Body Display State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE',
      payload: {
        mode: initialState.bodyState.mode,
        selectionSummaryState: initialState.bodyState.selectionSummaryState,
        professionalDetailsState:
          initialState.bodyState.professionalDetailsState,
        candidateDetailsMode: initialState.bodyState.candidateDetailsMode,
        candidateJobPostingsListState:
          initialState.bodyState.candidateJobPostingsListState,
        currentlyCalculating: initialState.bodyState.currentlyCalculating,
        selectedCandidateScoreDetailsState:
          initialState.bodyState.selectedCandidateScoreDetailsState,
        generationResultsState: initialState.bodyState.generationResultsState,
        updateMode: (mode: string): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE',
            payload: mode,
          });
        },
        updateSelectionSummaryState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE',
            payload: { [field]: state },
          });
        },
        updateCandidatePanelMode: (mode: string): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_PANEL_MODE',
            payload: mode,
          });
        },
        updateProfessionalDetailsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_PROFESSIONAL_DETAILS_STATE',
            payload: { [field]: state },
          });
        },
        updateCandidateJobPostingsListState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE',
            payload: { [field]: state },
          });
        },
        updateCurrentlyCalculating: (candidateId: any): void => {
          dispatch({
            type: 'UPDATE_CURRENTLY_CALCULATING',
            payload: candidateId,
          });
        },
        updateSelectedCandidateScoreDetailsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE',
            payload: { [field]: state },
          });
        },
        updateGenerationResultsState: (field, state: any): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_STATE',
            payload: { [field]: state },
          });
        },
      },
    });
  }, []);

  console.log('cand state', state);

  return (
    <CandidatesContext.Provider value={{ state, dispatch }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidatesContext = () => useContext(CandidatesContext);
