"use client";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import ResultsSummary from "./components/ResultsSummary/ResultsSummary";
import CoverLetterResults from "./components/CoverLetterResults/CoverLetterResults";

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 100%;
  overflow: hidden;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  margin-left: 0.3%;
  gap: 1%;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
  }
`;

export default function Results() {
  return (
    <Container>
      <ResultsSummary />
      <CoverLetterResults />
    </Container>
  );
}
