import React from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import MediumReQueryInput from "./MediumReQueryInput";
import CustomReQuery from "./CustomReQuery";

import { UnSelectedButton } from "@/components/Global";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // margin-top: 2%;
  width: 50%;
`;

const MediumOptionsContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitButton = styled(UnSelectedButton)`
  padding: 0 0:
  width: 60%;
  height: 4.3vh;
  margin-top: 1%;
  font-size: 0.8rem;
  border: 1px solid #006d4b;
`;

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
