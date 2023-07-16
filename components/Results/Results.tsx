"use client";

import React, { createContext, useState } from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import ResultsSummary from "./components/ResultsSummary";
import CoverLetterResults from "./components/CoverLetterResults/CoverLetterResults";
import ReQueryOptions from "./components/ReQueryOptions/ReQueryOptions";

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 70%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  margin-left: 0.3%;
`;

export const ReQueryContext = createContext();

export default function Results() {
  const [isReQuerySectionExpanded, setIsReQuerySectionExpanded] =
    useState(false);

  const toggleIsReQuerySectionExpanded = () => {
    setIsReQuerySectionExpanded(!isReQuerySectionExpanded);
  };

  return (
    <ReQueryContext.Provider
      value={{ isReQuerySectionExpanded, toggleIsReQuerySectionExpanded }}
    >
      <Container>
        <ResultsSummary />
        <CoverLetterResults />
        {/* <ReQueryOptions /> */}
      </Container>
    </ReQueryContext.Provider>
  );
}
