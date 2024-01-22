import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Using Box as a container
import { NotesContainer } from '@/sections/TranscriptionSection/TranscriptionSection.styles';

const AwaitingTranscription = () => {
  return (
    <NotesContainer>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20%',
          height: '30%',
          width: '50%',
          // padding: '1%',
          border: '3px solid #13d0b7',
        }}
      >
        <Typography
          sx={{
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
};

export default AwaitingTranscription;
