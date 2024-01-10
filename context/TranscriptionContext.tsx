import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchPhoneCalls } from '@/api/TranscriptionMethods';

const TranscriptionContext = createContext<any>({
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
    updateSelectedPhoneCall: (id: string): void => {},
  },
  selectedListItem: null,
  bodyState: {
    mode: 'Notes',
    selectionSummaryState: {
      id: '',
      mainTitle: 'Candidate Name',
      secondaryTitle: 'Position Called For',
      supplementalInfo: '10/20/2023', // date of recording
      loading: false,
    },
    callModeState: {
      callStatus: 'new',
      newCallForm: {
        candidate_name: '',
        candidate_number: '',
        job_posting: '',
      },
      newCallId: '',
      newCallCandidateId: '',
      newCallJobPostingId: '',
      availableJobPostings: [],
      selectedJobPosting: null,
      callCompleteForm: {
        candidateName: '',
        phone: '',
        jobPosting: '',
        email: '',
        linkedin: '',
        portfolio: '',
        location: '',
        resume: null,
        feedback: '',
      },
    },
    transcriptionModeState: {
      selectedTranscription: null,
      transcriptionNotes: null,
      candidateSelected: null,
      status: '',
      loading: false,
    },
    updateMode: (mode: string) => {},
    updateSelectionSummaryState: (field: any, state: any) => {},
    updateCallModeState: (field: any, state: any) => {},
    updateTranscriptionModeState: (field: any, state: any) => {},
    updateNewCallForm: (field: any, state: any) => {},
    updateCallCompleteForm: (field: any, state: any) => {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    //== Phone Call List State ==//
    case 'SET_PHONE_CALL_LIST_STATE':
      return {
        ...state,
        listState: action.payload,
      };
    case 'UPDATE_PHONE_CALL_LIST_STATE':
      return {
        ...state,
        listState: {
          ...state.listState,
          ...action.payload,
        },
      };
    
    
      case 'UPDATE_SAVED_PHONE_CALLS':
      return {
        ...state,
        listState: {
          ...state.listState,
          savedItems: action.payload,
        },
      };
    case 'UPDATE_SEARCHED_PHONE_CALLS':
      return {
        ...state,
        listState: {
          ...state.listState,
          filteredItems: action.payload,
        },
      };
    case 'UPDATE_SELECTED_PHONE_CALL':
      return {
        ...state,
        listState: {
          ...state.listState,
          selected: action.payload,
        },
      };
    case 'UPDATE_LIST_SEARCH':
      return {
        ...state,
        listState: {
          ...state.listState,
          search: action.payload,
        },
      };
    case 'UPDATE_LIST_LOADING':
      return {
        ...state,
        listState: {
          ...state.listState,
          loading: action.payload,
        },
      };
    case 'REFRESH_PHONE_CALLS_LIST':
      return {
        ...state,
        listState: {
          ...state.listState,
          refresh: !state.listState.refresh,
        },
      };

    //== Selected Phone Call ==//
    case 'SET_SELECTED_PHONE_CALL':
      return {
        ...state,
        selectedListItem: action.payload,
      };

    //=== Selected Item Body Display State ===//
    case 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE':
      return {
        ...state,
        bodyState: action.payload,
      };
    case 'UPDATE_CALL_OR_NOTE_MODE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          mode: action.payload,
        },
      };
    case 'UPDATE_CALL_SELECTION_SUMMARY_STATE':
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
    case 'UPDATE_CALL_MODE_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          callModeState: {
            ...state.bodyState.callModeState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_TRANSCRIPTION_MODE_STATE':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          transcriptionModeState: {
            ...state.bodyState.transcriptionModeState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_NEW_CALL_FORM':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          callModeState: {
            ...state.bodyState.callModeState,
            newCallForm: {
              ...state.bodyState.callModeState.newCallForm,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM':
      return {
        ...state,
        bodyState: {
          ...state.bodyState,
          callModeState: {
            ...state.bodyState.callModeState,
            callCompleteForm: {
              ...state.bodyState.callModeState.callCompleteForm,
              ...action.payload,
            },
          },
        },
      };

    default:
      return state;
  }
}

export default function TranscriptionPageContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getSavedPhoneCalls = async (): Promise<void> => {
    const response = await fetchPhoneCalls();
    if (response.data) {
      console.log('response.data', response.data);
      dispatch({
        type: 'UPDATE_PHONE_CALL_LIST_STATE',
        payload: {
          listItems: response.data,
          filteredListItems: response.data,
        }
      });

    } else {
      // snackbar.updateSnackbar(true, 'error', 'Error Fetching Phone Calls');
    }
  };

  useEffect(() => {
    getSavedPhoneCalls();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_CALL_COMPLETE_FORM',
      payload: {
        name: state.newCallForm?.candidate_name,
        phone_number: state.newCallForm?.candidate_number,
        job_posting: state.newCallForm?.job_posting,
      },
    });
  }, [state.newCallForm?.candidate_name, state.newCallForm?.candidate_number]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_CALL_COMPLETE_FORM',
      payload: {
        name: state.bodyState.callModeState.newCallForm.candidate_name,
        phone_number: state.bodyState.callModeState.candidate_number,
        job_posting: state.bodyState.callModeState.newCallForm.job_posting,
      },
    });
  }, [
    state.bodyState.callModeState.newCallForm?.job_posting,
    state.bodyState.callModeState.newCallForm?.candidate_name,
    state.bodyState.callModeState.newCallForm?.candidate_number,
  ]);

  //-- update selection summary --//
  useEffect(() => {
    if (state.bodyState.transcriptionModeState?.selectedCandidate) {
      dispatch({
        type: 'UPDATE_CALL_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle:
            state.bodyState.transcriptionModeState?.selectedCandidate.name,
          secondaryTitle:
            state.bodyState.transcriptionModeState?.selectedCandidate
              .current_title,
          supplementaryInfo:
            state.bodyState.transcriptionModeState?.selectedCandidate
              .created_at,
        },
      });
    }
  }, [state.bodyState.transcriptionModeState?.selectedCandidate]);

  //== List State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_PHONE_CALL_LIST_STATE',
      payload: {
        listItems: initialState.listState.listItems,
        filteredListItems: initialState.listState.filteredListItems,
        selected: initialState.listState.selected,
        search: initialState.listState.search,
        loading: initialState.listState.loading,
        refresh: initialState.listState.refresh,
        updateListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_PHONE_CALL_LIST_STATE',
            payload: { listItems: list },
          });
        },
        updateFilteredListItems: (list: any): void => {
          dispatch({
            type: 'UPDATE_PHONE_CALL_LIST_STATE',
            payload: { filteredListItems: list },
          });
        },
        updateSelected: (id: string): void => {
          dispatch({
            type: 'UPDATE_PHONE_CALL_LIST_STATE',
            payload: { selected: id },
          });
        },
        updateSearch: (search: string): void => {
          dispatch({
            type: 'UPDATE_PHONE_CALL_LIST_STATE',
            payload: { search: search },
          });
        },
        updateLoading: (loading: boolean): void => {
          dispatch({
            type: 'UPDATE_PHONE_CALL_LIST_STATE',
            payload: { loading: loading },
          });
        },
        toggleRefresh: (): void => {
          dispatch({
            type: 'UPDATE_PHONE_CALL_LIST_STATE',
            payload: { refresh: !state.listState.refresh },
          });
        },
        updateSelectedPhoneCall: (id: string): void => {
          dispatch({
            type: 'SET_SELECTED_PHONE_CALL',
            payload: id,
          });
        },        
      },
    });
  }, []);

  //== Body State ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE',
      payload: {
        mode: initialState.bodyState.mode,
        selectionSummaryState: initialState.bodyState.selectionSummaryState,
        callModeState: initialState.bodyState.callModeState,
        transcriptionModeState: initialState.bodyState.transcriptionModeState,
        updateMode: (mode: string) => {
          dispatch({
            type: 'UPDATE_CALL_OR_NOTE_MODE',
            payload: mode,
          });
        },
        updateSelectionSummaryState: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_CALL_SELECTION_SUMMARY_STATE',
            payload: { [field]: state },
          });
        },
        updateCallModeState: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_CALL_MODE_STATE',
            payload: { [field]: state },
          });
        },
        updateTranscriptionModeState: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_TRANSCRIPTION_MODE_STATE',
            payload: { [field]: state },
          });
        },
        updateNewCallForm: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_NEW_CALL_FORM',
            payload: { [field]: state },
          });
        },
        updateCallCompleteForm: (field: any, state: any) => {
          dispatch({
            type: 'UPDATE_CALL_COMPLETE_FORM',
            payload: { [field]: state },
          });
        },
      },
    });
  }, []);



  console.log('trans/call state', state);

  return (
    <TranscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </TranscriptionContext.Provider>
  );
}

export const useTranscriptionContext = () => useContext(TranscriptionContext);
