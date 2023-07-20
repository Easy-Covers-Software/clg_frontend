import React from "react";
import { PrimaryButton, UnSelectedButton } from "@/components/Global";
import { Grid } from "@mui/material";

import Divider from "@mui/material/Divider";

import styled from "@emotion/styled";
import SignedInDisplay from "./components/SignedInDisplay";

// const Container = styled(Grid)(
//   ({ theme }) => `
//   display: flex;
//   flex-direction: column;
//   align-items: space-between;
//   justify-content: space-between;
//   width: 100%;
//   height: 100%;
//   gap: 24px;
//   margin-top: -24%;
//   // margin-bottom: ${(props) => props.theme.spacing(3)}px; // in pixels
//   color: ${(props) => props.theme.palette.primary.main};
// `
// );
const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: -24%;
  padding-bottom: ${(props) => props.theme.spacing(20)}%; // in pixels
  color: ${(props) => props.theme.palette.primary.border_dark};
`;

const HorizontalDivider = styled(Divider)`
  margin: 5%;
`;

type UserInfo = {
  user: {
    id: string;
    username: string;
    email: string;
  };
};

interface MenuLoggedInProps {
  user: UserInfo;
}

export default function MenuLoggedIn(props: MenuLoggedInProps) {
  return (
    <Container>
      <PrimaryButton>Generate</PrimaryButton>

      <Grid>
        <SignedInDisplay user={props?.user} />
      </Grid>
    </Container>
  );
}
