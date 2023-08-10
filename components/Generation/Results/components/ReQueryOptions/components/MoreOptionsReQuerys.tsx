import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import MediumReQueryInput from "./MediumReQueryInput";
import CustomReQuery from "./CustomReQuery";

import { useAuth } from "@/context/AuthContext";
import { useGenerationContext } from "@/context/GenerationContext";
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

  const { state, makeIntermediateAdjustment, toggleIsReQuerySectionExpanded } =
    useGenerationContext();
  const { disableIntermediateAdjustment } = state;

  const handleIntermediateAdjustment = async () => {
    if (isMobile) {
      toggleIsReQuerySectionExpanded();
    }

    if (authState.accessLevel.num_adjustments_available === 0) {
      toggleSettingsIsOpen();
      updateSnackbar(
        true,
        "error",
        "You have no adjustments available. Please upgrade your account to make more adjustments."
      );
      return;
    } else {
      const response = await makeIntermediateAdjustment();

      if (response) {
        dispatch({ type: "SET_UPDATE_USER", payload: state.updateUser });
        updateSnackbar(true, "success", "Adjustment made successfully.");
      } else {
        updateSnackbar(
          true,
          "error",
          "An error occured while making adjustment. Please try again."
        );
      }
    }
  };

  return (
    <Container>
      <MediumOptionsContainer>
        <MediumReQueryInput label={"Add Skill"} />
        <MediumReQueryInput label={"Insert Keyword"} />
        <MediumReQueryInput label={"Remove"} />
        <SubmitButton
          onClick={handleIntermediateAdjustment}
          disabled={disableIntermediateAdjustment}
        >
          REGENERATE
        </SubmitButton>
      </MediumOptionsContainer>

      <CustomReQuery />
    </Container>
  );
}
