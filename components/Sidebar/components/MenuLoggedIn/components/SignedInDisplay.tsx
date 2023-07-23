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
    <Typography variant="accessStats" ml={"1%"}>
      {statName}
    </Typography>
    <Typography variant="accessStats" mr={"5%"}>
      {statValue}
    </Typography>
  </StatContainer>
);

export default function SignedInDisplay() {
  const { state, toggleSettingsIsOpen, logout } = useAuth();
  const { user } = state;
  const { email, access_level } = user;
  const {
    num_gpt3_generations_available,
    num_gpt4_generations_available,
    num_adjustments_available,
  } = access_level;

  console.log("state", state);
  console.log("user", user);

  return (
    <Container>
      <CoverLetterStatsContainer>
        <Stat
          statName="Gpt-4 Generations"
          statValue={num_gpt3_generations_available}
        />
        <Stat
          statName="Gpt-3 Generations"
          statValue={num_gpt4_generations_available}
        />
        <Stat
          statName="Adjustments Available"
          statValue={num_adjustments_available}
        />
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
