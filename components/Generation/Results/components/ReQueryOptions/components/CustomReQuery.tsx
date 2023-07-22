import React, { useState } from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { UnSelectedButton } from "@/components/Global/Global";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";

import { CustomReQueryStyledComponents } from "../ReQueryOptions.styles";
const { CustomReQueryField, SubmitButton } = CustomReQueryStyledComponents;

export default function CustomReQuery() {
  const { state, dispatch, makeCustomAdjustment } =
    useCoverLetterResultsContext();

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
    try {
      await makeCustomAdjustment();
    } catch (err) {
      console.log("Error in handleCustomAdjustment");
      console.log(err);
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
      <Typography ml={1} mb={-2} fontSize={"0.8rem"}>
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
