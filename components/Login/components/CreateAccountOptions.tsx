import React from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import { signIn } from "next-auth/react";

const Container = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  padding: 12px 0px;
`;

const IconContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #006d4b;
  cursor: pointer;
  height: 10vh;
`;

const GoogleSignInIcon = styled.img`
  height: 40px;
  width: 40px;
`;

const EasyCoversSignInIcon = styled.img`
  height: 130px;
  width: 130px;
`;

export default function CreateAccountOptions() {
  const createAccount = () => {};

  return (
    <Container>
      <IconContainer onClick={() => signIn()}>
        <GoogleSignInIcon src="/GoogleIcon.svg" alt="google icon" />
      </IconContainer>

      <IconContainer>
        <EasyCoversSignInIcon src="/easy-covers-full.svg" alt="google icon" />
      </IconContainer>
    </Container>
  );
}
