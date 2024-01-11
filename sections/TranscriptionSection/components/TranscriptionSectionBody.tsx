'use client';

import { useEffect, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';

import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

import { Typography } from '@mui/material';


import TranscriptionNote from '@/components/CallsPage/Transcription/TranscriptionNote/TranscriptionNote';
import NewCall from '@/components/CallsPage/PhoneCallComponents/NewCall/NewCall';
import CallStarted from '@/components/CallsPage/PhoneCallComponents/CallStarted/CallStarted';
import CallRinging from '@/components/CallsPage/PhoneCallComponents/CallRinging/CallRinging';
import CallInProgress from '@/components/CallsPage/PhoneCallComponents/CallInProgress/CallInProgress';
import CallComplete from '@/components/CallsPage/PhoneCallComponents/CallComplete/CallComplete';
import CallBusy from '@/components/CallsPage/PhoneCallComponents/CallBusy/CallBusy';
import CallNoAnswer from '@/components/CallsPage/PhoneCallComponents/CallNoAnswer/CallNoAnswer';
import CallFailed from '@/components/CallsPage/PhoneCallComponents/CallFailed/CallFailed';
import CallCompleteFrame from '@/components/CallsPage/PhoneCallComponents/CallCompleteFrame';

import {
  initiatePhoneCall,
  updateCandidate,
  deleteCandidate,
} from '@/api/TranscriptionMethods';

import { fetchJobPostings } from '@/api/JobPostingsMethods';

import TranscriptionProgress from '@/components/CallsPage/Transcription/TranscriptionInProgress/TranscriptionProgress';

import ReconnectingWebSocket from 'reconnecting-websocket';

import SelectionSummary from '@/components/PageStructure/SelectionSummary/SelectionSummary';
import TranscriptionNotes from '../../../components/CallsPage/Transcription/TranscriptionNotes';

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 98px);
  max-height: calc(100vh - 98px);
  min-height: calc(100vh - 98px);
  display: flex;
  flex-direction: column;
  margin-left: 0.3%;
  background-color: white;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
  }
`;

const SubContainer = styled(Grid)`
  height: 100%;
  width: 98.5% !important;
  margin: 0.75%;
  margin-top: 0;
  background-color: #f8f8ff;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #006d4b;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const CallsContainer = styled(Grid)`
  height: 100%;
  display: flex;
  margin: 0.75%;

  flex-direction: column;
  justify-content: space-between;
  // align-items: space-between;

  background-color: #f8f8ff;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #006d4b;
  border-radius: 4px;

  justify-content: center;
  align-items: center;
`;

const NotesCallSelectedContainer = styled(SubContainer)`
  width: 98%;
  gap 12px;
`;

const NotesContainer = styled(SubContainer)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotesProcessingContainer = styled(SubContainer)`
  width: 98%;
  gap 12px;
`;

const NotesCompleteContainer = styled(NotesContainer)`
  width: 98%;
  gap: 12px;
`;

export default function TranscriptionSectionBody() {
  const { state: authState } = useAuth();
  const { snackbar } = authState;
  const { state } = useTranscriptionContext();
  const {
    listState,
    selectedListItem,
    bodyState,
  } = state;

  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      bodyState.updateMode('Call')
    } else {
      bodyState.updateMode('Notes')
    }
  };

  const handleInitiatePhoneCall = async (
    event,
    candidateName: string,
    phone: string,
    jobPosting: string
  ) => {
    event.preventDefault(); // This line prevents the default form submission action
    bodyState.updateCallModeState('callStatus', 'initiated')
    const response = await initiatePhoneCall(candidateName, phone, jobPosting);

    if (response) {
      bodyState.updateCallModeState('newCallCandidateId', response.data.candidate_profile.id)
      bodyState.updateCallModeState('newCallJobPostingId', response.data.job_posting_id)
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
      'wss://simplxx.org/ws/phone_calls/status/',
      [],
      wsOptions
    );

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.call_status) {
        bodyState.updateCallModeState('callStatus', data.call_status)
      }
      if (data.call_status === 'completed') {
        console.log('Closing the connection');
        listState.toggleRefresh();
        ws.close();
      }
    });
    setSocket(ws);
    return ws;
  };

  const updateNewCallForm = (formData) => {
    bodyState.updateCallModeState('newCallForm', formData)
  };

  const updateSaveForm = (formData) => {
    bodyState.updateCallModeState('callCompleteForm', formData)
  };

  const saveCandidateProfile = async (candidateId, data) => {
    const response = await updateCandidate(candidateId, data);
    if (response.data) {
      snackbar.updateSnackbar(true, 'success', 'Candidate profile saved');
      resetCallMode();
    } else {
      snackbar.updateSnackbar(true, 'error', `Error: ${response.error}}`);
    }
  };

  const resetCallMode = () => {
    bodyState.updateCallModeState('callStatus', 'new')
  };

  const handleDontSave = async (candidateId) => {
    const response = await deleteCandidate(candidateId);
    snackbar.updateSnackbar(true, 'success', 'Candidate profile deleted');
    resetCallMode();
  };

  useEffect(() => {
    // Close the WebSocket connection when the component unmounts.
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const renderPhoneCallComponent = () => {
    switch (bodyState.callModeState.callStatus) {
      case 'new':
        return (
          <CallsContainer>
            <NewCall
              handleInitiatePhoneCall={handleInitiatePhoneCall}
              updateNewCallForm={updateNewCallForm}
              jobPostings={bodyState.callModeState.availableJobPostings}
            />
            ;
          </CallsContainer>
        );
      case 'initiated':
        return (
          <CallsContainer>
            <CallStarted />;
          </CallsContainer>
        );
      case 'ringing':
        return (
          <CallsContainer>
            <CallRinging />;
          </CallsContainer>
        );
      case 'in-progress':
        return (
          <CallsContainer>
            <CallInProgress />;
          </CallsContainer>
        );
      case 'complete':
        return (
          <CallsContainer>
            {/* <CallComplete />; */}
            <></>
          </CallsContainer>
        );
      case 'busy':
        return (
          <CallsContainer>
            <CallBusy />;
          </CallsContainer>
        );

      case 'no-answer':
        return (
          <CallsContainer>
            <CallNoAnswer />
          </CallsContainer>
        );

      case 'failed':
        return (
          <CallsContainer>
            <CallFailed />
          </CallsContainer>
        );

      case 'completed':
        return (
          <CallsContainer>
            <CallCompleteFrame
              candidateId={bodyState.callModeState.newCallCandidateId}
              candidateName={bodyState.callModeState.newCallForm.candidate_name}
              candidateNumber={
                bodyState.callModeState.newCallForm.candidate_number
              }
              jobPosting={bodyState.callModeState.newCallId}
              updateSaveForm={updateSaveForm}
              handleSaveCandidate={saveCandidateProfile}
              reset={handleDontSave}
            />
          </CallsContainer>
        );

      default:
        return (
          <CallsContainer>
            <NewCall
              handleInitiatePhoneCall={handleInitiatePhoneCall}
              updateNewCallForm={updateNewCallForm}
              jobPostings={bodyState.callModeState.availableJobPostings}
            />
            ;
          </CallsContainer>
        );
    }
  };

  const renderTranscriptionNotesComponent = () => {
    switch (selectedListItem?.transcription_status) {
      case 'awaiting':
        return (
          <NotesContainer>
            <Paper
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20%',
                height: '30%',
                width: '50%',
                padding: '1%',
                border: '3px solid #13d0b7',
              }}
            >
              <Typography
                style={{
                  textAlign: 'center',
                  fontSize: '1.5rem',
                }}
              >
                This phone call has not been transcribed yet. Please click the
                transcribe button to take notes on your phone call
              </Typography>
            </Paper>
          </NotesContainer>
        );
      case 'processing':
        return (
          <NotesProcessingContainer>
            <TranscriptionProgress
              step={selectedListItem?.transcription_status_step}
            />
          </NotesProcessingContainer>
        );
      case 'ai-notes':
        return (
          <Paper
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20%',
              margin: 'auto',
              height: '30%',
              width: '50%',
              padding: '1%',
            }}
          >
            <Typography
              style={{
                textAlign: 'center',
                fontSize: '1.5rem',
              }}
            >
              Transcription completed successfully! AI notes are being
              generated...
            </Typography>
          </Paper>
        );

      case 'complete':
        return (
          <TranscriptionNotes
            page={'transcription'}
            transcriptionNotes={selectedListItem?.transcription?.notes}
          />
        );
      default:
        return (
          <NotesContainer>
            <Paper
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20%',
                height: '30%',
                width: '50%',
                padding: '1%',
                border: '3px solid #13d0b7',
              }}
            >
              <Typography fontSize={'2.2rem'}>Select a Phone Call</Typography>
            </Paper>
          </NotesContainer>
        );
    }
  };

  return (
    <Container>
      <SelectionSummary
        summaryDetails={bodyState.selectionSummaryState}
        checked={bodyState.mode === 'Notes' ? false : true}
        handleChange={handleChange}
      />

      {bodyState.mode === 'Notes' ? (
        <>
          {renderTranscriptionNotesComponent()}
        </>
      ) : (
        <>{renderPhoneCallComponent()}</>
      )}
    </Container>
  );
}
