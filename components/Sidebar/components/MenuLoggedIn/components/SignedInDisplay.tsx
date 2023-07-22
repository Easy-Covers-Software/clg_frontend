import React from "react";

import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { UnSelectedButton } from "@/components/Global/Global";

import { useAuth } from "@/context/AuthContext";

import { SignedInDisplayStyledComponents } from "../MenuLoggedIn.styles";
const {
  Container,
  HorizontalDivider,
  CoverLetterStatsContainer,
  UserEmail,
  StatContainer,
} = SignedInDisplayStyledComponents;

const Stat = ({ statName, statValue }) => (
  <StatContainer>
    <Typography variant="h6">{statName}</Typography>
    <Typography variant="h6">{statValue}</Typography>
  </StatContainer>
);

export default function SignedInDisplay() {
  const { state, toggleSettingsIsOpen, logout } = useAuth();
  const { user } = state;
  const { email } = user;

  console.log("user", user);

  return (
    <Container>
      <CoverLetterStatsContainer>
        <Stat statName="Generations Available" statValue={3} />
        <Stat statName="Adjustments Available" statValue={2} />
      </CoverLetterStatsContainer>

      <UserEmail variant="profileEmail">{email}</UserEmail>

      <HorizontalDivider />

      <UnSelectedButton onClick={() => toggleSettingsIsOpen()}>
        UPGRADE
      </UnSelectedButton>

      <UnSelectedButton onClick={logout}>Logout</UnSelectedButton>
    </Container>
  );
}
