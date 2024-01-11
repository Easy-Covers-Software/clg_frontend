import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import styled from '@emotion/styled';
// Context
import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';
import { getErrorMessage } from '@/Utils/utils';

// Components (global)
import SavedList from '@/components/PageStructure/SavedList/SavedList';
import { UnSelectedButton, PrimaryButton } from '@/components/Global/Global';

import ReconnectingWebSocket from 'reconnecting-websocket';

import { fetchFullCandidateProfile } from '@/api/CandidateProfileMethods';

import {
  fetchPhoneCall,
  fetchPhoneCalls,
  fetchTranscription,
  performTranscription,
} from '@/api/TranscriptionMethods';

import {
  ListContainer,
  TranscribeButton,
} from '../TranscriptionSection.styles';
import { get } from 'http';

export default function SavedPhoneCallsList() {
  const { state: authState } = useAuth();
  const { loggedInProps, snackbar } = authState;

  const { state } = useTranscriptionContext();
  const { listState, selectedListItem, bodyState } = state;

  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);

  //=== Helpers ===//
  const handleToggle = (selected: any) => () => {
    listState.updateSelected(selected);
    bodyState.updateMode('Notes');
  };

  const handleSearchChange = (searchValue) => {
    listState.updateSearch(searchValue);
  };

  //=== API Methods ===//
  const handleTranscribe = async () => {
    bodyState.updateTranscriptionModeState('loading', true);
    const response: any = await performTranscription(listState?.selected?.id);
    if (response.data) {
      bodyState.updateMode('Notes');
      listState.updateSelectedPhoneCall(response.data.phone_call);
      handleWebSocketConnection();
      bodyState.updateTranscriptionModeState('loading', false);
    } else {
      bodyState.updateTranscriptionModeState('loading', false);
      snackbar.updateSnackbar(
        true,
        'error',
        `Error! ${getErrorMessage(response.error)}`
      );
    }
  };

  const getSavedPhoneCalls = async (): Promise<void> => {
    const response: any = await fetchPhoneCalls();
    if (response.data) {
      console.log('response.data', response.data);
      listState.updateListItems(response.data);
      listState.updateFilteredListItems(response.data);
    } else {
      console.error(`Error! ${getErrorMessage(response.error)}`);
      // snackbar.updateSnackbar(
      //   true,
      //   'error',
      //   `Error! ${response.error.response.data}`
      // );
    }
  };

  //==== Web Socket ===//
  const handleWebSocketConnection = async () => {
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
        // IMPORTANT TODO: no longer using 1-5 steps
        if (data.phone_call.transcription_status === 'complete') {
          if (selectedListItem?.id === data.phone_call.id) {
            listState.updateSelected(data.phone_call);
          }
          console.log('Closing the connection');
          console.log(data.phone_call);
          ws.close();
        } else {
          if (selectedListItem?.id === data.phone_call.id) {
            listState.updateSelected(data.phone_call);
          }
        }
      } else {
        console.log('No uuid or status');
      }
    });

    setSocket(ws);
    return ws;
  };

  //=== Hooks ===//
  useEffect(() => {
    if (loggedInProps.user) {
      getSavedPhoneCalls();
    }
  }, [loggedInProps.user]);

  useEffect(() => {
    const getTranscriptionInstance = async () => {
      if (selectedListItem?.transcription) {
        try {
          const response = await fetchTranscription(listState?.selected.id);
          if (response.data) {
            console.log('transcription instnace', response.data);
            bodyState.updateTranscriptionModeState(
              'selectedTranscription',
              response.data
            );
          } else {
          }
        } catch (error) {
          console.log('Error getting transcription instance:', error);
        }
      }
    };

    const getSelectedPhoneCallInstance = async () => {
      try {
        const response: any = await fetchPhoneCall(listState?.selected?.id);
        if (response.data) {
          listState.updateSelectedPhoneCall(response.data);
        } else {
          console.error(`Error! ${getErrorMessage(response.error)}`);
          // snackbar.updateSnackbar(
          //   true,
          //   'error',
          //   `Error! ${response.error.response.data}`
          // );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSelectedPhoneCallInstance();
    getTranscriptionInstance();
  }, [listState?.selected]);

  // TODO: want to get rid of this code
  useEffect(() => {
    const getCandidateInstance = async () => {
      if (selectedListItem?.candidate) {
        try {
          const response: any = await fetchFullCandidateProfile(
            selectedListItem?.candidate.id
          );
          if (response.data) {
            bodyState.updateTranscriptionModeState(
              'selectedCandidate',
              response.data
            );
          } else {
            console.error(`Error! ${getErrorMessage(response.error)}`);
            // snackbar.updateSnackbar(
            //   true,
            //   'error',
            //   `Error! ${getErrorMessage(response.error)}`
            // );
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getCandidateInstance();
    // getTranscriptionInstance();
  }, [selectedListItem]);

  // TODO: i think this is how i am refreshing the notes once the async transcription is completed -- need to update this to new loading structure
  useEffect(() => {
    const getTranscriptionNotes = () => {
      const notes =
        bodyState.transcriptionModeState?.selectedTranscription.notes;

      if (!bodyState.transcriptionModeState?.selectedTranscription?.notes) {
        return;
      }

      let temp: any = [];
      Object.entries(notes).forEach(([key, value]) => {
        const currNote = { noteHeader: key, noteContent: value };
        temp.push(currNote);
      });

      bodyState.updateTranscriptionModeState(
        'selectedTranscriptionNotes',
        temp
      );
      // dispatch({
      //   type: 'UPDATE_SELECTED_TRANSCRIPTION_NOTES',
      //   payload: temp,
      // });
    };

    if (bodyState.transcriptionModeState?.selectedTranscription) {
      // getTranscriptionNotes();
    }

    if (selectedListItem?.transcription_status === 'processing') {
      // dispatch({
      //   type: 'UPDATE_TRANSCRIPTION_STATUS',
      //   payload: selectedListItem?.transcription_status_step,
      // });
    }
  }, [bodyState.transcriptionModeState.selectedTranscription]);

  useEffect(() => {
    getSavedPhoneCalls();
  }, [listState.refresh]);

  useEffect(() => {
    // Close the WebSocket connection when the component unmounts.
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const isTranscribeDisabled =
    !listState?.selected ||
    selectedListItem?.transcription_status !== 'awaiting';

  return (
    <ListContainer>
      <SavedList
        listType="phoneCalls"
        items={listState?.filteredListItems}
        search={listState?.search}
        loading={listState?.loading}
        selected={listState?.selected}
        handleNewSelection={handleToggle}
        handleSearchChange={handleSearchChange}
        handleDelete={() => {}}
      />
      <TranscribeButton
        disabled={isTranscribeDisabled}
        onClick={handleTranscribe}
      >
        Transcribe
      </TranscribeButton>
    </ListContainer>
  );
}
