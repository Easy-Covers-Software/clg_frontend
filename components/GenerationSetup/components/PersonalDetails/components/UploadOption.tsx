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

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

const FileUploadInput = styled(FormControl)`
  width: 100%;
`;

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2% 0;
`;

const Label = styled.label`
  display: flex;
  // flex-shrink: 2;
  width: 80%;
  white-space: nowrap;
`;

export default function UploadOption({ label, accept }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  const { handleFileChange } = useGenerationSetupContext();

  return (
    <>
      <FileUploadInput variant="filled">
        <Input
          id={id}
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept }}
          sx={{ display: "none" }}
        />
      </FileUploadInput>
      <Container>
        <Label htmlFor={id}>
          <UnSelectedButton component="span">{label}</UnSelectedButton>
        </Label>
      </Container>
    </>
  );
}
