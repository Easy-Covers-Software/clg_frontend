import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Grid } from "@mui/material";
import { UnSelectedButton } from "@/components/Global";
import {
  Container,
  HorizontalDivider,
  GenerationModeTab,
} from "./MenuLoggedOut.styles";

export default function MenuLoggedOut() {
  const { state, toggleLoginIsOpen } = useAuth();
  const { isLoginOpen } = state;

  return (
    <Container>
      <Link href={"/generation-mode"} className={"no_underline"}>
        <GenerationModeTab>Generate Mode</GenerationModeTab>
      </Link>

      <Grid>
        <HorizontalDivider />
        <UnSelectedButton onClick={() => toggleLoginIsOpen()}>
          Sign In
        </UnSelectedButton>
      </Grid>
    </Container>
  );
}
