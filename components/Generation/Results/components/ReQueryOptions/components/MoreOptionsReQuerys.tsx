import React from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import MediumReQueryInput from "./MediumReQueryInput";
import CustomReQuery from "./CustomReQuery";

import { useAuth } from "@/context/AuthContext";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";

import { MoreOptionsReQuerysStyledComponents } from "../ReQueryOptions.styles";
const { Container, MediumOptionsContainer, SubmitButton } =
  MoreOptionsReQuerysStyledComponents;

export default function MoreOptionsReQueries() {
  const { state, dispatch } = useAuth();
  const { makeIntermediateAdjustment } = useCoverLetterResultsContext();

  const handleIntermediateAdjustment = async () => {
    try {
      await makeIntermediateAdjustment();
      dispatch({ type: "SET_UPDATE_USER", payload: state.updateUser });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <MediumOptionsContainer>
        <MediumReQueryInput label={"Add Skill"} />
        <MediumReQueryInput label={"Insert Keyword"} />
        <MediumReQueryInput label={"Remove Redundancy"} />
        <SubmitButton onClick={handleIntermediateAdjustment}>
          REGENERATE
        </SubmitButton>
      </MediumOptionsContainer>

      <CustomReQuery />
    </Container>
  );
}
