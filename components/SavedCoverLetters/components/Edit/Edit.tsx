"use client";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import GenerationSummary from "./components/GenerationSummary/GenerationSummary";
import CoverLetter from "./components/CoverLetter/CoverLetter";

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 70%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin-left: 0.3%;
  gap: 1%;
  overflow: scroll;
`;

export default function Edit() {
  return (
    <Container>
      <GenerationSummary />
      <CoverLetter />
    </Container>
  );
}
