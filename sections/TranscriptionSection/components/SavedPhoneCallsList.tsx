import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import styled from '@emotion/styled';
// Context
import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

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

import { ListContainer, TranscribeButton } from '../TranscriptionSection.styles';


export default function SavedPhoneCallsList() {
  const { state: authState } = useAuth();
  const { loggedInProps, snackbar } = authState;

  const { state } = useTranscriptionContext();
  const {
    listState,
    selectedListItem,
    bodyState,
  } = state;

  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);

  // fetch saved phone calls
  const getSavedPhoneCalls = async (): Promise<void> => {
    const response = await fetchPhoneCalls();
    if (response.data) {
      console.log('response.data', response.data);
      listState.updateListItems(response.data);
      listState.updateFilteredListItems(response.data);
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error Fetching Phone Calls');
    }
  };

  const handleToggle = (selected: any) => () => {
    listState.updateSelected(selected);
    bodyState.updateMode('Notes');
  };

  //-- IMPORTANT --//
  const handleSearchChange = (searchValue) => {
    listState.updateSearch(searchValue);
  };

  const handleTranscribe = async () => {
    bodyState.updateTranscriptionModeState('loading', true);
    const response = await performTranscription(listState?.selected?.id);
    if (response) {
      bodyState.updateMode('Notes');
      listState.updateSelectedPhoneCall(response.data.phone_call);
      handleWebSocketConnection();
      bodyState.updateTranscriptionModeState('loading', false);
    } else {
      bodyState.updateTranscriptionModeState('loading', false);
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
        if (selectedListItem?.id === data.phone_call.id)
          listState.updateSelectedPhoneCall(data.phone_call);

        // IMPORTANT TODO: no longer using 1-5 steps
        if (data.phone_call.transcription_status_step === '5') {
          console.log('Closing the connection');
          ws.close();
        }
      } else {
        console.log('No uuid or status');
      }
    });

    setSocket(ws);
    return ws;
  };


  useEffect(() => {
    if (loggedInProps.user) {
      getSavedPhoneCalls();
    }
  }, [loggedInProps.user]);


  useEffect(() => {
    const getSelectedPhoneCallInstance = async () => {
      try {
        const response = await fetchPhoneCall(listState?.selected?.id);
        if (response) {
          listState.updateSelectedPhoneCall(response.data);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSelectedPhoneCallInstance();
  }, [listState?.selected]);


  // TODO: want to get rid of this code
  useEffect(() => {
    const getTranscriptionInstance = async () => {
      if (selectedListItem?.transcription) {
        try {
          const response = await fetchTranscription(
            selectedListItem?.transcription.id
          );
          if (response) {
            bodyState.updateTranscriptionModeState('selectedTranscription', response.data);
          } else {
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getCandidateInstance = async () => {
      if (selectedListItem?.candidate) {
        try {
          const response = await fetchFullCandidateProfile(
            selectedListItem?.candidate.id
          );
          if (response) {
            bodyState.updateTranscriptionModeState('selectedCandidate', response.data);
          } else {
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
      
      bodyState.updateTranscriptionModeState('selectedTranscriptionNotes', temp);
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
