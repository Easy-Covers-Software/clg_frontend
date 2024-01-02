import { createContext, useContext, useReducer, useEffect, use } from 'react';

import { addPTags, addDivTag } from '@/Utils/utils';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const JobPostingsContext = createContext<any>({
  state: {},
  dispatch: () => null,
});

const initialState = {
  listState: {
    listItems: [],
    filteredListItems: [],
    selected: null,
    search: '',
    loading: false,
    refresh: false,
    updateListItems: (list: any): void => {},
    updateFilteredListItems: (list: any): void => {},
    updateSelected: (id: string): void => {},
    updateSearch: (search: string): void => {},
    updateLoading: (loading: boolean): void => {},
    toggleRefresh: (): void => {},
  },
  selectedListItemFullDetails: null,
  selectedItemBodyDisplayState: {
    mode: 'overview', // overview, candidate
    selectionSummaryState: {
      id: '',
      mainTitle: 'Job Title',
      secondaryTitle: 'Company Name',
      supplementaryInfo: '',
      loading: false,
    },
    candidateRankingsState: {
      allCandidates: [],
      selectedCandidate: null,
      rankings: [],
      unscoredCandidates: [],
      scoreFilter: 'rankings', // rankings, all, unscored
      listFilter: 'weighted', // weighted, total
      refreshCandidates: true,
    },
    currentlyCalculatingInOverviewMode: null,
    selectedCandidateScoreDetailsState: {
      selectedCandidateMode: 'overview', // overview, phoneCall, generation
      generationPanelMode: 'overview', // overview, emailSelection, coverLetterSelection
      callPanelMode: 'overview', // overview, followUpSelection
      selectedGeneration: null,
      selectedCall: null,
      loading: false,
      resumeUrl: '',
      refreshCandidates: true,
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

    updateMode: (mode: string): void => {},
    updateSelectionSummaryState: (field, state: any): void => {},
    updateCandidateRankingsState: (field, state: any): void => {},
    updateCurrentlyCalculatingInOverviewMode: (candidateId: any): void => {},
    updateSelectedCandidateScoreDetailsState: (field, state: any): void => {},
    updateGenerationResultsState: (field, state: any): void => {},
  },
};

const jobPostingsReducer = (state: any, action: any) => {
  switch (action.type) {
    //=== List State ===//
    case 'SET_SAVED_JOB_POSTINGS_LIST_STATE':
      return {
        ...state,
        listState: action.payload,
      };
    case 'UPDATE_JOB_POSTINGS_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          listItems: action.payload,
        },
      };
    case 'UPDATE_FILTERED_JOB_POSTINGS_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          filteredListItems: action.payload,
        },
      };
    case 'UPDATE_SELECTED_JOB_POSTING_LIST_STATE':
      return {
        ...state,
        listState: {
          ...state.listState,
          selected: action.payload,
        },
      };
    case 'UPDATE_JOB_POSTINGS_LIST_SEARCH':
      return {
        ...state,
        listState: {
          ...state.listState,
          search: action.payload,
        },
      };
    case 'UPDATE_LOADING_JOB_POSTINGS_LIST_LOADING':
      return {
        ...state,
        listState: {
          ...state.listState,
          loading: action.payload,
        },
      };
    case 'UPDATE_REFRESH_JOB_POSTINGS_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          refresh: action.payload,
        },
      };

    //=== Selected Full Details ===//
    case 'SET_SELECTED_JOB_POSTING_FULL_DETAILS':
      return {
        ...state,
        selectedListItemFullDetails: action.payload,
      };

    //=== Selected Item Body Display State ===//
    case 'SET_SELECTED_JOB_POSTING_BODY_DISPLAY_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: action.payload,
      };
    case 'UPDATE_JOB_POSTING_BODY_DISPLAY_MODE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          mode: action.payload,
        },
      };
    case 'UPDATE_JOB_POSTING_SELECTION_SUMMARY_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          selectionSummaryState: {
            ...state.selectedItemBodyDisplayState.selectionSummaryState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          candidateRankingsState: {
            ...state.selectedItemBodyDisplayState.candidateRankingsState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_CURRENTLY_CALCULATING_CANDIDATE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          currentlyCalculatingInOverviewMode: action.payload,
        },
      };
    case 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          selectedCandidateScoreDetailsState: {
            ...state.selectedItemBodyDisplayState
              .selectedCandidateScoreDetailsState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          generationResultsState: {
            ...state.selectedItemBodyDisplayState.generationResultsState,
            ...action.payload,
          },
        },
      };

    default:
      return state;
  }
};

export const JobPostingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobPostingsReducer, initialState);

  //== List State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SAVED_JOB_POSTINGS_LIST_STATE',
      payload: {
        listItems: initialState.listState.listItems,
        filteredListItems: initialState.listState.filteredListItems,
        selected: initialState.listState.selected,
        search: initialState.listState.search,
        loading: initialState.listState.loading,
        refresh: initialState.listState.refresh,

        updateListItems: (list: any) => {
          dispatch({
            type: 'UPDATE_JOB_POSTINGS_LIST',
            payload: list,
          });
        },
        updateFilteredListItems: (list: any) => {
          dispatch({
            type: 'UPDATE_FILTERED_JOB_POSTINGS_LIST',
            payload: list,
          });
        },
        updateSelected: (id: string) => {
          dispatch({
            type: 'UPDATE_SELECTED_JOB_POSTING_LIST_STATE',
            payload: id,
          });
        },
        updateSearch: (search: string) => {
          dispatch({
            type: 'UPDATE_JOB_POSTINGS_LIST_SEARCH',
            payload: search,
          });
        },
        updateLoading: (loading: boolean) => {
          dispatch({
            type: 'UPDATE_LOADING_JOB_POSTINGS_LIST_LOADING',
            payload: loading,
          });
        },
        toggleRefresh: () => {
          dispatch({
            type: 'UPDATE_REFRESH_JOB_POSTINGS_LIST',
            payload: !state.listState.refresh,
          });
        },
      },
    });
  }, []);

  // //== Selected Item Body Display State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_JOB_POSTING_BODY_DISPLAY_STATE',
      payload: {
        mode: initialState.selectedItemBodyDisplayState.mode,
        selectionSummaryState:
          initialState.selectedItemBodyDisplayState.selectionSummaryState,
        candidateRankingsState:
          initialState.selectedItemBodyDisplayState.candidateRankingsState,
        currentlyCalculatingInOverviewMode:
          initialState.selectedItemBodyDisplayState
            .currentlyCalculatingInOverviewMode,
        selectedCandidateScoreDetailsState:
          initialState.selectedItemBodyDisplayState
            .selectedCandidateScoreDetailsState,
        generationResultsState:
          initialState.selectedItemBodyDisplayState.generationResultsState,
        updateMode: (mode: string) => {
          dispatch({
            type: 'UPDATE_JOB_POSTING_BODY_DISPLAY_MODE',
            payload: mode,
          });
        },
        updateSelectionSummaryState: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_JOB_POSTING_SELECTION_SUMMARY_STATE',
            payload: { [field]: state },
          });
        },
        updateCandidateRankingsState: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
            payload: { [field]: state },
          });
        },
        updateCurrentlyCalculatingInOverviewMode: (candidateId: any) => {
          dispatch({
            type: 'UPDATE_CURRENTLY_CALCULATING_CANDIDATE',
            payload: candidateId,
          });
        },
        updateSelectedCandidateScoreDetailsState: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
            payload: { [field]: state },
          });
        },
        updateGenerationResultsState: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
            payload: { [field]: state },
          });
        },
      },
    });
  }, []);

  //== Generation selection ==//
  useEffect(() => {
    if (
      !state.selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
        ?.selectedGeneration
    ) {
      return;
    }

    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
      payload: {
        id: state.selectedItemBodyDisplayState
          .selectedCandidateScoreDetailsState.selectedGeneration?.id,
      },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
      payload: {
        content:
          state.selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
            .selectedGeneration?.content,
      },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
      payload: {
        contentHtml: addDivTag(
          addPTags(
            state.selectedItemBodyDisplayState
              .selectedCandidateScoreDetailsState.selectedGeneration?.content
          )
        ),
      },
    });
  }, [
    state.selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
      .selectedGeneration,
  ]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath =
        state.selectedItemBodyDisplayState.candidateRankingsState
          .selectedCandidate.resume.file;
      const fullPath = `${DOMAIN}/${filePath}`;

      dispatch({
        type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
        payload: { resumeUrl: fullPath },
      });
    };

    if (
      state.selectedItemBodyDisplayState.candidateRankingsState
        ?.selectedCandidate?.resume
    ) {
      updateResumeUrl();
    }
  }, [
    state.selectedItemBodyDisplayState.candidateRankingsState.selectedCandidate,
  ]);

  //== Candidate Rankings ==//
  useEffect(() => {
    const updateRankings = async () => {
      const filteredCandidates =
        state.selectedItemBodyDisplayState.candidateRankingsState.allCandidates.filter(
          (candidate) => candidate.match_score !== null
        );

      // Sort the filtered candidates by weighted_score, highest scores first
      const sortedCandidates = filteredCandidates.sort((a, b) => {
        // Assuming match_score.weighted_score is a number. Adjust if it's structured differently
        return b.match_score.weighted_score - a.match_score.weighted_score;
      });
      dispatch({
        type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
        payload: { rankings: sortedCandidates },
      });
    };

    const updateUnscoredCandidates = async () => {
      const filteredCandidates =
        state.selectedItemBodyDisplayState.candidateRankingsState.allCandidates.filter(
          (candidate) => candidate.match_score === null
        );

      dispatch({
        type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
        payload: { unscoredCandidates: filteredCandidates },
      });
    };

    if (
      state.selectedItemBodyDisplayState.candidateRankingsState.allCandidates
        ?.length > 0
    ) {
      updateRankings();
      updateUnscoredCandidates();
    }
  }, [state.selectedItemBodyDisplayState.candidateRankingsState.allCandidates]);

  const value = { state, dispatch };
  console.log('job postings state', state);

  return (
    <JobPostingsContext.Provider value={value}>
      {children}
    </JobPostingsContext.Provider>
  );
};

export const useJobPostingsContext = () => useContext(JobPostingsContext);
