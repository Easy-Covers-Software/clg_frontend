import { init } from 'next/dist/compiled/@vercel/og/satori';
import { createContext, useContext, useReducer, useEffect, use } from 'react';

import { TranscriptionMethods } from '@/Utils/utils';
const { fetchTranscription } = TranscriptionMethods;

const initialState = {
  phoneCallState: {
    savedItems: [],
    filteredItems: [],
    selected: null,
    search: '',
    callStatus: 'new', // ['new',  'initiated', 'ringing', 'in-progress', 'complete', 'failed', 'no-answer', 'busy', 'canceled']
    loading: false,
  },
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
  transcriptionState: {
    phoneCall: null,
    transcription: '',
    transcriptionNotes: null,
    loading: false,
  },
  currentMode: 'Call', // notes or call
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHONE_CALL_STATE':
      return {
        ...state,
        phoneCallState: action.payload,
      };
    case 'UPDATE_SAVED_PHONE_CALLS':
      return {
        ...state,
        phoneCallState: {
          ...state.phoneCallState,
          savedItems: action.payload,
        },
      };
    case 'UPDATE_FILTERED_PHONE_CALLS':
      return {
        ...state,
        phoneCallState: {
          ...state.phoneCallState,
          filteredItems: action.payload,
        },
      };
    case 'UPDATE_SELECTED_PHONE_CALL':
      return {
        ...state,
        phoneCallState: {
          ...state.phoneCallState,
          selected: action.payload,
        },
      };
    case 'UPDATE_SEARCH':
      return {
        ...state,
        phoneCallState: {
          ...state.phoneCallState,
          search: action.payload,
        },
      };
    case 'UPDATE_CALL_STATUS':
      return {
        ...state,
        phoneCallState: {
          ...state.phoneCallState,
          callStatus: action.payload,
        },
      };
    case 'UPDATE_LOADING':
      return {
        ...state,
        phoneCallState: {
          ...state.phoneCallState,
          loading: action.payload,
        },
      };
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
    case 'SET_TRANSCRIPTION_STATE':
      return {
        ...state,
        transcriptionState: action.payload,
      };
    case 'UPDATE_TRANSCRIPTION_STATE_PHONE_CALL':
      return {
        ...state,
        transcriptionState: {
          ...state.transcriptionState,
          phoneCall: action.payload,
        },
      };
    case 'UPDATE_TRANSCRIPTION':
      return {
        ...state,
        transcriptionState: {
          ...state.transcriptionState,
          transcription: action.payload,
        },
      };
    case 'UPDATE_TRANSCRIPTION_NOTES':
      return {
        ...state,
        transcriptionState: {
          ...state.transcriptionState,
          transcriptionNotes: action.payload,
        },
      };
    case 'UPDATE_TRANSCRIPTION_LOADING':
      return {
        ...state,
        transcriptionState: {
          ...state.transcriptionState,
          loading: action.payload,
        },
      };
    case 'SET_CURRENT_MODE':
      return {
        ...state,
        currentMode: action.payload,
      };
    default:
      return state;
  }
}

export default function TranscriptionPageContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'SET_PHONE_CALL_STATE',
      payload: {
        savedItems: [],
        filteredItems: [],
        selected: null,
        search: '',
        callStatus: 'new',
        loading: false,
        updateSavedPhoneCalls: (calls) => {
          dispatch({
            type: 'UPDATE_SAVED_PHONE_CALLS',
            payload: calls,
          });
        },
      },
    });
  }, []);

  useEffect(() => {
    const getTranscriptionInstance = async () => {
      const response = await fetchTranscription(
        state.transcriptionState.phoneCall.transcription
      );

      if (response) {
        dispatch({
          type: 'UPDATE_TRANSCRIPTION',
          payload: response.data,
        });
      }
    };

    if (state.transcriptionState?.phoneCall?.transcription) {
      getTranscriptionInstance();
    }
  }, [state.transcriptionState.phoneCall]);

  useEffect(() => {
    const getTranscriptionNotes = () => {
      const notes = state.transcriptionState.transcription?.notes;

      let temp = [];
      Object.entries(notes).forEach(([key, value]) => {
        const currNote = { noteHeader: key, noteContent: value };
        temp.push(currNote);
      });

      dispatch({
        type: 'UPDATE_TRANSCRIPTION_NOTES',
        payload: temp,
      });
    };

    if (state.transcriptionState.transcription?.notes) {
      getTranscriptionNotes();
    }
  }, [state.transcriptionState.transcription]);

  return (
    <TranscriptionContext.Provider value={{ state, dispatch }}>
      {children}
    </TranscriptionContext.Provider>
  );
}

const TranscriptionContext = createContext({
  state: initialState,
  dispatch: reducer,
});

export const useTranscriptionContext = () => useContext(TranscriptionContext);
