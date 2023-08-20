"use client";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import ResultsSummary from "./components/ResultsSummary/ResultsSummary";
import CoverLetterResults from "./components/CoverLetterResults/CoverLetterResults";

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 90%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 98px);
  max-height: calc(100vh - 98px);
  min-height: calc(100vh - 98px);
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin-left: 0.3%;
  padding-bottom: 2%;
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
