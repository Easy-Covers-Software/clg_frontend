import React, { useState } from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { UnSelectedButton } from "@/components/Global";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";

const SubmitButton = styled(UnSelectedButton)`
  padding: 0 0:
  width: 3vw;
  height: 4.3vh;
  margin-bottom: 2%;
  margin-top: -2%;

  font-size: 0.8rem;
  border: 1px solid #006d4b;
`;

const CustomReQueryField = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  box-sizing: border-box;
  background-color: #fff;
  padding: 2%;
  min-width: 100%;
  max-width: 100%;
  border-top: 1px solid #006d4b;
  border-radius: 4px;
  ::placeholder {
    color: #e2e2e2; // Change this to the color you want
  }
`;

export default function CustomReQuery() {
  const { customAdjustment, setCustomAdjustment, makeCustomAdjustment } =
    useCoverLetterResultsContext();

  const [placeholder, setPlaceholder] = useState(
    "Anything you want to change about the cover letter..."
  );

  const handleChange = (e) => {
    // setValue(e.target.value);
    setCustomAdjustment(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (customAdjustment === "") {
      setPlaceholder(
        "Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for..."
      );
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
      // justifyContent={'space-between'}
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
