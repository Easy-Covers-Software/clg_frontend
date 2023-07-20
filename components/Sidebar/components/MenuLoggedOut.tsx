import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import { useAuth } from "@/context/AuthContext";

import Divider from "@mui/material/Divider";
import { PrimaryButton, UnSelectedButton } from "@/components/Global";

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

export default function MenuLoggedOut() {
  const { state, toggleLoginIsOpen } = useAuth();
  const { isLoginOpen } = state;

  if (isLoginOpen) {
    return (
      <Container>
        <UnSelectedButton>Generate</UnSelectedButton>
        <PrimaryButton onClick={() => toggleLoginIsOpen()}>
          Sign In
        </PrimaryButton>
      </Container>
    );
  } else {
    return (
      <Container>
        <PrimaryButton>Generate</PrimaryButton>

        <Grid>
          <HorizontalDivider />

          <UnSelectedButton onClick={() => toggleLoginIsOpen()}>
            Sign In
          </UnSelectedButton>
        </Grid>
      </Container>
    );
  }
}
