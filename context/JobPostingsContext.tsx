import { createContext, useContext, useReducer, useEffect, use } from 'react';

import { addPTags, addDivTag } from '@/Utils/utils';

import { fetchJobPostings } from '@/api/JobPostingsMethods';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

import {
  JobPostingListObject,
  // JobPostingsContext,
  JobPostingsInitialState,
} from '@/Types/JobPostingsSection.types';
import { list } from 'postcss';

const JobPostingsContext = createContext<any>({
  state: {},
  dispatch: () => null,
});

const initialState: any = {
  listState: {
    listItems: [],
    filteredListItems: [],
    selected: null,
    search: '',
    loading: false,
    refresh: false,
    updateListItems: (list: any): void => {},
    updateFilteredListItems: (list: any): void => {},
    updateSelected: (id: any): void => {},
    updateSearch: (search: string): void => {},
    updateLoading: (loading: boolean): void => {},
    toggleRefresh: (): void => {},
    setFullJobPostingDetails: (jobPosting: any): void => {},
  },
  selectedListItem: null,
  bodyState: {
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
    currentlyCalculating: null,
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
    updateCurrentlyCalculating: (candidateId: any): void => {},
    updateSelectedCandidateScoreDetailsState: (field, state: any): void => {},
    updateGenerationResultsState: (field, state: any): void => {},
  },
};

const jobPostingsReducer = (state: any, action: any) => {
  switch (action.type) {
    //=== List State ===//
    case 'SET_JOB_POSTINGS_LIST_STATE':
      return {
        ...state,
        listState: action.payload,
      };
    case 'UPDATE_JOB_POSTINGS_LIST_STATE':
      return {
        ...state,
        listState: {
          ...state.listState,
          ...action.payload,
        },
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
    case 'REFRESH_JOB_POSTINGS_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          refresh: !state.listState.refresh,
        },
      };

    //=== Selected Full Details ===//
    case 'SET_SELECTED_JOB_POSTING_FULL_DETAILS':
      return {
        ...state,
        selectedListItem: action.payload,
      };

    //=== Selected Item Body Display State ===//
    case 'SET_SELECTED_JOB_POSTING_BODY_DISPLAY_STATE':
      return {
        ...state,
        bodyState: action.payload,
      };
    case 'UPDATE_JOB_POSTING_BODY_DISPLAY_MODE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          mode: action.payload,
        },
      };
    case 'UPDATE_JOB_POSTING_SELECTION_SUMMARY_STATE':
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
    case 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          candidateRankingsState: {
            ...state.bodyState.candidateRankingsState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_CURRENTLY_CALCULATING_CANDIDATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          currentlyCalculating: action.payload,
        },
      };
    case 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS':
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
    case 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE':
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

export const JobPostingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobPostingsReducer, initialState);

  const getJobPostings = async (): Promise<void> => {
    const response = await fetchJobPostings();
    if (response) {
      dispatch({
        type: 'UPDATE_JOB_POSTINGS_LIST_STATE',
        payload: {
          listItems: response.data,
          filteredListItems: response.data,
        }
      });
    } else {
      console.error('Error fetching job postings');
    }
  };

  useEffect(() => {
    getJobPostings();
  }, []);

  //-- update selection summary --//
  useEffect(() => {
    if (state.selectedListItem) {
      dispatch({
        type: 'UPDATE_JOB_POSTING_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle: state.selectedListItem.job_title,
          secondaryTitle: state.selectedListItem.company_name,
          supplementaryInfo: state.selectedListItem.created_at,
        },
      });
    }
  }, [state.selectedListItem]);

  //== List State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_JOB_POSTINGS_LIST_STATE',
      payload: {
        listItems: initialState.listState.listItems,
        filteredListItems: initialState.listState.filteredListItems,
        selected: initialState.listState.selected,
        search: initialState.listState.search,
        loading: initialState.listState.loading,
        refresh: initialState.listState.refresh,

        updateListItems: (list: any) => {
          dispatch({
            type: 'UPDATE_JOB_POSTINGS_LIST_STATE',
            payload: { listItems: list },
          });
        },
        updateFilteredListItems: (list: any) => {
          dispatch({
            type: 'UPDATE_JOB_POSTINGS_LIST_STATE',
            payload: { filteredListItems: list },
          });
        },
        updateSelected: (id: string) => {
          dispatch({
            type: 'UPDATE_JOB_POSTINGS_LIST_STATE',
            payload: { selected: id },
          });
        },
        updateSearch: (search: string) => {
          dispatch({
            type: 'UPDATE_JOB_POSTINGS_LIST_STATE',
            payload: { search: search },
          });
        },
        updateLoading: (tof: boolean) => {
          dispatch({
            type: 'UPDATE_JOB_POSTINGS_LIST_STATE',
            payload: { loading: tof },
          });
        },
        toggleRefresh: () => {
          dispatch({
            type: 'REFRESH_JOB_POSTINGS_LIST',
            payload: !state.listState.refresh,
          });
        },
        setFullJobPostingDetails: (jobPosting: any) => {
          dispatch({
            type: 'SET_SELECTED_JOB_POSTING_FULL_DETAILS',
            payload: jobPosting,
          });
        },
      },
    });
  }, []);

  //== Selected Item Body Display State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_JOB_POSTING_BODY_DISPLAY_STATE',
      payload: {
        mode: initialState.bodyState.mode,
        selectionSummaryState: initialState.bodyState.selectionSummaryState,
        candidateRankingsState: initialState.bodyState.candidateRankingsState,
        currentlyCalculating: initialState.bodyState.currentlyCalculating,
        selectedCandidateScoreDetailsState:
          initialState.bodyState.selectedCandidateScoreDetailsState,
        generationResultsState: initialState.bodyState.generationResultsState,
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
        updatecurrentlyCalculating: (candidateId: any) => {
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
      !state.bodyState.selectedCandidateScoreDetailsState?.selectedGeneration
    ) {
      return;
    }

    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
      payload: {
        id: state.bodyState.selectedCandidateScoreDetailsState
          .selectedGeneration?.id,
      },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
      payload: {
        content:
          state.bodyState.selectedCandidateScoreDetailsState.selectedGeneration
            ?.content,
      },
    });
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
      payload: {
        contentHtml: addDivTag(
          addPTags(
            state.bodyState.selectedCandidateScoreDetailsState
              .selectedGeneration?.content
          )
        ),
      },
    });
  }, [state.bodyState.selectedCandidateScoreDetailsState.selectedGeneration]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath =
        state.bodyState.candidateRankingsState.selectedCandidate.resume.file;
      const fullPath = `${DOMAIN}/${filePath}`;

      dispatch({
        type: 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS',
        payload: { resumeUrl: fullPath },
      });
    };

    if (state.bodyState.candidateRankingsState?.selectedCandidate?.resume) {
      updateResumeUrl();
    }
  }, [state.bodyState.candidateRankingsState.selectedCandidate]);

  //== Candidate Rankings ==//
  useEffect(() => {
    const updateRankings = async () => {
      const filteredCandidates =
        state.bodyState.candidateRankingsState.allCandidates.filter(
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
        state.bodyState.candidateRankingsState.allCandidates.filter(
          (candidate) => candidate.match_score === null
        );

      dispatch({
        type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
        payload: { unscoredCandidates: filteredCandidates },
      });
    };

    if (state.bodyState.candidateRankingsState.allCandidates?.length > 0) {
      updateRankings();
      updateUnscoredCandidates();
    }
  }, [state.bodyState.candidateRankingsState.allCandidates]);

  const value = { state, dispatch };
  console.log('job postings state', state);

  return (
    <JobPostingsContext.Provider value={value}>
      {children}
    </JobPostingsContext.Provider>
  );
};

export const useJobPostingsContext = () => useContext(JobPostingsContext);
