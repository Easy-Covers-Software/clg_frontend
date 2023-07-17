"use client";

import { useEffect } from "react";

export interface IHomeProps {}

import { GenerationContext } from "@/context/GenerationSetupContext";
import { useAuth } from "@/context/AuthContext";
import { CoverLetterResultsContext } from "@/context/ResultsContext";

import LoginDialog from "@/components/Login/LoginDialog";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import GenerationSetup from "@/components/GenerationSetup/GenerationSetup";
import Results from "@/components/Results/Results";

const Container = styled(Grid)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function GenerationMode(props: IHomeProps) {
  const { user, isLoginOpen } = useAuth();

  return (
    <Container>
      {isLoginOpen ? <LoginDialog /> : null}
      <GenerationContext>
        <CoverLetterResultsContext>
          <GenerationSetup />
          <Results />
        </CoverLetterResultsContext>
      </GenerationContext>
    </Container>
  );
}
