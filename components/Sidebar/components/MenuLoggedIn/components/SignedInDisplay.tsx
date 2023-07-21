import React from "react";

import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { UnSelectedButton } from "@/components/Global";

import { useAuth } from "@/context/AuthContext";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const UserProfileInfo = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2% 0 0;
`;

const HorizontalDivider = styled(Divider)`
  margin: 1% 3%;
`;

const CoverLetterStatsContainer = styled(Grid)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1% 5%;
  margin-bottom: 3%;
`;

const StatContainer = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

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
      <UserProfileInfo>
        <CoverLetterStatsContainer>
          <Stat statName="Generations Available" statValue={3} />
          <Stat statName="Adjustments Available" statValue={2} />
        </CoverLetterStatsContainer>
        <Typography variant="h2">{email}</Typography>
      </UserProfileInfo>

      <HorizontalDivider />

      <UnSelectedButton onClick={() => toggleSettingsIsOpen()}>
        UPGRADE
      </UnSelectedButton>

      <UnSelectedButton onClick={logout}>Logout</UnSelectedButton>
    </Container>
  );
}
