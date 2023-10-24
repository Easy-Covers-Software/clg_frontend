'use client';

import { useEffect, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

import CoverLetterSummary from '@/components/CoverLetterSummay/CoverLetterSummary';

import TranscriptionNote from '@/components/TranscriptionNote/TranscriptionNote';
import NewCall from '@/components/PhoneCallComponents/NewCall/NewCall';
import CallStarted from '@/components/PhoneCallComponents/CallStarted/CallStarted';
import CallRinging from '@/components/PhoneCallComponents/CallRinging/CallRinging';
import CallInProgress from '@/components/PhoneCallComponents/CallInProgress/CallInProgress';
import CallComplete from '@/components/PhoneCallComponents/CallComplete/CallComplete';
import CallBusy from '@/components/PhoneCallComponents/CallBusy/CallBusy';
import CallNoAnswer from '@/components/PhoneCallComponents/CallNoAnswer/CallNoAnswer';
import CallFailed from '@/components/PhoneCallComponents/CallFailed/CallFailed';

import { TranscriptionMethods } from '@/Utils/utils';
const { initiatePhoneCall } = TranscriptionMethods;

import ReconnectingWebSocket from 'reconnecting-websocket';

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 98px);
  max-height: calc(100vh - 98px);
  min-height: calc(100vh - 98px);
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin-left: 0.3%;
  // padding-bottom: 2%;
  // padding: 2%;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
  }
`;

const SubContainer = styled(Grid)`
  height: 100%;
  margin: 0.75%;
  background-color: #f8f8ff;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #006d4b;
  border-radius: 4px;
  padding-bottom: 2%;
`;

export default function TranscriptionBody() {
  const { state: authState } = useAuth();
  const { snackbar } = authState;
  const { state, dispatch } = useTranscriptionContext();
  const {
    phoneCallState,
    notesHeaderSummaryState,
    transcriptionState,
    currentMode,
  } = state;

  const [checked, setChecked] = useState(false);
  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleInitiatePhoneCall = async (
    event,
    candidateName,
    phone,
    jobPosting,
    email,
    linkedin,
    portfolio,
    location
  ) => {
    event.preventDefault(); // This line prevents the default form submission action

    const response = await initiatePhoneCall(
      candidateName,
      phone,
      jobPosting,
      email,
      linkedin,
      portfolio,
      location
    );

    if (response) {
      console.log(response);
      snackbar.updateSnackbar(true, 'success', 'Phone Call Initiated.');
      handleWebSocketConnection();
    } else {
      console.log('Error initiating phone call');
      snackbar.updateSnackbar(true, 'error', 'Error initiating phone call');
    }
  };

  const handleWebSocketConnection = () => {
    const wsOptions = {
      WebSocket: WebSocket,
      connectionTimeout: 1000,
      maxRetries: 10,
    };

    const ws = new ReconnectingWebSocket(
      'ws://127.0.0.1:8001/ws/phone_calls/status/',
      [],
      wsOptions
    );

    ws.addEventListener('message', (event) => {
      console.log('Web socket');
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.call_status) {
        dispatch({
          type: 'UPDATE_CALL_STATUS',
          payload: data.call_status,
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

  const renderPhoneCallComponent = () => {
    switch (phoneCallState.callStatus) {
      case 'new':
        return <NewCall handleInitiatePhoneCall={handleInitiatePhoneCall} />;
      case 'initiated':
        return <CallStarted />;
      case 'ringing':
        return <CallRinging />;
      case 'in-progress':
        return <CallInProgress />;
      case 'complete':
        return <CallComplete />;
      case 'busy':
        return <CallBusy />;
      case 'no-answer':
        return <CallNoAnswer />;
      case 'failed':
        return <CallFailed />;
      case 'completed':
        return <CallComplete />;
      default:
        return <NewCall handleInitiatePhoneCall={handleInitiatePhoneCall} />;
    }
  };

  useEffect(() => {
    // Close the WebSocket connection when the component unmounts.
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_TRANSCRIPTION_STATE_PHONE_CALL',
      payload: phoneCallState.selected,
    });
  }, [phoneCallState.selected]);

  useEffect(() => {
    if (!checked) {
      dispatch({
        type: 'SET_CURRENT_MODE',
        payload: 'Notes',
      });
    } else {
      dispatch({
        type: 'SET_CURRENT_MODE',
        payload: 'Call',
      });
    }
  }, [checked]);

  return (
    <Container>
      <CoverLetterSummary
        summaryDetails={notesHeaderSummaryState}
        checked={checked}
        handleChange={handleChange}
      />
      <SubContainer
        style={{
          display: currentMode === 'Notes' ? 'grid' : '',
          gridTemplateColumns: currentMode === 'Notes' ? '1fr 1fr' : '',
          gap: currentMode === 'Notes' ? '12px' : '4px',
        }}
      >
        {currentMode === 'Notes' ? (
          <>
            {transcriptionState?.transcriptionNotes?.length > 0 ? (
              transcriptionState?.transcriptionNotes?.map((note) => (
                <TranscriptionNote
                  key={note.id || note.noteHeader} // Added a key prop for uniqueness
                  noteHeader={note?.noteHeader}
                  noteContent={note?.noteContent}
                />
              ))
            ) : (
              <Grid width={'100%'} display={'flex'} justifyContent={'center'}>
                <h1>Select a phone call to see notes</h1>
              </Grid>
            )}
          </>
        ) : (
          <>{renderPhoneCallComponent()}</>
        )}
      </SubContainer>
    </Container>
  );
}
