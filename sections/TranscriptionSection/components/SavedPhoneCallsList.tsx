import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import styled from '@emotion/styled';
// Context
import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

// Components (global)
import SavedList from '@/components/SavedList/SavedList';
import { UnSelectedButton, PrimaryButton } from '@/components/Global/Global';

import ReconnectingWebSocket from 'reconnecting-websocket';

import { TranscriptionMethods } from '@/Utils/utils';
import { get } from 'http';
const {
  fetchPhoneCall,
  fetchPhoneCalls,
  fetchTranscription,
  performTranscription,
} = TranscriptionMethods;

const Container = styled(Grid)`
  height: calc(100vh - 98px);
  width: 25vw;
  min-width: 25vw;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1%;

  flex: 1;
  margin: 0 0.2%;
  padding: 0.3%;

  background-color: white;

  border: 1px solid #13d0b7;
  border-radius: 4px;
`;

const SubContainer = styled(Grid)`
  height: calc(100vh - 104px);
  width: 100%;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1%;

  flex: 1;
  margin: 0 0.2%;
  padding: 2%;

  background-color: #f8f8ff;

  border: 1px solid #13d0b7;
  border-radius: 4px;
`;

export const TranscribeButton = styled(UnSelectedButton)`
  // height: 88%;
  width: 98%;
  margin: auto;

  background-color: #bacbba;
  color: white;
  font-size: 0.95rem;
  letter-spacing: 1px;
  white-space: nowrap;

  &:hover {
    background-color: #a5b4a5;
    color: white;
  }
  &:disabled {
    background-color: #e9e9e9;
    color: lightgray;
    border: 1px solid lightgray;
  }
`;

export default function SavedPhoneCallsList() {
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useTranscriptionContext();
  console.log(state);
  const { phoneCallListState, selectedPhoneCall, transcriptionModeState, checked } =
    state;

  const [test, setTest] = useState<string>('');

  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);

  // fetch saved phone calls
  const getSavedPhoneCalls = async (): Promise<void> => {
    const response = await fetchPhoneCalls();
    if (response.data) {
      console.log('response.data', response.data);

      dispatch({
        type: 'UPDATE_SAVED_PHONE_CALLS',
        payload: response.data,
      });

      dispatch({
        type: 'UPDATE_SEARCHED_PHONE_CALLS',
        payload: response.data,
      });
    } else {
      // snackbar.updateSnackbar(true, 'error', 'Error Fetching Phone Calls');
    }
  };

  const handleToggle = (selected: any) => () => {
    dispatch({
      type: 'UPDATE_SELECTED_PHONE_CALL',
      payload: selected,
    });
    dispatch({
      type: 'SET_CURRENT_MODE',
      payload: 'Notes',
    });
    
    dispatch({
      type: 'SET_CHECKED',
      payload: false,
    });
  };

  //-- IMPORTANT --//
  // TODO: create function to delete phone call from db

  const handleSearchChange = (event) => {
    dispatch({ type: 'UPDATE_LIST_SEARCH', payload: event.target.value });
  };

  const handleTranscribe = async () => {
    dispatch({
      type: 'UPDATE_TRANSCRIPTION_LOADING',
      payload: true,
    });
    const response = await performTranscription(
      phoneCallListState?.selected?.id
    );
    if (response) {
      dispatch({
        type: 'SET_CURRENT_MODE',
        payload: 'Notes',
      });
      dispatch({
        type: 'SET_SELECTED_PHONE_CALL',
        payload: response.data.phone_call,
      });
      handleWebSocketConnection();
      dispatch({
        type: 'UPDATE_TRANSCRIPTION_LOADING',
        payload: false,
      });
    } else {
      dispatch({
        type: 'UPDATE_TRANSCRIPTION_LOADING',
        payload: false,
      });
      // snackbar.updateSnackbar(true, 'error', 'Error Transcribing Phone Call');
    }
  };

  const handleWebSocketConnection = () => {
    const wsOptions = {
      WebSocket: WebSocket,
      connectionTimeout: 1000,
      maxRetries: 10,
    };

    const ws = new ReconnectingWebSocket(
      'wss://simplxx.org/ws/transcription/status/',
      [],
      wsOptions
    );

    ws.addEventListener('message', (event) => {
      console.log('Web socket');
      console.log(event);
      const data = JSON.parse(event.data);

      if (data.phone_call) {
        if (selectedPhoneCall.id === data.phone_call.id)
          dispatch({
            type: 'SET_SELECTED_PHONE_CALL',
            payload: data.phone_call,
          });
        if (data.phone_call.transcription_status_step === '5') {
          console.log('Closing the connection');
          ws.close();
        }
      } else {
        console.log('No uuid or status');
      }

      // Check for the 'completed' status and close the connection
    });

    setSocket(ws);

    return ws;
  };

  useEffect(() => {
    getSavedPhoneCalls();
  }, []);

  useEffect(() => {
    const getSelectedPhoneCallInstance = async () => {
      try {
        const response = await fetchPhoneCall(phoneCallListState?.selected?.id);
        if (response) {
          dispatch({
            type: 'SET_SELECTED_PHONE_CALL',
            payload: response.data,
          });
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSelectedPhoneCallInstance();
  }, [phoneCallListState?.selected]);

  useEffect(() => {
    const getTranscriptionInstance = async () => {
      if (selectedPhoneCall?.transcription) {
        try {
          const response = await fetchTranscription(
            selectedPhoneCall?.transcription.id
          );
          if (response) {
            dispatch({
              type: 'UPDATE_SELECTED_TRANSCRIPTION',
              payload: response.data,
            });
          } else {
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getTranscriptionInstance();
  }, [selectedPhoneCall]);

  useEffect(() => {
    const getTranscriptionNotes = () => {
      const notes = transcriptionModeState.selectedTranscription.notes;

      if (!transcriptionModeState.selectedTranscription.notes) {
        return;
      }

      let temp: any = [];
      Object.entries(notes).forEach(([key, value]) => {
        const currNote = { noteHeader: key, noteContent: value };
        temp.push(currNote);
      });

      dispatch({
        type: 'UPDATE_SELECTED_TRANSCRIPTION_NOTES',
        payload: temp,
      });
    };

    if (transcriptionModeState.selectedTranscription) {
      getTranscriptionNotes();
    }

    if (selectedPhoneCall?.transcription_status === 'processing') {
      dispatch({
        type: 'UPDATE_TRANSCRIPTION_STATUS',
        payload: selectedPhoneCall?.transcription_status_step,
      });
    }
  }, [transcriptionModeState.selectedTranscription]);

  useEffect(() => {
    getSavedPhoneCalls();
  }, [phoneCallListState.refresh]);

  // TODO: update filteredItems value base on search value

  const isTranscribeDisabled =
    !phoneCallListState?.selected ||
    selectedPhoneCall?.transcription_status !== 'awaiting';

  return (
    <Container>
      <SavedList
        savedItems={phoneCallListState?.filteredItems}
        search={phoneCallListState?.search}
        loading={phoneCallListState?.loading}
        selected={phoneCallListState?.selected}
        listType='phoneCalls'
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
      <TranscribeButton
        disabled={isTranscribeDisabled}
        onClick={handleTranscribe}
      >
        Transcribe
      </TranscribeButton>
    </Container>
  );
}
