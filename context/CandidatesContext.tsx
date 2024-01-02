import { createContext, useContext, useReducer, useEffect } from 'react';
import { addPTags, addDivTag } from '@/Utils/utils';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const CandidatesContext = createContext<any>({
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
    updateCandidateRankingsState: (field, state: any): void => {},
    updateCurrentlyCalculating: (candidateId: any): void => {},
    updateSelectedCandidateScoreDetailsState: (field, state: any): void => {},
    updateGenerationResultsState: (field, state: any): void => {},
  },
};

const candidatesReducer = (state: any, action: any) => {
  switch (action.type) {
    //=== List State --//
    case 'SET_SAVED_CANDIDATES_LIST_STATE':
      return {
        ...state,
        listState: action.payload,
      };
    case 'UPDATE_SAVED_CANDIDATES_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          listItems: action.payload,
        },
      };
    case 'UPDATE_FILTERED_SAVED_CANDIDATES_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          filteredListItems: action.payload,
        },
      };
    case 'UPDATE_SELECTED':
      return {
        ...state,
        listState: {
          ...state.listState,
          selected: action.payload,
        },
      };
    case 'UPDATE_SEARCH_VALUE':
      return {
        ...state,
        listState: {
          ...state.listState,
          search: action.payload,
        },
      };
    case 'UPDATE_LOADING':
      return {
        ...state,
        listState: {
          ...state.listState,
          loading: action.payload,
        },
      };
    case 'REFRESH_CANDIDATES_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          refresh: !state.listState.refresh,
        },
      };

    //=== Selected Full Details --//
    case 'SET_SELECTED_CANDIDATE_PROFILE':
      return {
        ...state,
        selectedListItemFullDetails: action.payload,
      };

    //=== Selected Item Body Display State --//
    case 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: action.payload,
      };
    case 'UPDATE_CANDIDATE_BODY_DISPLAY_MODE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          mode: action.payload,
        },
      };
    case 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE':
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
    case 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          candidateJobPostingsListState: {
            ...state.selectedItemBodyDisplayState.candidateJobPostingsListState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_CURRENTLY_CALCULATING':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          currentlyCalculating: action.payload,
        },
      };
    case 'UPDATE_SELECTED_CANDIDATE_SCORE_DETAILS_STATE':
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

export const CandidatesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(candidatesReducer, initialState);

  //=== Selection Summary State ===//
  useEffect(() => {
    if (state.selectedListItemFullDetails) {
      dispatch({
        type: 'UPDATE_CANDIDATE_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle: state.selectedListItemFullDetails.name,
          secondaryTitle: state.selectedListItemFullDetails.current_title,
          supplementaryInfo: state.selectedListItemFullDetails.updated_at,
        },
      });
    }
  }, [state.selectedListItemFullDetails]);

  //== Resume Path ==//
  useEffect(() => {
    const updateResumeUrl = async () => {
      const filePath = state.selectedListItemFullDetails.resume.file;
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

    if (state.selectedListItemFullDetails?.resume?.file) {
      updateResumeUrl();
    }
  }, [state.selectedListItemFullDetails]);

  //== Generation Results State ==//
  // useEffect(() => {
  //   dispatch({
  //     type: 'SET_SAVE_PROPS',
  //     payload: {
  //       toggleIsSavedDropdownOpen: (): void => {
  //         dispatch({
  //           type: 'TOGGLE_IS_SAVED_DROPDOWN_OPEN',
  //         });
  //       },
  //       toggleDisableSavedButton: (): void => {
  //         dispatch({
  //           type: 'TOGGLE_DISABLE_SAVED_BUTTON',
  //         });
  //       },
  //     },
  //   });
  // }, []);

  // //== Download ==//
  // useEffect(() => {
  //   dispatch({
  //     type: 'SET_DOWNLOAD_PROPS',
  //     payload: {
  //       toggleIsDownloadDropdownOpen: (): void => {
  //         dispatch({
  //           type: 'TOGGLE_IS_DOWNLOAD_DROPDOWN_OPEN',
  //         });
  //       },
  //       toggleDisableDownloads: (): void => {
  //         dispatch({
  //           type: 'TOGGLE_DISABLE_DOWNLOADS',
  //         });
  //       },
  //     },
  //   });
  // }, []);

  //-- update generation results state --//
  // useEffect(() => {
  //   dispatch({
  //     type: 'SET_GENERATION_RESULTS_STATE',
  //     payload: {
  //       updateId: (id: string): void => {
  //         dispatch({
  //           type: 'UPDATE_GENERATION_RESULTS_ID',
  //           payload: id,
  //         });
  //       },
  //       updateContent: (content: string): void => {
  //         dispatch({
  //           type: 'UPDATE_GENERATION_RESULTS_CONTENT',
  //           payload: content,
  //         });
  //       },
  //       updateContentHtml: (contentHtml: string): void => {
  //         dispatch({
  //           type: 'UPDATE_GENERATION_RESULTS_CONTENT_HTML',
  //           payload: contentHtml,
  //         });
  //       },
  //       updateEditedContent: (editedContent: string): void => {
  //         dispatch({
  //           type: 'UPDATE_GENERATION_RESULTS_EDITED_CONTENT',
  //           payload: editedContent,
  //         });
  //       },
  //       updateEditedContentHtml: (editedContentHtml: string): void => {
  //         dispatch({
  //           type: 'UPDATE_GENERATION_RESULTS_EDITED_CONTENT_HTML',
  //           payload: editedContentHtml,
  //         });
  //       },
  //       toggleLoading: (): void => {
  //         dispatch({
  //           type: 'TOGGLE_GENERATION_RESULTS_LOADING',
  //         });
  //       },
  //     },
  //   });
  // }, []);
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
        content:
          state.selectedItemBodyDisplayState.selectedCandidateScoreDetailsState
            .selectedGeneration?.content,
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

  //== List State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SAVED_CANDIDATES_LIST_STATE',
      payload: {
        listItems: [],
        filteredListItems: [],
        selected: null,
        search: '',
        loading: false,
        refresh: false,
        updateListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_SAVED_CANDIDATES_LIST',
            payload: list,
          });
        },
        updateFilteredListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_FILTERED_SAVED_CANDIDATES_LIST',
            payload: list,
          });
        },
        updateSelected: (id: string): void => {
          dispatch({
            type: 'UPDATE_SELECTED',
            payload: id,
          });
        },
        updateSearch: (search: string): void => {
          dispatch({
            type: 'UPDATE_SEARCH_VALUE',
            payload: search,
          });
        },
        updateLoading: (loading: boolean): void => {
          dispatch({
            type: 'UPDATE_LOADING',
            payload: loading,
          });
        },
        toggleRefresh: (): void => {
          dispatch({
            type: 'REFRESH_CANDIDATES_LIST',
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
        mode: initialState.selectedItemBodyDisplayState.mode,
        selectionSummaryState:
          initialState.selectedItemBodyDisplayState.selectionSummaryState,
        candidateJobPostingsListState:
          initialState.selectedItemBodyDisplayState
            .candidateJobPostingsListState,
        currentlyCalculating:
          initialState.selectedItemBodyDisplayState.currentlyCalculating,
        selectedCandidateScoreDetailsState:
          initialState.selectedItemBodyDisplayState
            .selectedCandidateScoreDetailsState,
        generationResultsState:
          initialState.selectedItemBodyDisplayState.generationResultsState,
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
        updateCandidateRankingsState: (field, state: any): void => {
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
            type: 'UPDATE_SELECTED_CANDIDATE_GENERATION_RESULTS_STATE',
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
