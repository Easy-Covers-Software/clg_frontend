'use client';

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
import UploadOption from './UploadOption';

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2%;
  padding: 2%;
  border-radius: 4px;
  border: 1px solid #006d4b;
  box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.1);
  width: 25vw;
  height: 30vh;
  background-color: #f8f8ff;
`;

export default function ResumeUploader() {
  const [file, setFile] = useState(null);

  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: '',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUploadStatus({ ...uploadStatus, message: '' });
  };

  return (
    <Container>
      <UploadOption
        label="Upload  From Computer"
        accept=".pdf,.doc,.docx,.txt"
        handleFileChange={handleFileChange}
      />
      <UploadOption
        label="Upload with LinkedIn"
        accept=".pdf,.doc,.docx,.txt"
        handleFileChange={handleFileChange}
      />
      <UploadOption
        label="Upload with Indeed"
        accept=".pdf,.doc,.docx,.txt"
        handleFileChange={handleFileChange}
      />

      <Snackbar
        open={uploadStatus.message !== ''}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={uploadStatus.success ? 'success' : 'error'}
        >
          {uploadStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
