"use client";

import { useAuth } from "@/context/AuthContext";
import { GenerationContext } from "@/context/GenerationContext";

import LoginDialog from "@/components/Login/LoginDialog";
import SettingsDialog from "@/components/Settings/SettingsDialog";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import GenerationSetup from "@/components/Generation/GenerationSetup/GenerationSetup";
import Results from "@/components/Generation/Results/Results";

import SnackbarAlert from "../Global/components/SnackbarAlert";
import AlertDialogConfirm from "../Global/components/AlertDialogConfirm";
import { useEffect } from "react";

import { useMediaQuery } from "@mui/material";

const Container = styled(Grid)`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen (max-width: 0px) and (max-width: 600px) {
    // height: calc(100vh - 60px);
  }

  @media screen and (max-width: 600px) {
  }

  @media screen and (max-width: 420px) {
  }
`;

export default function Generation() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { state, dispatch } = useAuth();
  const {
    isLoginOpen,
    isSettingsOpen,
    snackbar,
    alertDialogConfirm,
    mobileMode,
  } = state;

  useEffect(() => {
    dispatch({ type: "SET_PAGE", payload: "generation-mode" });
  }, []);

  return (
    <Container>
      {isLoginOpen ? <LoginDialog /> : null}
      {isSettingsOpen ? <SettingsDialog /> : null}
      <GenerationContext>
        {isMobile ? (
          <>{mobileMode === "setup" ? <GenerationSetup /> : <Results />}</>
        ) : (
          <>
            <GenerationSetup />
            <Results />
          </>
        )}
      </GenerationContext>

      <SnackbarAlert
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />

      <AlertDialogConfirm
        open={alertDialogConfirm.open}
        header={alertDialogConfirm.header}
        message={alertDialogConfirm.message}
        buttonText={alertDialogConfirm.buttonText}
      />
    </Container>
  );
}
