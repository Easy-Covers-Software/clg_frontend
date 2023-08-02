import { PrimaryButton, UnSelectedButton } from "@/components/Global/Global";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { ButtonGroup, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import { useAuth } from "@/context/AuthContext";

import { SimpleReQueryButtonStyledComponents } from "../ReQueryOptions.styles";
const { Container, ButtonContainer } = SimpleReQueryButtonStyledComponents;

export default function SimpleReQueryButton({ buttonLabel }) {
  const {
    state: authState,
    dispatch,
    updateSnackbar,
    toggleSettingsIsOpen,
  } = useAuth();
  const { accessLevel, updateUser } = authState;
  let { num_adjustments_available } = accessLevel;

  const { state, makeSimpleAdjustment } = useSavedCoverLettersContext();
  const { disableRequery } = state;

  const handleSimpleAdjustment = async (adjustmentType, buttonLabel) => {
    if ((num_adjustments_available = 0)) {
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
      <Typography className="simple-adjustment-label">{buttonLabel}</Typography>
      <ButtonContainer>
        <IconButton
          disabled={disableRequery}
          onClick={() => {
            handleSimpleAdjustment("decrease", buttonLabel);
          }}
        >
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>

        <Divider orientation="vertical" />

        <IconButton
          disabled={disableRequery}
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
