"use client";

import React, { useEffect } from "react";

import SimpleReQueryButton from "./components/SimpleReQueryButton";
import { useGenerationContext } from "@/context/GenerationContext";
import { useAuth } from "@/context/AuthContext";
import { IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Tooltip } from "@mui/material";

import {
  Container,
  MoreOptions,
  MobileMoreOptionsContainer,
} from "./ReQueryOptions.styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import DownloadOptionsMenu from "../CoverLetterResults/components/DownloadOptionsMenu";

export default function ReQueryOptions() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const {
    dispatch,
    toggleIsReQuerySectionExpanded,
    toggleIsReQueryMobileSectionExpanded,
  } = useGenerationContext();
  const { state, dispatch: authDispatch, openAlertDialogConfirm } = useAuth();
  const { didConfirmAlert } = state;

  const handleReset = () => {
    dispatch({ type: "RESET_STATE" });
    authDispatch({ type: "SET_MOBILE_MODE", payload: "setup" });
  };

  const openConfirmationDialog = () => {
    openAlertDialogConfirm(
      true,
      "Reset Generation",
      "Are you sure you want to reset your generation?"
    );
  };

  useEffect(() => {
    if (didConfirmAlert !== null && didConfirmAlert) {
      handleReset();
    }
  }, [didConfirmAlert]);

  return (
    <>
      {isMobile ? (
        <MobileMoreOptionsContainer>
          <Tooltip title="Restart Generation">
            <IconButton
              onClick={openConfirmationDialog}
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                border: "1px solid red",
                padding: 0,
                margin: 0,
                width: "7vh",
                minWidth: "7vh",
                height: "7vh",
                minHeight: "7vh",
              }}
            >
              <RestartAltIcon />
            </IconButton>
          </Tooltip>

          <MoreOptions onClick={toggleIsReQuerySectionExpanded}>
            Adjustments
          </MoreOptions>

          <DownloadOptionsMenu />
        </MobileMoreOptionsContainer>
      ) : (
        <Container>
          <SimpleReQueryButton buttonLabel="Length" />
          <SimpleReQueryButton buttonLabel="Formality" />
          <SimpleReQueryButton buttonLabel="Personability" />

          <MoreOptions onClick={toggleIsReQuerySectionExpanded}>
            Adjustments
          </MoreOptions>
        </Container>
      )}
    </>
  );
}
