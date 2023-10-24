import { useState, useEffect } from 'react';
import { Container } from './SavedPhoneCalls.styles';

import styled from '@emotion/styled';
// Context
import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

// Components (global)
import SavedList from '@/components/SavedList/SavedList';
import { UnSelectedButton, PrimaryButton } from '@/components/Global/Global';

import ReconnectingWebSocket from 'reconnecting-websocket';

import { TranscriptionMethods } from '@/Utils/utils';
const { fetchPhoneCalls, performTranscription } = TranscriptionMethods;

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

export default function SavedPhoneCalls() {
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useTranscriptionContext();
  console.log(state);
  const { phoneCallState, transcriptionState } = state;

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
        type: 'UPDATE_FILTERED_PHONE_CALLS',
        payload: response.data,
      });
    } else {
      snackbar?.updateSnackbar(true, 'error', 'Error Fetching Phone Calls');
    }
  };

  const handleToggle = (selected: any) => () => {
    dispatch(
      {
        type: 'UPDATE_SELECTED_PHONE_CALL',
        payload: selected,
      },
      ''
    );
  };

  const handleSearchChange = (event) => {
    dispatch({ type: 'UPDATE_SEARCH', payload: event.target.value }, '');
  };

  const handleTranscribe = async () => {
    // const response = await performTranscription(phoneCallState?.selected?.id);
    const response = true;
    if (response) {
      dispatch({
        type: 'UPDATE_TRANSCRIPTION_LOADING',
        payload: !transcriptionState?.loading,
      });
      dispatch({
        type: 'SET_CURRENT_MODE',
        payload: 'Notes',
      });
      handleWebSocketConnection();
      snackbar?.updateSnackbar(
        true,
        'success',
        'Phone Call Transcription Initiated.'
      );
    } else {
      snackbar?.updateSnackbar(true, 'error', 'Error Transcribing Phone Call');
    }
  };

  const handleWebSocketConnection = () => {
    const wsOptions = {
      WebSocket: WebSocket,
      connectionTimeout: 1000,
      maxRetries: 10,
    };

    const ws = new ReconnectingWebSocket(
      'ws://127.0.0.1:8001/ws/transcription/status/',
      [],
      wsOptions
    );

    ws.addEventListener('message', (event) => {
      console.log('Web socket');
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.transcription_status) {
        dispatch({
          type: 'UPDATE_TRANSCRIPTION_STATUS',
          payload: data.transcription_status,
        });
      }
      // Check for the 'completed' status and close the connection
      if (data.call_status === 'completed') {
        console.log('Closing the connection');
        ws.close();
      }
    });

    setSocket(ws);

    return ws;
  };

  useEffect(() => {
    getSavedPhoneCalls();
  }, []);

  const isTranscribeDisabled =
    !phoneCallState?.selected || transcriptionState?.loading;

  return (
    <Container>
      <SavedList
        savedItems={phoneCallState?.filteredItems}
        search={phoneCallState?.search}
        loading={phoneCallState?.loading}
        selected={phoneCallState?.selected}
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
