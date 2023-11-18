import { createContext, useContext, useReducer, useEffect, use } from 'react';
import { Helpers, CandidateProfileMethods } from '@/Utils/utils';
const { fetchFullCandidateProfile, fetchCandidatesResume } =
  CandidateProfileMethods;

const { addPTags, addDivTag } = Helpers;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const JobPostingsContext = createContext<any>({
  state: {},
  dispatch: () => null,
});

const initialState = {
  savedJobPostingsListState: {
    savedItems: [],
    filteredItems: [],
    selected: null,
    search: '',
    loading: false,
  },
  selectedJobPosting: null,
  selectionSummary: {
    id: '',
    mainTitle: 'Job Title',
    secondaryTitle: 'Company Name',
    supplementaryInfo: '',
    loading: false,
    updateMainTitle: (title: string): void => {},
    updateSecondaryTitle: (title: string): void => {},
    updateSupplementalInfo: (info: number): void => {},
    toggleLoading: (): void => {},
  },
  selectedJobPostingState: {
    allCandidates: [],
    selectedCandidate: null,
    rankings: [],
    unscoredCandidates: [],
    currentlyCalculating: '',
    selectedCandidateMode: 'overview', // overview, phoneCall, generation
    generationPanelMode: 'overview', // overview, emailSelection, coverLetterSelection
    callPanelMode: 'overview', // overview, followUpSelection
    selectedGeneration: null,
    selectedCall: null,
    loading: false,
    resumeUrl: '',
    scoreFilter: 'rankings', // rankings, all, unscored
    listFilter: 'weighted', // weighted, total
    refreshCandidates: true,
  },
  selectedJobPostingMode: 'overview', // overview, candidate

  //=== Generation Results State ==//
  generationResultsState: {
    id: '',
    content: null,
    contentHtml: '',
    editedContent: null,
    editedContentHtml: '',
    saveName: '',
    loading: false,
    updateId: (id: string): void => {},
    updateContent: (content: string): void => {},
    updateContentHtml: (contentHtml: string): void => {},
    updateEditedContent: (editedContent: string): void => {},
    updateEditedContentHtml: (editedContentHtml: string): void => {},
    toggleLoading: (): void => {},
  },

  //== Save ==//
  saveProps: {
    isSavedDropdownOpen: false,
    disableSavedButton: true,
    toggleIsSavedDropdownOpen: (): void => {},
    toggleDisableSavedButton: (): void => {},
  },
  //== Download ==//
  downloadProps: {
    isDownloadDropdownOpen: false,
    disableDownloads: true,
    toggleIsDownloadDropdownOpen: (): void => {},
    toggleDisableDownloads: (): void => {},
  },
};

const jobPostingsReducer = (state: any, action: any) => {
  switch (action.type) {
    //-- list state --//
    case 'SET_SAVED_JOB_POSTINGS_LIST_STATE':
      return {
        ...state,
        savedJobPostingsListState: action.payload,
      };
    case 'UPDATE_SAVED_JOB_POSTINGS_LIST':
      return {
        ...state,
        savedJobPostingsListState: {
          ...state.savedJobPostingsListState,
          savedJobPostingsList: action.payload,
        },
      };
    case 'UPDATE_FILTERED_SAVED_JOB_POSTINGS_LIST':
      return {
        ...state,
        savedJobPostingsListState: {
          ...state.savedJobPostingsListState,
          filteredItems: action.payload,
        },
      };
    case 'UPDATE_SELECTED':
      return {
        ...state,
        savedJobPostingsListState: {
          ...state.savedJobPostingsListState,
          selected: action.payload,
        },
      };
    case 'UPDATE_SEARCH_VALUE':
      return {
        ...state,
        savedJobPostingsListState: {
          ...state.savedJobPostingsListState,
          search: action.payload,
        },
      };
    case 'UPDATE_LOADING':
      return {
        ...state,
        savedJobPostingsListState: {
          ...state.savedJobPostingsListState,
          loading: action.payload,
        },
      };

    //-- selected candidate state --//
    case 'SET_SELECTED_JOB_POSTING':
      return {
        ...state,
        selectedJobPosting: action.payload,
      };

    //-- selection summary state --//
    case 'SET_SELECTION_SUMMARY':
      return {
        ...state,
        selectionSummary: action.payload,
      };
    case 'UPDATE_SUMMARY_ID':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          id: action.payload,
        },
      };
    case 'UPDATE_SUMMARY_MAIN_TITLE':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          mainTitle: action.payload,
        },
      };
    case 'UPDATE_SUMMARY_SECONDARY_TITLE':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          secondaryTitle: action.payload,
        },
      };
    case 'UPDATE_SUMMARY_SUPPLEMENTARY_INFO':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          supplementaryInfo: action.payload,
        },
      };
    case 'UPDATE_SUMMARY_LOADING':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          loading: action.payload,
        },
      };

    //-- selected job posting mode state --//
    case 'SET_SELECTED_JOB_POSTING_MODE':
      return {
        ...state,
        selectedJobPostingMode: action.payload,
      };
    case 'UPDATE_RANKINGS':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          rankings: action.payload,
        },
      };
    case 'UPDATE_CURRENTLY_CALCULATING':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          currentlyCalculating: action.payload,
        },
      };
    case 'UPDATE_SELECTED_CANDIDATE_MODE':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          selectedCandidateMode: action.payload,
        },
      };
    case 'UPDATE_SELECTED_CANDIDATE':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          selectedCandidate: action.payload,
        },
      };
    case 'UPDATE_RANKINGS_LOADING':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          loading: action.payload,
        },
      };
    case 'UPDATE_ALL_CANDIDATES':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          allCandidates: action.payload,
        },
      };
    case 'UPDATE_SELECTED_GENERATION':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          selectedGeneration: action.payload,
        },
      };
    case 'UPDATE_SELECTED_PHONE_CALL':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          selectedCall: action.payload,
        },
      };
    case 'UPDATE_GENERATIONS_PANEL_MODE':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          generationPanelMode: action.payload,
        },
      };
    case 'UPDATE_CALL_PANEL_MODE':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          callPanelMode: action.payload,
        },
      };
    case 'UPDATE_RESUME_URL':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          resumeUrl: action.payload,
        },
      };
    case 'UPDATE_SCORE_FILTER':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          scoreFilter: action.payload,
        },
      };
    case 'UPDATE_LIST_FILTER':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          listFilter: action.payload,
        },
      };
    case 'REFRESH_CANDIDATES':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          refreshCandidates: !state.selectedJobPostingState.refreshCandidates,
        },
      };
    case 'UPDATE_UNSCORED_CANDIDATES':
      return {
        ...state,
        selectedJobPostingState: {
          ...state.selectedJobPostingState,
          unscoredCandidates: action.payload,
        },
      };

    //-- selected job posting mode --//
    case 'SET_SELECTED_JOB_POSTING_MODE':
      return {
        ...state,
        selectedJobPostingMode: action.payload,
      };

    //=== Generation Results State ==//
    case 'SET_GENERATION_RESULTS_STATE':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          ...action.payload,
        },
      };
    case 'UPDATE_GENERATION_RESULTS_ID':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          id: action.payload,
        },
      };
    case 'UPDATE_GENERATION_RESULTS_CONTENT':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          content: action.payload,
        },
      };
    case 'UPDATE_GENERATION_RESULTS_CONTENT_HTML':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          contentHtml: action.payload,
        },
      };
    case 'UPDATE_GENERATION_RESULTS_EDITED_CONTENT':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          editedContent: action.payload,
        },
      };
    case 'UPDATE_GENERATION_RESULTS_EDITED_CONTENT_HTML':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          editedContentHtml: action.payload,
        },
      };
    case 'UPDATE_GENERATION_RESULTS_SAVE_NAME':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          saveName: action.payload,
        },
      };
    case 'TOGGLE_GENERATION_RESULTS_LOADING':
      return {
        ...state,
        generationResultsState: {
          ...state.generationResultsState,
          loading: !state.generationResultsState.loading,
        },
      };

    //== Save ==//
    case 'SET_SAVE_PROPS':
      return {
        ...state,
        saveProps: {
          ...state.saveProps,
          ...action.payload,
        },
      };
    case 'TOGGLE_IS_SAVED_DROPDOWN_OPEN':
      return {
        ...state,
        saveProps: {
          ...state.saveProps,
          isSavedDropdownOpen: !state.saveProps.isSavedDropdownOpen,
        },
      };
    case 'TOGGLE_DISABLE_SAVED_BUTTON':
      return {
        ...state,
        saveProps: {
          ...state.saveProps,
          disableSavedButton: !state.saveProps.disableSavedButton,
        },
      };

    //== Download ==//
    case 'SET_DOWNLOAD_PROPS':
      return {
        ...state,
        downloadProps: {
          ...state.downloadProps,
          ...action.payload,
        },
      };
    case 'TOGGLE_IS_DOWNLOAD_DROPDOWN_OPEN':
      return {
        ...state,
        downloadProps: {
          ...state.downloadProps,
          isDownloadDropdownOpen: !state.downloadProps.isDownloadDropdownOpen,
        },
      };
    case 'TOGGLE_DISABLE_DOWNLOADS':
      return {
        ...state,
        downloadProps: {
          ...state.downloadProps,
          disableDownloads: !state.downloadProps.disableDownloads,
        },
      };

    default:
      return state;
  }
};

export const JobPostingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobPostingsReducer, initialState);

  //-- update selection summary --//
  useEffect(() => {
    if (state.selectedJobPosting) {
      dispatch({
        type: 'UPDATE_SUMMARY_MAIN_TITLE',
        payload: state.selectedJobPosting.job_title,
      });
      dispatch({
        type: 'UPDATE_SUMMARY_SECONDARY_TITLE',
        payload: state.selectedJobPosting.company_name,
      });
      dispatch({
        type: 'UPDATE_SUMMARY_SUPPLEMENTARY_INFO',
        payload: state.selectedJobPosting.created_at,
      });
    }

    // if (state.selectedJobPosting) {
    //   getAllCandidatesAssociatedToJobPosting();
    // }
  }, [state.selectedJobPosting]);

  const value = { state, dispatch };
  console.log('job postings state');
  console.log(state);

  //-- update generation results state --//
  useEffect(() => {
    dispatch({
      type: 'SET_GENERATION_RESULTS_STATE',
      payload: {
        updateId: (id: string): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_ID',
            payload: id,
          });
        },
        updateContent: (content: string): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_CONTENT',
            payload: content,
          });
        },
        updateContentHtml: (contentHtml: string): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_CONTENT_HTML',
            payload: contentHtml,
          });
        },
        updateEditedContent: (editedContent: string): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_EDITED_CONTENT',
            payload: editedContent,
          });
        },
        updateEditedContentHtml: (editedContentHtml: string): void => {
          dispatch({
            type: 'UPDATE_GENERATION_RESULTS_EDITED_CONTENT_HTML',
            payload: editedContentHtml,
          });
        },
        toggleLoading: (): void => {
          dispatch({
            type: 'TOGGLE_GENERATION_RESULTS_LOADING',
          });
        },
      },
    });
  }, []);

  //== Save ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SAVE_PROPS',
      payload: {
        toggleIsSavedDropdownOpen: (): void => {
          dispatch({
            type: 'TOGGLE_IS_SAVED_DROPDOWN_OPEN',
          });
        },
        toggleDisableSavedButton: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_SAVED_BUTTON',
          });
        },
      },
    });
  }, []);

  //== Download ==//
  useEffect(() => {
    dispatch({
      type: 'SET_DOWNLOAD_PROPS',
      payload: {
        toggleIsDownloadDropdownOpen: (): void => {
          dispatch({
            type: 'TOGGLE_IS_DOWNLOAD_DROPDOWN_OPEN',
          });
        },
        toggleDisableDownloads: (): void => {
          dispatch({
            type: 'TOGGLE_DISABLE_DOWNLOADS',
          });
        },
      },
    });
  }, []);

  //-- generation selection --//
  useEffect(() => {
    if (!state.selectedJobPostingState.selectedGeneration) return;
    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_ID',
      payload: state.selectedJobPostingState.selectedGeneration?.id,
    });
    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_CONTENT',
      payload: state.selectedJobPostingState.selectedGeneration?.content,
    });
    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_CONTENT_HTML',
      payload: addDivTag(
        addPTags(state.selectedJobPostingState.selectedGeneration?.content)
      ),
    });
  }, [state.selectedJobPostingState.selectedGeneration]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath =
        state.selectedJobPostingState.selectedCandidate.resume.file;
      const fullPath = `https://localhost:8000${filePath}`;

      dispatch({
        type: 'UPDATE_RESUME_URL',
        payload: fullPath,
      });
    };

    if (state.selectedJobPostingState?.selectedCandidate?.resume) {
      updateResumeUrl();
    }
  }, [state.selectedJobPostingState.selectedCandidate]);

  //== Candidate Rankings ==//
  useEffect(() => {
    const updateRankings = async () => {
      const filteredCandidates =
        state.selectedJobPostingState.allCandidates.filter(
          (candidate) => candidate.match_score !== null
        );

      // Sort the filtered candidates by weighted_score, highest scores first
      const sortedCandidates = filteredCandidates.sort((a, b) => {
        // Assuming match_score.weighted_score is a number. Adjust if it's structured differently
        return b.match_score.weighted_score - a.match_score.weighted_score;
      });
      dispatch({
        type: 'UPDATE_RANKINGS',
        payload: sortedCandidates,
      });
    };

    const updateUnscoredCandidates = async () => {
      const filteredCandidates =
        state.selectedJobPostingState.allCandidates.filter(
          (candidate) => candidate.match_score === null
        );

      dispatch({
        type: 'UPDATE_UNSCORED_CANDIDATES',
        payload: filteredCandidates,
      });
    };

    if (state.selectedJobPostingState?.allCandidates?.length > 0) {
      updateRankings();
      updateUnscoredCandidates();
    }
  }, [state.selectedJobPostingState.allCandidates]);

  return (
    <JobPostingsContext.Provider value={value}>
      {children}
    </JobPostingsContext.Provider>
  );
};

export const useJobPostingsContext = () => useContext(JobPostingsContext);
