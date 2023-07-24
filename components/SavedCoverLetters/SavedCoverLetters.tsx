"use client";

import { useAuth } from "@/context/AuthContext";
import SavedCoverLettersContext from "@/context/SavedCoverLettersContext";

import LoginDialog from "@/components/Login/LoginDialog";
import SettingsDialog from "@/components/Settings/SettingsDialog";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import { SnackbarAlert } from "../Global/components/SnackbarAlert";

import Edit from "./components/Edit/Edit";

const Container = styled(Grid)`
  display: flex;
  // justify-content: space-between;
  justify-content: end;
  width: 100%;
`;

export default function SavedCoverLetters() {
  const { state } = useAuth();
  const { isLoginOpen, isSettingsOpen, snackbar } = state;

  return (
    <Container>
      {isLoginOpen ? <LoginDialog /> : null}
      {isSettingsOpen ? <SettingsDialog /> : null}
      <SavedCoverLettersContext>
        {/* SavedCoverLetters */}
        <Edit />
      </SavedCoverLettersContext>

      <SnackbarAlert
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />
    </Container>
  );
}
