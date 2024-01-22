import { FC } from 'react';

import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';

import CopyAllIcon from '@mui/icons-material/CopyAll';
import SaveIcon from '@mui/icons-material/Save';

import { Tooltip } from '@mui/material';

const Container = styled(Grid)`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin-top: -3%;
  text-overflow: ellipsis;
`;

const Header = styled.h3`
  position: relative;
  top: 20px;
  left: 3%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: clip;
  width: 340px;
`;

const NoteContent = styled(Grid)`
  width: 96%;
  height: 18vh;
  max-height: 18vh;
  min-height: 18vh;
  display: flex;
  margin: 0 auto;
  padding: 1%;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;

  overflow: scroll;
`;

interface Props {
  noteHeader: any;
  noteContent: any;
}

const TranscriptionNote: FC<Props> = ({ noteHeader, noteContent }) => {
  const isLessThan40Chars = (noteHeader) => {
    return noteHeader.length < 40;
  };

  return (
    <Container>
      <Tooltip title={isLessThan40Chars(noteHeader) ? '' : noteHeader}>
        <Header>{noteHeader}</Header>
      </Tooltip>
      <NoteContent>
        <Typography>{noteContent}</Typography>
      </NoteContent>
    </Container>
  );
};

export default TranscriptionNote;
