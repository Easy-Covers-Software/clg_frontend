import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Using Box as a container
import { NotesProcessingContainer } from '@/sections/TranscriptionSection/TranscriptionSection.styles';

const AiNotesInProgress = () => {
  return (
    <NotesProcessingContainer>
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
          Transcription completed successfully! AI notes are being generated...
        </Typography>
      </Paper>
    </NotesProcessingContainer>
  );
};

export default AiNotesInProgress;
