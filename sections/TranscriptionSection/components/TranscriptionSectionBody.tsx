'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

import NewCall from '@/components/CallsPage/PhoneCallComponents/NewCall/NewCall';
import CallStarted from '@/components/CallsPage/PhoneCallComponents/CallStarted/CallStarted';
import CallRinging from '@/components/CallsPage/PhoneCallComponents/CallRinging/CallRinging';
import CallInProgress from '@/components/CallsPage/PhoneCallComponents/CallInProgress/CallInProgress';
import CallBusy from '@/components/CallsPage/PhoneCallComponents/CallBusy/CallBusy';
import CallNoAnswer from '@/components/CallsPage/PhoneCallComponents/CallNoAnswer/CallNoAnswer';
import CallFailed from '@/components/CallsPage/PhoneCallComponents/CallFailed/CallFailed';
import CallCompleteFrame from '@/components/CallsPage/PhoneCallComponents/CallCompleteFrame';

import {
  initiatePhoneCall,
  updateCandidate,
  deleteCandidate,
} from '@/api/TranscriptionMethods';

import TranscriptionProgress from '@/components/CallsPage/Transcription/TranscriptionInProgress/TranscriptionProgress';
import ReconnectingWebSocket from 'reconnecting-websocket';
import SelectionSummary from '@/components/PageStructure/SelectionSummary/SelectionSummary';
import TranscriptionNotes from '../../../components/CallsPage/Transcription/TranscriptionNotes';
import AwaitingTranscription from '@/components/CallsPage/Transcription/AwaitingTranscription/AwaitingTranscription';
import AiNotesInProgress from '@/components/CallsPage/Transcription/AiNotesInProgress/AiNotesInProgress';
import { BodyContainer } from '../TranscriptionSection.styles';
import SelectCall from '@/components/CallsPage/Transcription/SelectCall/SelectCall';

export default function TranscriptionSectionBody() {
  const { state: authState } = useAuth();
  const { snackbar } = authState;
  const { state } = useTranscriptionContext();
  const { listState, selectedListItem, bodyState } = state;

  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      bodyState.updateMode('Call');
    } else {
      bodyState.updateMode('Notes');
    }
  };

  const handleInitiatePhoneCall = async (
    event,
    candidateName: string,
    phone: string,
    jobPosting: string
  ) => {
    event.preventDefault(); // This line prevents the default form submission action
    bodyState.updateCallModeState('callStatus', 'initiated');
    const response = await initiatePhoneCall(candidateName, phone, jobPosting);

    if (response) {
      bodyState.updateCallModeState(
        'newCallCandidateId',
        response.data.candidate_profile.id
      );
      bodyState.updateCallModeState(
        'newCallJobPostingId',
        response.data.job_posting_id
      );
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
        bodyState.updateCallModeState('callStatus', data.call_status);
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
    bodyState.updateCallModeState('newCallForm', formData);
  };

  const updateSaveForm = (formData) => {
    bodyState.updateCallModeState('callCompleteForm', formData);
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
    bodyState.updateCallModeState('callStatus', 'new');
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
          <NewCall
            handleInitiatePhoneCall={handleInitiatePhoneCall}
            updateNewCallForm={updateNewCallForm}
            jobPostings={bodyState.callModeState.availableJobPostings}
          />
        );
      case 'initiated':
        return <CallStarted />;
      case 'ringing':
        return <CallRinging />;
      case 'in-progress':
        return <CallInProgress />;
      case 'completed':
        return (
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
        );
      case 'busy':
        return <CallBusy />;
      case 'no-answer':
        return <CallNoAnswer />;
      case 'failed':
        return <CallFailed />;

      default:
        return <h1>Error</h1>;
    }
  };

  const renderTranscriptionNotesComponent = () => {
    switch (selectedListItem?.transcription_status) {
      case 'awaiting':
        return <AwaitingTranscription />;
      case 'processing':
        return <TranscriptionProgress />;
      case 'ai-notes':
        return <AiNotesInProgress />;
      case 'complete':
        return (
          <TranscriptionNotes
            page={'transcription'}
            transcriptionNotes={selectedListItem?.transcription?.notes}
          />
        );
      default:
        return <SelectCall />;
    }
  };

  return (
    <BodyContainer>
      <SelectionSummary
        summaryDetails={bodyState.selectionSummaryState}
        checked={bodyState.mode === 'Notes' ? false : true}
        handleChange={handleChange}
      />

      {bodyState.mode === 'Notes' ? (
        <>{renderTranscriptionNotesComponent()}</>
      ) : (
        <>{renderPhoneCallComponent()}</>
      )}
    </BodyContainer>
  );
}
