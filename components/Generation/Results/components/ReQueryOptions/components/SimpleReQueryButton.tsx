import { PrimaryButton, UnSelectedButton } from "@/components/Global/Global";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { ButtonGroup, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { useCoverLetterResultsContext } from "@/context/ResultsContext";
import { useAuth } from "@/context/AuthContext";

import { SimpleReQueryButtonStyledComponents } from "../ReQueryOptions.styles";
const { Container, ButtonContainer } = SimpleReQueryButtonStyledComponents;

export default function SimpleReQueryButton({ buttonLabel }) {
  const { state, dispatch, updateSnackbar, toggleSettingsIsOpen } = useAuth();
  const { makeSimpleAdjustment } = useCoverLetterResultsContext();

  const handleSimpleAdjustment = async (adjustmentType, buttonLabel) => {
    if ((state.accessLevel.num_adjustments_available = 0)) {
      toggleSettingsIsOpen();
      updateSnackbar(
        true,
        "error",
        "You have no adjustments available. Please upgrade your account to make more adjustments."
      );
      return;
    }
    try {
      await makeSimpleAdjustment(adjustmentType, buttonLabel);
      dispatch({ type: "SET_UPDATE_USER", payload: state.updateUser });
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
      <Typography variant="simpleAdjustmentLabel">{buttonLabel}</Typography>
      <ButtonContainer>
        <IconButton
          onClick={() => {
            handleSimpleAdjustment("decrease", buttonLabel);
          }}
        >
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>

        <Divider orientation="vertical" />

        <IconButton
          onClick={() => {
            handleSimpleAdjustment("increase", buttonLabel);
          }}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
}
