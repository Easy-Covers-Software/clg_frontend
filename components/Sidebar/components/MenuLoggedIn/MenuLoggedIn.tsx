import React from "react";
import { PrimaryButton, UnSelectedButton } from "@/components/Global";
import { Grid } from "@mui/material";

import Divider from "@mui/material/Divider";

import styled from "@emotion/styled";
import SignedInDisplay from "./components/SignedInDisplay";

import { useAuth } from "@/context/AuthContext";
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
  color: ${(props) => props.theme.palette.primary.border_dark};
`;

const GenerationModeTab = styled(UnSelectedButton)`
  ${(props) => (props.selected ? "background-color: #f5faf5;" : "white")}
  ${(props) =>
    props.selected
      ? "none"
      : "box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"}
  // border-bottom: 2px solid #E6EAE6;
  &:hover {
    ${(props) =>
      props.selected
        ? "none"
        : "background-color: #f5faf5;"}// background-color: #e0e0e0;
    // border-bottom: 2px solid #00bfa6;;;
  }
  &:active {
    border-bottom: 2px solid #87dbd0;
  }
`;

const Tabs = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function MenuLoggedIn() {
  const {
    state: { page },
  } = useAuth();

  return (
    <Container>
      <Tabs>
        <Link href={"/generation-mode"} className={"no_underline"} passHref>
          <GenerationModeTab selected={page === "generation-mode"}>
            Generate Mode
          </GenerationModeTab>
        </Link>

        <Link href={"/saved"} className={"no_underline"} passHref>
          <GenerationModeTab selected={page === "saved"}>
            Saved
          </GenerationModeTab>
        </Link>
      </Tabs>

      <Grid>
        <SignedInDisplay />
      </Grid>
    </Container>
  );
}
