"use client";

import React, { useContext } from "react";

import { Grid } from "@mui/material";
import styled from "@emotion/styled";

import SimpleReQueryButton from "./components/SimpleReQueryButton";
import { PrimaryButton, UnSelectedButton } from "@/components/Global";

import { useCoverLetterResultsContext } from "@/context/ResultsContext";

const Container = styled(Grid)`
  width: 100%;
  display: flex;
  padding-right: 1%;
  height: 80px;
  // min-height: 100px;
  // overflow: scroll;

  // border: 1px solid #006d4b;
`;

const MoreOptions = styled(UnSelectedButton)`
  width: 25%;
  height: 60%;
  font-size: 0.75rem;
  background-color: #fff;
  padding: 0;
  margin: auto;
  margin-bottom: 1.4%;
`;

export default function ReQueryOptions() {
  const { toggleIsReQuerySectionExpanded } = useCoverLetterResultsContext();

  return (
    <Container>
      <SimpleReQueryButton buttonLabel="Length" />
      <SimpleReQueryButton buttonLabel="Formality" />
      <SimpleReQueryButton buttonLabel="Personability" />

      <MoreOptions onClick={toggleIsReQuerySectionExpanded}>
        More Options
      </MoreOptions>
    </Container>
  );
}
