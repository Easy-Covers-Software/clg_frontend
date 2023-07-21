import React from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import MediumReQueryInput from "./MediumReQueryInput";
import CustomReQuery from "./CustomReQuery";

import { UnSelectedButton } from "@/components/Global";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";

import { MoreOptionsReQuerysStyledComponents } from "../ReQueryOptions.styles";
const { Container, MediumOptionsContainer, SubmitButton } =
  MoreOptionsReQuerysStyledComponents;

export default function MoreOptionsReQueries() {
  const { makeIntermediateAdjustment } = useCoverLetterResultsContext();

  const handleIntermediateAdjustment = async () => {
    try {
      await makeIntermediateAdjustment();
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
