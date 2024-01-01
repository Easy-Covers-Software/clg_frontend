import { createContext, useContext, useReducer, useEffect } from 'react';

type PhoneCallTranscriptionTracker = {
  phoneCallId: string;
  status: string;
};

const TranscriptionContext = createContext<any>({
  phoneCallListState: {},
  notesHeaderSummaryState: {},
  transcriptionModeState: {},
  transcriptionsInProcess: [],
  currentMode: '',
});

const initialState = {
  //== Phone Call List State ==//
  phoneCallListState: {
    savedItems: [],
    filteredItems: [],
    selected: null,
    search: '',
    loading: false,
    refresh: false,
  },

  //== Selected Phone Call ==//
  selectedPhoneCall: null,

  //== Summary Header State ==//
  notesHeaderSummaryState: {
    id: '',
    mainTitle: 'Candidate Name',
    secondaryTitle: 'Position Called For',
    supplementalInfo: '10/20/2023', // date of recording
    loading: false,
    updateMainTitle: (title: string): void => {},
    updateSecondaryTitle: (title: string): void => {},
    updateSupplementalInfo: (info: number): void => {},
    toggleLoading: (): void => {},
  },

  //== Transcription Mode State ==//
  transcriptionModeState: {
    selectedTranscription: null,
    transcriptionNotes: null,
    status: '',
    loading: false,
  },

  //== Call Mode State ==//
  callModeState: {
    newCallForm: {
      candidateName: '',
      phone: '+15555555555',
      jobPosting: '',
    },
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
    status: 'new',
  },
  currentMode: 'Notes',
  checked: false,
  newCallForm: {
    candidate_name: '',
    candidate_number: '',
    job_posting: '',
  },
  candidateSaveForm: null,
  jobPostings: null,
  selectedJobPosting: null,
  newCandidateId: '',
  newCallId: '',
  phoneCallJobPostingId: null,
};

function reducer(state, action) {
  switch (action.type) {
    //== Phone Call List State ==//
    case 'SET_PHONE_CALL_LIST_STATE':
      return {
        ...state,
        phoneCallListState: action.payload,
      };
    case 'UPDATE_SAVED_PHONE_CALLS':
      return {
        ...state,
        phoneCallListState: {
          ...state.phoneCallListState,
          savedItems: action.payload,
        },
      };
    case 'UPDATE_SEARCHED_PHONE_CALLS':
      return {
        ...state,
        phoneCallListState: {
          ...state.phoneCallListState,
          filteredItems: action.payload,
        },
      };
    case 'UPDATE_SELECTED_PHONE_CALL':
      return {
        ...state,
        phoneCallListState: {
          ...state.phoneCallListState,
          selected: action.payload,
        },
      };
    case 'UPDATE_LIST_SEARCH':
      return {
        ...state,
        phoneCallListState: {
          ...state.phoneCallListState,
          search: action.payload,
        },
      };
    case 'UPDATE_LIST_LOADING':
      return {
        ...state,
        phoneCallListState: {
          ...state.phoneCallListState,
          loading: action.payload,
        },
      };
    case 'REFRESH_PHONE_CALLS_LIST':
      return {
        ...state,
        phoneCallListState: {
          ...state.phoneCallListState,
          refresh: !state.phoneCallListState.refresh,
        },
      };

    //== Selected Phone Call ==//
    case 'SET_SELECTED_PHONE_CALL':
      return {
        ...state,
        selectedPhoneCall: action.payload,
      };

    //== Selected Transcription ==//
    case 'SET_SELECTED_TRANSCRIPTION':
      return {
        ...state,
        selectedTranscription: action.payload,
      };

    //== Summary Header State ==//
    case 'SET_NOTES_HEADER_SUMMARY_STATE':
      return {
        ...state,
        notesHeaderSummaryState: action.payload,
      };
    case 'UPDATE_NOTES_HEADER_SUMMARY_ID':
      return {
        ...state,
        notesHeaderSummaryState: {
          ...state.notesHeaderSummaryState,
          id: action.payload,
        },
      };
    case 'UPDATE_NOTES_HEADER_SUMMARY_MAIN_TITLE':
      return {
        ...state,
        notesHeaderSummaryState: {
          ...state.notesHeaderSummaryState,
          mainTitle: action.payload,
        },
      };
    case 'UPDATE_NOTES_HEADER_SUMMARY_SECONDARY_TITLE':
      return {
        ...state,
        notesHeaderSummaryState: {
          ...state.notesHeaderSummaryState,
          secondaryTitle: action.payload,
        },
      };
    case 'UPDATE_NOTES_HEADER_SUMMARY_SUPPLEMENTAL_INFO':
      return {
        ...state,
        notesHeaderSummaryState: {
          ...state.notesHeaderSummaryState,
          supplementalInfo: action.payload,
        },
      };
    case 'UPDATE_NOTES_HEADER_SUMMARY_LOADING':
      return {
        ...state,
        notesHeaderSummaryState: {
          ...state.notesHeaderSummaryState,
          loading: action.payload,
        },
      };

    //== Transcription Mode State ==//
    case 'SET_TRANSCRIPTION_MODE_STATE':
      return {
        ...state,
        transcriptionModeState: action.payload,
      };
    case 'UPDATE_SELECTED_TRANSCRIPTION':
      return {
        ...state,
        transcriptionModeState: {
          ...state.transcriptionModeState,
          selectedTranscription: action.payload,
        },
      };
    case 'UPDATE_SELECTED_TRANSCRIPTION_NOTES':
      return {
        ...state,
        transcriptionModeState: {
          ...state.transcriptionModeState,
          transcriptionNotes: action.payload,
        },
      };
    case 'UPDATE_TRANSCRIPTION_STATUS':
      return {
        ...state,
        transcriptionModeState: {
          ...state.transcriptionModeState,
          status: action.payload,
        },
      };
    case 'UPDATE_TRANSCRIPTION_LOADING':
      return {
        ...state,
        transcriptionModeState: {
          ...state.transcriptionModeState,
          loading: action.payload,
        },
      };

    //== Call Mode State ==//
    case 'SET_CALL_MODE_STATE':
      return {
        ...state,
        callModeState: action.payload,
      };
    case 'UPDATE_NEW_CALL_FORM_2':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          newCallForm: action.payload,
        },
      };
    case 'UPDATE_NEW_FORM_CANDIDATE_NAME':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          newCallForm: {
            ...state.callModeState.newCallForm,
            candidateName: action.payload,
          },
        },
      };
    case 'UPDATE_NEW_FORM_PHONE':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          newCallForm: {
            ...state.callModeState.newCallForm,
            phone: action.payload,
          },
        },
      };
    case 'UPDATE_NEW_FORM_JOB_POSTING':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          newCallForm: {
            ...state.callModeState.newCallForm,
            jobPosting: action.payload,
          },
        },
      };

    // case 'UPDATE_CALL_COMPLETE_FORM':
    //   return {
    //     ...state,
    //     callModeState: {
    //       ...state.callModeState,
    //       callCompleteForm: action.payload,
    //     },
    //   };
    case 'UPDATE_NEW_CALL_FORM':
      return {
        ...state,
        newCallForm: action.payload,
      };

    case 'UPDATE_CALL_COMPLETE_FORM':
      return {
        ...state,
        candidateSaveForm: action.payload,
      };

    case 'UPDATE_CALL_COMPLETE_FORM_CANDIDATE_NAME':
      return {
        ...state,
        candidateSaveForm: {
          ...state.callModeState,
          name: action.payload,
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_PHONE':
      return {
        ...state,
        candidateSaveForm: {
          ...state.callModeState,
          phone_number: action.payload,
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_EMAIL':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          callCompleteForm: {
            ...state.callModeState.callCompleteForm,
            email: action.payload,
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_LINKEDIN':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          callCompleteForm: {
            ...state.callModeState.callCompleteForm,
            linkedin: action.payload,
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_PORTFOLIO':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          callCompleteForm: {
            ...state.callModeState.callCompleteForm,
            portfolio: action.payload,
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_LOCATION':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          callCompleteForm: {
            ...state.callModeState.callCompleteForm,
            location: action.payload,
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_RESUME':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          callCompleteForm: {
            ...state.callModeState.callCompleteForm,
            resume: action.payload,
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_FEEDBACK':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          callCompleteForm: {
            ...state.callModeState.callCompleteForm,
            feedback: action.payload,
          },
        },
      };
    case 'UPDATE_CALL_COMPLETE_FORM_JOB_POSTING':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          callCompleteForm: {
            ...state.callModeState.callCompleteForm,
            jobPosting: action.payload,
          },
        },
      };

    case 'UPDATE_CALL_MODE_STATUS':
      return {
        ...state,
        callModeState: {
          ...state.callModeState,
          status: action.payload,
        },
      };
    //== Transcriptions In Process ==//
    case 'ADD_TRANSCRIPTIONS_IN_PROCESS':
      return {
        ...state,
        transcriptionsInProcess: [
          ...state.transcriptionsInProcess,
          action.payload,
        ],
      };
    case 'UPDATE_TRANSCRIPTIONS_IN_PROCESS':
      return {
        ...state,
        transcriptionsInProcess: state.transcriptionsInProcess.map(
          (transcription) =>
            transcription.phoneCallId === action.payload.phoneCallId
              ? action.payload
              : transcription
        ),
      };

    case 'SET_CHECKED':
      return {
        ...state,
        checked: action.payload,
      };

    //== Current Mode ==//
    case 'SET_CURRENT_MODE':
      return {
        ...state,
        currentMode: action.payload,
      };

    //== Candidate Save Form ==//
    // case 'SET_CANDIDATE_SAVE_FORM':
    //   return {
    //     ...state,
    //     candidateSaveForm: action.payload,
    //   };
    case 'SET_JOB_POSTINGS':
      return {
        ...state,
        jobPostings: action.payload,
      };

    case 'SET_SELECTED_JOB_POSTING':
      return {
        ...state,
        selectedJobPosting: action.payload,
      };

    case 'SET_NEW_CANDIDATE_ID':
      return {
        ...state,
        newCandidateId: action.payload,
      };

    case 'SET_NEW_CALL_ID':
      return {
        ...state,
        newCallId: action.payload,
      };

    case 'SET_CALL_JOB_POSTING_ID':
      return {
        ...state,
        phoneCallJobPostingId: action.payload,
      };

    default:
      return state;
  }
}

export default function TranscriptionPageContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {

  // }, [state.phoneCallListState.selected]);

  // useEffect(() => {
  //   const getTranscriptionInstance = async () => {
  //     const response = await fetchTranscription(
  //       state.transcriptionModeState.phoneCall.transcription
  //     );

  //     if (response) {
  //       console.log('transcription 1');
  //       console.log(response.data);
  //       dispatch({
  //         type: 'UPDATE_TRANSCRIPTION_ID',
  //         payload: response.data.id,
  //       });
  //     }
  //   };

  //   if (state.phoneCallListState.selected) {
  //     getTranscriptionInstance();
  //   }

  //   dispatch({
  //     type: 'UPDATE_TRANSCRIPTION_PHONE_CALL_ID',
  //     payload: state.phoneCallListState.selected?.id,
  //   });
  //   dispatch({
  //     type: 'UPDATE_TRANSCRIPTION_STATUS',
  //     payload: state.phoneCallListState.selected?.transcription_status,
  //   });
  //   dispatch({
  //     type: 'UPDATE_TRANSCRIPTION_STEP',
  //     payload: state.phoneCallListState.selected?.transcription_status_step,
  //   });
  // }, [state.phoneCallListState.selected]);

  // useEffect(() => {
  //   const getTranscriptionNotes = () => {
  //     const notes = state.transcriptionModeState.transcription?.notes;

  //     let temp: any = [];
  //     Object.entries(notes).forEach(([key, value]) => {
  //       const currNote = { noteHeader: key, noteContent: value };
  //       temp.push(currNote);
  //     });

  //     dispatch({
  //       type: 'UPDATE_SELECTED_TRANSCRIPTION_NOTES',
  //       payload: temp,
  //     });
  //   };

  //   if (state.transcriptionModeState.transcription?.notes) {
  //     getTranscriptionNotes();
  //   }
  // }, [state.transcriptionModeState.transcription]);

  // useEffect(() => {
  //   dispatch({
  //     type: 'UPDATE_CALL_COMPLETE_FORM_CANDIDATE_NAME',
  //     payload: state.newCallForm?.candidate_name,
  //   });

  //   dispatch({
  //     type: 'UPDATE_CALL_COMPLETE_FORM_PHONE',
  //     payload: state.newCallForm?.candidate_phone,
  //   });
  // }, [state.newCallForm?.candidate_name, state.newCallForm?.candidate_]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_CALL_COMPLETE_FORM',
      payload: {
        name: state.newCallForm.candidate_name,
        phone_number: state.newCallForm.candidate_number,
        job_posting: state.newCallForm.job_posting,
      },
    });
  }, [state.newCallForm?.candidate_name, state.newCallForm?.candidate_number]);

  return (
    <TranscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </TranscriptionContext.Provider>
  );
}

// TODO: Each time selected changes, use the ID to make a request to get the remaining object data

// const TranscriptionContext = createContext({
//   state: initialState,
//   dispatch: reducer,
// });

export const useTranscriptionContext = () => useContext(TranscriptionContext);
