import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import MediumReQueryInput from "./MediumReQueryInput";
import CustomReQuery from "./CustomReQuery";

import { useAuth } from "@/context/AuthContext";
import { useGenerationContext } from "@/context/GenerationContext";

import { MoreOptionsReQuerysStyledComponents } from "../ReQueryOptions.styles";
const { Container, MediumOptionsContainer, SubmitButton } =
  MoreOptionsReQuerysStyledComponents;

export default function MoreOptionsReQueries() {
  const { dispatch, updateSnackbar, toggleSettingsIsOpen } = useAuth();

  const { state, makeIntermediateAdjustment } = useGenerationContext();
  const { disableGenerateButton } = state;

  const handleIntermediateAdjustment = async () => {
    if (state.accessLevel.num_adjustments_available === 0) {
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

  console.log("MoreOptionsReQueries.tsx: state", disableGenerateButton);

  return (
    <Container>
      <MediumOptionsContainer>
        <MediumReQueryInput label={"Add Skill"} />
        <MediumReQueryInput label={"Insert Keyword"} />
        <MediumReQueryInput label={"Remove Redundancy"} />
        <SubmitButton
          onClick={handleIntermediateAdjustment}
          disabled={disableGenerateButton}
        >
          REGENERATE
        </SubmitButton>
      </MediumOptionsContainer>

      <CustomReQuery />
    </Container>
  );
}
