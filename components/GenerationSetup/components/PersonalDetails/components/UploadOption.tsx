import React, { useState } from 'react';
import {
  Button,
  Box,
  FormControl,
  Input,
  Typography,
  Snackbar,
} from '@mui/material';
import { Alert } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { UnSelectedButton } from '@/components/Global';

const FileUploadInput = styled(FormControl)`
  width: 100%;
`;

const Container = styled(Grid)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2% 0;
`;

const Label = styled.label`
  width: 80%;
  white-space: nowrap;
`;

export default function UploadOption({ label, accept, handleFileChange }) {
  return (
    <>
      <FileUploadInput variant="filled">
        <Input
          id={`${label}-input`}
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept }}
          sx={{ display: 'none' }}
        />
      </FileUploadInput>
      <Container>
        <Label htmlFor={`${label}-input`}>
          <UnSelectedButton>{label}</UnSelectedButton>
        </Label>
      </Container>
    </>
  );
}
