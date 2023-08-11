import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import MediumReQueryInput from "./MediumReQueryInput";
import CustomReQuery from "./CustomReQuery";

import { useAuth } from "@/context/AuthContext";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import { useMediaQuery } from "@mui/material";

import { MoreOptionsReQuerysStyledComponents } from "../ReQueryOptions.styles";
const { Container, MediumOptionsContainer, SubmitButton } =
  MoreOptionsReQuerysStyledComponents;

export default function MoreOptionsReQueries() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const {
    state: authState,
    dispatch,
    updateSnackbar,
    toggleSettingsIsOpen,
  } = useAuth();
  const { accessLevel, updateUser } = authState;
  let { num_adjustments_available } = accessLevel;

  const { state, makeIntermediateAdjustment, toggleIsReQuerySectionExpanded } =
    useSavedCoverLettersContext();
  const { disableIntermediateAdjustment } = state;

  const handleIntermediateAdjustment = async () => {
    if (isMobile) {
      toggleIsReQuerySectionExpanded();
    }

    if (num_adjustments_available === 0) {
      toggleSettingsIsOpen();
      updateSnackbar(
        true,
        "error",
        "You have no adjustments available. Please upgrade your account to make more adjustments."
      );
      return;
    }

    try {
      await makeIntermediateAdjustment();
      dispatch({ type: "SET_UPDATE_USER", payload: updateUser });
      updateSnackbar(true, "success", "Adjustment made successfully.");
    } catch (err) {
      console.log(err);
      updateSnackbar(
        true,
        "error",
        "An error occured while making adjustment. Please try again."
      );
    }
  };

  return (
    <Container>
      <MediumOptionsContainer>
        <MediumReQueryInput label={"Add Skill"} />
        <MediumReQueryInput label={"Insert Keyword"} />
        <MediumReQueryInput label={"Remove"} />
        <SubmitButton
          disabled={disableIntermediateAdjustment}
          onClick={handleIntermediateAdjustment}
        >
          REGENERATE
        </SubmitButton>
      </MediumOptionsContainer>

      <CustomReQuery />
    </Container>
  );
}
