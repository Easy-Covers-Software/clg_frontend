import { FC } from 'react';

import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';

import CopyAllIcon from '@mui/icons-material/CopyAll';
import SaveIcon from '@mui/icons-material/Save';

const Container = styled(Grid)`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin-top: -7%;
`;

const Header = styled.h3`
  position: relative;
  top: 20px;
  left: 3%;
`;

const NoteContent = styled(Grid)`
  width: 96%;
  height: 16vh;
  max-height: 16vh;
  min-height: 16vh;
  display: flex;
  justify-content: end;
  margin: 0 auto;
  padding: 1%;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;
`;

const NoteBody = styled(Grid)`
  display: flex;
  flex-direction: column;
  width: 100%;

  overflow: scroll;
`;

const NoteOptions = styled(Grid)`
  display: flex;
  flex-direction: column;
  // width: 100%;
`;

interface Props {
  noteHeader: any;
  noteContent: any;
}

const TranscriptionNote: FC<Props> = ({ noteHeader, noteContent }) => {
  return (
    <Container>
      <Header>{noteHeader}</Header>
      <NoteContent>
        <NoteBody>
          <Typography>{noteContent}</Typography>
        </NoteBody>

        <NoteOptions>
          <IconButton>
            <CopyAllIcon fontSize='large' />
          </IconButton>
          <IconButton>
            <SaveIcon fontSize='large' />
          </IconButton>
        </NoteOptions>
      </NoteContent>
    </Container>
  );
};

export default TranscriptionNote;
