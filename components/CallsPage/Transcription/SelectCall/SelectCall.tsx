import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Using Box as a container
import { NotesContainer } from '@/sections/TranscriptionSection/TranscriptionSection.styles';

const SelectCall = () => {
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
};

export default SelectCall;
