import React, { useState } from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { UnSelectedButton } from "@/components/Global/Global";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import { useAuth } from "@/context/AuthContext";

import { CustomReQueryStyledComponents } from "../ReQueryOptions.styles";
const { CustomReQueryField, SubmitButton } = CustomReQueryStyledComponents;

export default function CustomReQuery() {
  const {
    state: authState,
    dispatch: authDispatch,
    updateSnackbar,
    toggleSettingsIsOpen,
  } = useAuth();
  const { state, dispatch, makeCustomAdjustment } =
    useSavedCoverLettersContext();

  const { customAdjustment } = state;

  const [placeholder, setPlaceholder] = useState(
    "Anything you want to change about the cover letter..."
  );

  const handleChange = (e) => {
    // setValue(e.target.value);
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

    try {
      const response = await makeCustomAdjustment();

      if (response) {
        authDispatch({
          type: "SET_UPDATE_USER",
          payload: authState.updateUser,
        });
        updateSnackbar(true, "success", "Adjustment made successfully.");
      } else {
        updateSnackbar(
          true,
          "error",
          "An error occured while making adjustment. Please try again."
        );
      }
    } catch (err) {
      console.log("Error in handleCustomAdjustment");
      console.log(err);
      updateSnackbar(
        true,
        "error",
        "An error occured while making adjustment. Please try again."
      );
    }
  };

  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      width={"14vw"}
      gap={2}
      mt={2}
    >
      <Typography variant="customAdjustmentHeading">
        Custom Adjustment
      </Typography>
      <CustomReQueryField
        placeholder={placeholder}
        value={customAdjustment}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <SubmitButton onClick={handleCustomAdjustment}>REGENERATE</SubmitButton>
    </Grid>
  );
}
