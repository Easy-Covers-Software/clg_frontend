'use client';

import { useEffect, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';

import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

import { Typography } from '@mui/material';

import CoverLetterSummary from '@/components/CoverLetterSummay/CoverLetterSummary';

import TranscriptionNote from '@/components/Transcription/TranscriptionNote/TranscriptionNote';
import NewCall from '@/components/PhoneCallComponents/NewCall/NewCall';
import CallStarted from '@/components/PhoneCallComponents/CallStarted/CallStarted';
import CallRinging from '@/components/PhoneCallComponents/CallRinging/CallRinging';
import CallInProgress from '@/components/PhoneCallComponents/CallInProgress/CallInProgress';
import CallComplete from '@/components/PhoneCallComponents/CallComplete/CallComplete';
import CallBusy from '@/components/PhoneCallComponents/CallBusy/CallBusy';
import CallNoAnswer from '@/components/PhoneCallComponents/CallNoAnswer/CallNoAnswer';
import CallFailed from '@/components/PhoneCallComponents/CallFailed/CallFailed';
import CallCompleteFrame from '@/components/PhoneCallComponents/CallCompleteFrame';

import { TranscriptionMethods, JobPostingMethods } from '@/Utils/utils';
const { initiatePhoneCall, updateCandidate, deleteCandidate } =
  TranscriptionMethods;
const { fetchJobPostings } = JobPostingMethods;

import TranscriptionProgress from '@/components/Transcription/TranscriptionInProgress/TranscriptionProgress';

import ReconnectingWebSocket from 'reconnecting-websocket';

import SelectionSummary from '@/components/SelectionSummary/SelectionSummary';
import TranscriptionNotes from '../../../components/Transcription/TranscriptionNotes';

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
  // width: 100%;
  margin: 0.75%;
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
  const { state, dispatch } = useTranscriptionContext();
  const {
    phoneCallListState,
    selectedPhoneCall,
    notesHeaderSummaryState,
    transcriptionModeState,
    callModeState,
    currentMode,
    jobPostings,
    newCallForm,
    candidateSaveForm,
    newCandidateId,
  } = state;

  const [checked, setChecked] = useState(true);
  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
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
  };

  const handleInitiatePhoneCall = async (
    event,
    candidateName: string,
    phone: string,
    jobPosting: string
  ) => {
    event.preventDefault(); // This line prevents the default form submission action

    dispatch({
      type: 'UPDATE_CALL_MODE_STATUS',
      payload: 'initiated',
    });

    const response = await initiatePhoneCall(candidateName, phone, jobPosting);

    if (response) {
      console.log('init response');
      console.log(response.data);
      console.log(response.data.candidate_profile);
      dispatch({
        type: 'SET_NEW_CANDIDATE_ID',
        payload: response.data.candidate_profile.id,
      });

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
      'wss://asgi:8001/ws/phone_calls/status/',
      [],
      wsOptions
    );

    ws.addEventListener('message', (event) => {
      console.log('Web socket');
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.call_status) {
        dispatch({
          type: 'UPDATE_CALL_MODE_STATUS',
          payload: data.call_status,
        });
      }
      // Check for the 'completed' status and close the connection
      if (data.call_status === 'completed') {
        console.log('Closing the connection');
        // refresh list of calls
        dispatch({
          type: 'REFRESH_PHONE_CALLS_LIST',
        });
        ws.close();
      }
    });

    setSocket(ws);

    return ws;
  };

  const updateNewCallForm = (formData) => {
    dispatch({
      type: 'UPDATE_NEW_CALL_FORM',
      payload: formData,
    });
  };

  const updateSaveForm = (formData) => {
    dispatch({
      type: 'UPDATE_CALL_COMPLETE_FORM',
      payload: formData,
    });
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
    dispatch({
      type: 'UPDATE_CALL_MODE_STATUS',
      payload: 'new',
    });
  };

  const handleDontSave = async (candidateId) => {
    const response = await deleteCandidate(candidateId);
    snackbar.updateSnackbar(true, 'success', 'Candidate profile deleted');
    resetCallMode();
    // if (response) {

    // } else {
    //   snackbar.updateSnackbar(true, 'error', `Error: ${response.error}}`);
    // }
  };

  useEffect(() => {
    // Close the WebSocket connection when the component unmounts.
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  // TODO: is this doing anything?
  useEffect(() => {
    dispatch({
      type: 'UPDATE_TRANSCRIPTION_STATE_PHONE_CALL',
      payload: phoneCallListState.selected,
    });
  }, [phoneCallListState.selected]);

  useEffect(() => {
    const getJobPostings = async (): Promise<void> => {
      const response = await fetchJobPostings();
      if (response) {
        dispatch({
          type: 'SET_JOB_POSTINGS',
          payload: response.data,
        });
      } else {
        snackbar.updateSnackbar(true, 'Error fetching job postings', 'error');
      }
    };

    getJobPostings();
  }, []);

  const renderPhoneCallComponent = () => {
    switch (callModeState.status) {
      case 'new':
        return (
          <CallsContainer>
            <NewCall
              handleInitiatePhoneCall={handleInitiatePhoneCall}
              updateNewCallForm={updateNewCallForm}
              jobPostings={jobPostings}
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
              candidateId={newCandidateId}
              candidateName={newCallForm.candidate_name}
              candidateNumber={newCallForm.candidate_number}
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
              jobPostings={jobPostings}
            />
            ;
          </CallsContainer>
        );
      // return <NewCall handleInitiatePhoneCall={handleInitiatePhoneCall} />;
    }
  };

  const renderTranscriptionNotesComponent = () => {
    switch (selectedPhoneCall?.transcription_status) {
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
              step={selectedPhoneCall?.transcription_status_step}
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
            transcriptionNotes={selectedPhoneCall?.transcription?.notes}
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
        summaryDetails={notesHeaderSummaryState}
        checked={checked}
        handleChange={handleChange}
      />
      {/* <SubContainer
        style={{
          display:
            currentMode === 'Notes' &&
            selectedPhoneCall?.transcription_status === 'complete' &&
            transcriptionModeState.transcriptionNotes !== null
              ? 'grid'
              : 'flex',
          gridTemplateColumns: currentMode === 'Notes' ? '1fr 1fr' : '',
          gap: currentMode === 'Notes' ? '12px' : '4px',
          width:
            phoneCallListState.selected ||
            selectedPhoneCall?.transcription_status === 'processing'
              ? '98%'
              : '',
        }}
      > */}
      {currentMode === 'Notes' ? (
        <>
          {renderTranscriptionNotesComponent()}
          {/* {transcriptionState?.transcriptionNotes?.length > 0 ? (
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
            )} */}
        </>
      ) : (
        <>{renderPhoneCallComponent()}</>
      )}
      {/* </SubContainer> */}
    </Container>
  );
}
