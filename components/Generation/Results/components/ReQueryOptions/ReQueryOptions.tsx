"use client";

import React, { useContext } from "react";

import SimpleReQueryButton from "./components/SimpleReQueryButton";
import { useGenerationContext } from "@/context/GenerationContext";

import { Container, MoreOptions } from "./ReQueryOptions.styles";

export default function ReQueryOptions() {
  const { toggleIsReQuerySectionExpanded } = useGenerationContext();

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
