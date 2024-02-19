import React from 'react';
import TranscriptionNote from '@/components/CallsPage/Transcription/TranscriptionNote/TranscriptionNote';
import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Grid } from '@mui/material';

interface TranscriptionNoteType {
  id?: string;
  noteHeader?: string;
  noteContent?: string;
}

interface TranscriptionNotesProps {
  transcriptionNotes?: TranscriptionNoteType[];
}

const Container = styled(Grid)`
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: #f8f8ff;
  max-height: 78vh;
  margin: auto;
  // flex: 1;

  // border: 1px solid #006d4b;
  border-radius: 4px;
`;

const TranscriptionNotes: React.FC<any> = ({ page, transcriptionNotes }) => {
  console.log('transcriptionNotes', transcriptionNotes);
  return (
    <Container container spacing={2}>
      {transcriptionNotes && (
        <>
          {Object.entries(transcriptionNotes).map(([key, value]) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={key}
              style={{
                padding: 0,
                margin: 0,
                maxHeight: '22vh',
              }}
            >
              <TranscriptionNote noteHeader={key} noteContent={value} />
            </Grid>
          ))}
        </>
      )}
    </Container>
  );
};

export default TranscriptionNotes;
