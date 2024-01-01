import { createContext, useContext, useReducer, useEffect } from 'react';

import { fetchCandidatesResume } from '@/api/CandidateProfileMethods';
import { addPTags, addDivTag } from '@/Utils/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const CandidatesContext = createContext<any>({
  state: {},
  dispatch: () => null,
});

const initialState = {
  savedCandidatesListState: {
    savedItems: [],
    filteredItems: [],
    selected: null,
    search: '',
    loading: false,
  },
  selectedCandidateProfile: null,
  selectionSummary: {
    id: '',
    mainTitle: 'Candidate Name',
    secondaryTitle: 'Candidate Professional Title',
    supplementaryInfo: '',
    loading: false,
    updateMainTitle: (title: string): void => {},
    updateSecondaryTitle: (title: string): void => {},
    updateSupplementalInfo: (info: number): void => {},
    toggleLoading: (): void => {},
  },
  resumeState: {
    savedResumes: [],
    selectedResume: null,
    mostRecentResume: null,
    pdfIframePath: '',
  },
  jobPostingsState: {
    jobPostings: [],
    selectedJobPosting: null,
    matchScores: [],
    mode: 'overview',
    generationPanelMode: 'overview', // overview, emailsSelection,
    callPanelMode: 'overview', // overview, followSelection
    refreshJobPostings: true,
    currentlyCalculating: '', // id of
    selectedGeneration: null,
    selectedPhoneCall: null,
    loading: false,
    resumeUrl: '',
  },
  selectedCandidateMode: 'overview', // overview, resume, jobPosting

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

const candidatesReducer = (state: any, action: any) => {
  switch (action.type) {
    //-- saved candidates list state --//
    case 'SET_SAVED_CANDIDATES_LIST_STATE':
      return {
        ...state,
        savedCandidatesListState: action.payload,
      };
    case 'UPDATE_SAVED_CANDIDATES_LIST':
      return {
        ...state,
        savedCandidatesListState: {
          ...state.savedCandidatesListState,
          savedCandidatesList: action.payload,
        },
      };
    case 'UPDATE_FILTERED_SAVED_CANDIDATES_LIST':
      return {
        ...state,
        savedCandidatesListState: {
          ...state.savedCandidatesListState,
          filteredItems: action.payload,
        },
      };
    case 'UPDATE_SELECTED':
      return {
        ...state,
        savedCandidatesListState: {
          ...state.savedCandidatesListState,
          selected: action.payload,
        },
      };
    case 'UPDATE_SEARCH_VALUE':
      return {
        ...state,
        savedCandidatesListState: {
          ...state.savedCandidatesListState,
          search: action.payload,
        },
      };
    case 'UPDATE_LOADING':
      return {
        ...state,
        savedCandidatesListState: {
          ...state.savedCandidatesListState,
          loading: action.payload,
        },
      };

    //-- selected candidate profile state --//
    case 'SET_SELECTED_CANDIDATE_PROFILE':
      return {
        ...state,
        selectedCandidateProfile: action.payload,
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
    case 'UPDATE_MAIN_TITLE':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          mainTitle: action.payload,
        },
      };
    case 'UPDATE_SECONDARY_TITLE':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          secondaryTitle: action.payload,
        },
      };
    case 'UPDATE_SUPPLEMENTARY_INFO':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          supplementaryInfo: action.payload,
        },
      };
    case 'UPDATE_LOADING':
      return {
        ...state,
        selectionSummary: {
          ...state.selectionSummary,
          loading: action.payload,
        },
      };

    //-- selected resume state --//
    case 'SET_RESUME_STATE':
      return {
        ...state,
        resumeState: action.payload,
      };
    case 'UPDATE_SAVED_RESUMES':
      return {
        ...state,
        resumeState: {
          ...state.resumeState,
          savedResumes: action.payload,
        },
      };
    case 'UPDATE_SELECTED_RESUME':
      return {
        ...state,
        resumeState: {
          ...state.resumeState,
          selectedResume: action.payload,
        },
      };
    case 'UPDATE_MOST_RECENT_RESUME':
      return {
        ...state,
        resumeState: {
          ...state.resumeState,
          mostRecentResume: action.payload,
        },
      };
    case 'UPDATE_PDF_IFRAME_PATH':
      return {
        ...state,
        resumeState: {
          ...state.resumeState,
          pdfIframePath: action.payload,
        },
      };

    //-- selected job posting state --//
    case 'SET_JOB_POSTINGS_STATE':
      return {
        ...state,
        jobPostingsState: action.payload,
      };
    case 'UPDATE_JOB_POSTINGS':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          jobPostings: action.payload,
        },
      };
    case 'UPDATE_SELECTED_JOB_POSTING':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          selectedJobPosting: action.payload,
        },
      };

    case 'UPDATE_JOB_POSTING_MATCH_SCORES':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          jobPostingMatchScores: action.payload,
        },
      };
    case 'UPDATE_MATCH_SCORE':
      return {};
    case 'UPDATE_JOB_POSTING_MODE':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          mode: action.payload,
        },
      };
    case 'UPDATE_GENERATIONS_PANEL_MODE':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          generationPanelMode: action.payload,
        },
      };
    case 'UPDATE_CALL_PANEL_MODE':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          callPanelMode: action.payload,
        },
      };
    case 'REFRESH_JOB_POSTINGS':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          refreshJobPostings: !state.jobPostingsState.refreshJobPostings,
        },
      };
    case 'UPDATE_CURRENTLY_CALCULATING':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          currentlyCalculating: action.payload,
        },
      };
    case 'UPDATE_SELECTED_GENERATION':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          selectedGeneration: action.payload,
        },
      };
    case 'UPDATE_SELECTED_PHONE_CALL':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          selectedPhoneCall: action.payload,
        },
      };
    case 'UPDATE_JOB_POSTING_STATE_LOADING':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          loading: action.payload,
        },
      };
    case 'UPDATE_RESUME_URL':
      return {
        ...state,
        jobPostingsState: {
          ...state.jobPostingsState,
          resumeUrl: action.payload,
        },
      };

    //-- selected candidate mode --//
    case 'SET_SELECTED_CANDIDATE_MODE':
      return {
        ...state,
        selectedCandidateMode: action.payload,
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

export const CandidatesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(candidatesReducer, initialState);

  console.log('cand state');
  console.log(state);

  //-- update selection summary --//
  useEffect(() => {
    if (state.selectedCandidateProfile) {
      dispatch({
        type: 'UPDATE_MAIN_TITLE',
        payload: state.selectedCandidateProfile.name,
      });
      dispatch({
        type: 'UPDATE_SECONDARY_TITLE',
        payload: state.selectedCandidateProfile.current_title,
      });
      dispatch({
        type: 'UPDATE_SUPPLEMENTARY_INFO',
        payload: state.selectedCandidateProfile.updated_at,
      });

      // dispatch({
      //   type: 'UPDATE_MATCH_SCORES',
      //   payload: state.selectedCandidateProfile.match_scores,
      // });
    }
  }, [state.selectedCandidateProfile]);

  //-- update resume --//
  useEffect(() => {
    const getCandidatesResumes = async () => {
      const response = await fetchCandidatesResume(
        state.selectedCandidateProfile.id
      );
      if (response) {
        dispatch({
          type: 'UPDATE_SAVED_RESUMES',
          payload: response.data,
        });
      } else {
        console.log('error fetching candidates resumes');
      }
    };

    if (state.selectedCandidateProfile) {
      getCandidatesResumes();
    }
  }, [state.selectedCandidateProfile]);

  //-- update most recent resume --//
  useEffect(() => {
    if (state.resumeState?.savedResumes?.length > 0) {
      if (state.resumeState?.savedResumes?.length === 1) {
        dispatch({
          type: 'UPDATE_MOST_RECENT_RESUME',
          payload: state.resumeState?.savedResumes[0],
        });
      } else {
        const mostRecentResume = state.resumeState.savedResumes.reduce(
          (prev, current) => {
            return prev.updated_at > current.updated_at ? prev : current;
          }
        );
        dispatch({
          type: 'UPDATE_MOST_RECENT_RESUME',
          payload: mostRecentResume,
        });
      }
    }
  }, [state.resumeState.savedResumes]);

  //-- update path for iframe display of resume --//
  useEffect(() => {
    if (state.resumeState?.mostRecentResume) {
      const resume_path = state.resumeState?.mostRecentResume?.file;
      const path = `${DOMAIN}/${resume_path}`;

      dispatch({
        type: 'UPDATE_PDF_IFRAME_PATH',
        payload: path,
      });
    }
  }, [state.resumeState.mostRecentResume]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath = state.selectedCandidateProfile.resume.file;
      const fullPath = `${DOMAIN}/${filePath}`;

      dispatch({
        type: 'UPDATE_RESUME_URL',
        payload: fullPath,
      });
    };

    if (state.selectedCandidateProfile?.resume?.file) {
      updateResumeUrl();
    }
  }, [state.selectedCandidateProfile?.resume?.file]);

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

  //-- every time jobPostingsState.selectedGeneration changes, update generationResultsState --//
  useEffect(() => {
    if (!state.jobPostingsState.selectedGeneration) return;
    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_ID',
      payload: state.jobPostingsState.selectedGeneration?.id,
    });
    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_CONTENT',
      payload: state.jobPostingsState.selectedGeneration?.content,
    });
    dispatch({
      type: 'UPDATE_GENERATION_RESULTS_CONTENT_HTML',
      payload: addDivTag(
        addPTags(state.jobPostingsState.selectedGeneration?.content)
      ),
    });
  }, [state.jobPostingsState.selectedGeneration]);

  return (
    <CandidatesContext.Provider value={{ state, dispatch }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidatesContext = () => useContext(CandidatesContext);
