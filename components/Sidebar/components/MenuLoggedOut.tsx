import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { useAuth } from "@/context/AuthContext";

import Divider from "@mui/material/Divider";
import { PrimaryButton, UnSelectedButton } from "@/components/Global";

import Link from "next/link";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: -24%;
`;

const HorizontalDivider = styled(Divider)`
  margin: 5%;
`;

const GenerationModeTab = styled(UnSelectedButton)`
  background-color: #f5f5f5;
  border-bottom: 2px solid #13d0b7;
  &:hover {
    background-color: #e0e0e0;
    border-bottom: 2px solid #00bfa6;
  }
  &:active {
    border-bottom: 2px solid #87dbd0;
  }
`;

export default function MenuLoggedOut() {
  const { state, toggleLoginIsOpen } = useAuth();
  const { isLoginOpen } = state;

  return (
    <Container>
      <Link href={"/generation-mode"} className={"no_underline"}>
        <GenerationModeTab>Generate Mode</GenerationModeTab>
      </Link>

      <UnSelectedButton onClick={() => toggleLoginIsOpen()}>
        Sign In
      </UnSelectedButton>
    </Container>
  );
}
