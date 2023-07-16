"use client";

import React, { useState } from "react";
import {
  Button,
  Box,
  FormControl,
  Input,
  Typography,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import { UnSelectedButton } from "@/components/Global";
import UploadOption from "./UploadOption";

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

const Container = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  padding: 0 2%;
`;

const DragDropContainer = styled(Grid)`
  height: 32vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  border-radius: 4px;
  border: 1px solid #006d4b;
  background-color: #f8f8ff;
  box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.1);
`;

const AlternativeUploadContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  // align-items: center;
  gap: 12px;
  justify-content: center;
  padding: 2%;
  border-radius: 4px;
  width: 100%;
  margin-top: 2%;
`;

const AlternativeUploadButton = styled(UnSelectedButton)`
  width: 75%;
  margin: auto;
`;

export default function ResumeUploader() {
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: "",
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUploadStatus({ ...uploadStatus, message: "" });
  };

  return (
    <Container>
      <DragDropContainer>
        <UploadOption
          label="Upload From Computer"
          accept=".pdf,.doc,.docx,.txt"
        />
      </DragDropContainer>

      <AlternativeUploadContainer>
        <AlternativeUploadButton>Upload From Indeed</AlternativeUploadButton>

        <AlternativeUploadButton>Upload From LinkedIn</AlternativeUploadButton>
      </AlternativeUploadContainer>
    </Container>
  );
}
