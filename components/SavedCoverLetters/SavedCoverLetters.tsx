"use client";

import { useAuth } from "@/context/AuthContext";
import SavedCoverLettersContext from "@/context/SavedCoverLettersContext";

import LoginDialog from "@/components/Login/LoginDialog";
import SettingsDialog from "@/components/Settings/SettingsDialog";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import SnackbarAlert from "../Global/components/SnackbarAlert";

import Edit from "./components/Edit/Edit";
import SavedDisplay from "./components/SavedDisplay/SavedDisplay";

import AlertDialogConfirm from "../Global/components/AlertDialogConfirm";

const Container = styled(Grid)`
  display: flex;
  // justify-content: space-between;
  justify-content: end;
  width: 100%;
`;

export default function SavedCoverLetters() {
  const { state } = useAuth();
  const { isLoginOpen, isSettingsOpen, snackbar, alertDialogConfirm } = state;

  return (
    <Container>
      {isLoginOpen ? <LoginDialog /> : null}
      {isSettingsOpen ? <SettingsDialog /> : null}
      <SavedCoverLettersContext>
        <SavedDisplay />
        <Edit />
      </SavedCoverLettersContext>

      <SnackbarAlert
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />

      <AlertDialogConfirm
        open={alertDialogConfirm.open}
        header={alertDialogConfirm.header}
        message={alertDialogConfirm.message}
      />
    </Container>
  );
}
