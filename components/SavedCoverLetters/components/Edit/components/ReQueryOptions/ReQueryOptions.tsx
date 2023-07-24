"use client";

import React, { useContext } from "react";

import SimpleReQueryButton from "./components/SimpleReQueryButton";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";

import { Container, MoreOptions } from "./ReQueryOptions.styles";

export default function ReQueryOptions() {
  const { toggleIsReQuerySectionExpanded } = useSavedCoverLettersContext();

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
