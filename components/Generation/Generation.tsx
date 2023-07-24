"use client";

import { useAuth } from "@/context/AuthContext";
import { CoverLetterResultsContext } from "@/context/ResultsContext";

import LoginDialog from "@/components/Login/LoginDialog";
import SettingsDialog from "@/components/Settings/SettingsDialog";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import GenerationSetup from "@/components/Generation/GenerationSetup/GenerationSetup";
import Results from "@/components/Generation/Results/Results";

import { SnackbarAlert } from "../Global/components/SnackbarAlert";

const Container = styled(Grid)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function Generation() {
  const { state } = useAuth();
  const { isLoginOpen, isSettingsOpen, snackbar } = state;

  return (
    <Container>
      {isLoginOpen ? <LoginDialog /> : null}
      {isSettingsOpen ? <SettingsDialog /> : null}
      <CoverLetterResultsContext>
        <GenerationSetup />
        <Results />
      </CoverLetterResultsContext>

      <SnackbarAlert
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
        // onClose={handleSnackbarClose}
      />
    </Container>
  );
}
