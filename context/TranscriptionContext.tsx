import { createContext, useContext, useReducer, useEffect } from 'react';

const TranscriptionContext = createContext<any>({
  state: {},
  dispatch: () => null,
});

const initialState = {
  listState: {
    savedItems: [],
    filteredItems: [],
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
  selectedItemFullDetails: null,
  selectedItemBodyDisplayState: {
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
        selectedItemFullDetails: action.payload,
      };

    //=== Selected Item Body Display State ===//
    case 'SET_SELECTED_ITEM_BODY_DISPLAY_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: action.payload,
      };
    case 'UPDATE_CALL_OR_NOTE_MODE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          mode: action.payload,
        },
      };
    case 'UPDATE_CALL_SELECTION_SUMMARY_STATE':
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
    case 'UPDATE_CALL_MODE_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          callModeState: {
            ...state.selectedItemBodyDisplayState.callModeState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_TRANSCRIPTION_MODE_STATE':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          transcriptionModeState: {
            ...state.selectedItemBodyDisplayState.transcriptionModeState,
            ...action.payload,
          },
        },
      };
    case 'UPDATE_NEW_CALL_FORM':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          callModeState: {
            ...state.selectedItemBodyDisplayState.callModeState,
            newCallForm: {
              ...state.selectedItemBodyDisplayState.callModeState.newCallForm,
              ...action.payload,
            },
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM':
      return {
        ...state,
        selectedItemBodyDisplayState: {
          ...state.selectedItemBodyDisplayState,
          callModeState: {
            ...state.selectedItemBodyDisplayState.callModeState,
            callCompleteForm: {
              ...state.selectedItemBodyDisplayState.callModeState
                .callCompleteForm,
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
        name: state.selectedItemBodyDisplayState.callModeState.newCallForm
          .candidate_name,
        phone_number:
          state.selectedItemBodyDisplayState.callModeState.candidate_number,
        job_posting:
          state.selectedItemBodyDisplayState.callModeState.newCallForm
            .job_posting,
      },
    });
  }, [
    state.selectedItemBodyDisplayState.callModeState.newCallForm?.job_posting,
    state.selectedItemBodyDisplayState.callModeState.newCallForm
      ?.candidate_name,
    state.selectedItemBodyDisplayState.callModeState.newCallForm
      ?.candidate_number,
  ]);

  //-- update selection summary --//
  useEffect(() => {
    if (
      state.selectedItemBodyDisplayState.transcriptionModeState
        ?.selectedCandidate
    ) {
      dispatch({
        type: 'UPDATE_CALL_SELECTION_SUMMARY_STATE',
        payload: {
          mainTitle:
            state.selectedItemBodyDisplayState.transcriptionModeState
              ?.selectedCandidate.name,
          secondaryTitle:
            state.selectedItemBodyDisplayState.transcriptionModeState
              ?.selectedCandidate.current_title,
          supplementaryInfo:
            state.selectedItemBodyDisplayState.transcriptionModeState
              ?.selectedCandidate.created_at,
        },
      });
    }
  }, [
    state.selectedItemBodyDisplayState.transcriptionModeState
      ?.selectedCandidate,
  ]);

  console.log('trans/call state', state);

  return (
    <TranscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </TranscriptionContext.Provider>
  );
}

export const useTranscriptionContext = () => useContext(TranscriptionContext);
