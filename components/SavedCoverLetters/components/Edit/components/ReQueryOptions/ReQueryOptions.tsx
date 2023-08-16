"use client";

import React, { useEffect } from "react";

import SimpleReQueryButton from "./components/SimpleReQueryButton";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import { useGenerationContext } from "@/context/GenerationContext";
import { useAuth } from "@/context/AuthContext";
import { IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Tooltip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import DownloadOptionsMenu from "../CoverLetter/components/DownloadOptionsMenu";

import {
  Container,
  MoreOptions,
  MobileMoreOptionsContainer,
} from "./ReQueryOptions.styles";
export default function ReQueryOptions() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { dispatch, toggleIsReQuerySectionExpanded } =
    useSavedCoverLettersContext();
  const { state, dispatch: authDispatch, openAlertDialogConfirm } = useAuth();
  const { didConfirmAlert } = state;

  const handleReset = () => {
    dispatch({ type: "RESET_SELECTED_COVER_LETTER_DATA" });
    authDispatch({ type: "SET_MOBILE_MODE_SAVED", payload: "choose" });
  };

  const openConfirmationDialog = () => {
    openAlertDialogConfirm(
      true,
      "Reset Generation",
      "Are you finished editing? Unsaved changes will be lost.",
      "Reset"
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
          <Tooltip title="Finish editing / Select New">
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
