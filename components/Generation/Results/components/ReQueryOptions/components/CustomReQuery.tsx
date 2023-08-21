import React, { useState } from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { UnSelectedButton } from "@/components/Global/Global";
import { useGenerationContext } from "@/context/GenerationContext";
import { useAuth } from "@/context/AuthContext";

import { CustomReQueryStyledComponents } from "../ReQueryOptions.styles";
const { CustomReQueryField, SubmitButton } = CustomReQueryStyledComponents;
import { useMediaQuery } from "@mui/material";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 10%;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    padding: 0 1%;
    width: 100%;
    margin-top: 2%;
  }
`;

const SubContainer = styled(Grid)`
  height: 100%;
  margin-bottom: 15%;
  width: 96%;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    padding: 0 1%;
    width: 100%;
  }
`;

export default function CustomReQuery() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const {
    state: authState,
    dispatch: authDispatch,
    updateSnackbar,
    toggleSettingsIsOpen,
  } = useAuth();
  const {
    state,
    dispatch,
    makeCustomAdjustment,
    toggleIsReQuerySectionExpanded,
  } = useGenerationContext();

  const { customAdjustment, disableCustomAdjustment } = state;

  const [placeholder, setPlaceholder] = useState(
    "Anything you want to change about the cover letter..."
  );

  const handleChange = (e) => {
    dispatch({ type: "SET_CUSTOM_ADJUSTMENT", payload: e.target.value });
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (customAdjustment === "") {
      setPlaceholder("Anything you want to change about the cover letter...");
    }
  };

  const handleCustomAdjustment = async () => {
    if (authState.accessLevel.num_adjustments_available === 0) {
      toggleSettingsIsOpen();
      updateSnackbar(
        true,
        "error",
        "You have no adjustments available. Please upgrade your account to make more adjustments."
      );
      return;
    }

    if (isMobile) {
      toggleIsReQuerySectionExpanded();
    }
    const response = await makeCustomAdjustment();
    if (response) {
      authDispatch({ type: "SET_UPDATE_USER", payload: authState.updateUser });
      updateSnackbar(true, "success", "Adjustment made successfully.");
    } else {
      updateSnackbar(
        true,
        "error",
        "An error occured while making adjustment. Please try again."
      );
    }
  };

  return (
    <Container>
      <SubContainer>
        <Typography className="custom-adjustment-heading">
          Custom Adjustment
        </Typography>
        <CustomReQueryField
          placeholder={placeholder}
          value={customAdjustment}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </SubContainer>

      <SubmitButton
        onClick={handleCustomAdjustment}
        disabled={disableCustomAdjustment}
      >
        REGENERATE
      </SubmitButton>
    </Container>
  );
}
