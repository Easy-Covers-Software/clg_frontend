import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { UnSelectedButton } from '@/components/Global/Global';

//=== List Components ===//
export const ListContainer = styled(Grid2)`
  width: 22vw;
  min-width: 22vw;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1%;

  flex: 1;
  padding: 0.2%;

  background-color: white;

  border: 1px solid #13d0b7;
  border-radius: 4px;
`;

export const TranscribeButton = styled(UnSelectedButton)`
  // height: 88%;
  width: 98%;
  margin: auto;

  background-color: #bacbba;
  color: white;
  font-size: 0.95rem;
  letter-spacing: 1px;
  white-space: nowrap;

  &:hover {
    background-color: #a5b4a5;
    color: white;
  }
  &:disabled {
    background-color: #e9e9e9;
    color: lightgray;
    border: 1px solid lightgray;
  }
`;

//=== Body Components ===//
export const BodyContainer = styled(Grid2)`
  width: 100%;
  padding: 0.2%;

  display: flex;
  flex-direction: column;
  gap: 0.2%;

  border-radius: 4px;
  border: 1px solid #006d4b;
  background-color: white;
`;

export const SubContainer = styled(Grid2)`
  height: 100%;
  max-height: 78vh;
  background-color: #f8f8ff;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

export const CallsContainer = styled(Grid2)`
  height: 100%;
  background-color: #f8f8ff;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

export const NotesContainer = styled(SubContainer)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const NotesProcessingContainer = styled(SubContainer)`
  width: 100%;
  gap 12px;
`;

export const NotesCompleteContainer = styled(NotesContainer)`
  width: 98%;
  gap: 12px;
`;
