import React from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

// import { useRouter } from "next/router";

import { signIn } from "next-auth/react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Cookies from "cookie";

import axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";

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

interface Props {
  signInGoogle: () => void;
}

export default function CreateAccountOptions(props: Props) {
  // const { signInGoogle } = props;
  const signInGoogle = async () => {
    const parameters = {
      client_id:
        "464586598349-3uu0huc0df86brd568ikatpa9avg015m.apps.googleusercontent.com",
      redirect_uri: "https://localhost:8000/users/auth/finish_google_login/",
      response_type: "code",
      scope: "email profile openid",
      access_type: "offline",
      prompt: "consent",
    };

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    Object.keys(parameters).forEach((key) =>
      url.searchParams.append(key, parameters[key])
    );
    window.location.href = url.toString();
  };

  return (
    <Container>
      <IconContainer onClick={signInGoogle}>
        <GoogleSignInIcon src="/GoogleIcon.svg" alt="google icon" />
      </IconContainer>

      <IconContainer>
        <EasyCoversSignInIcon src="/easy-covers-full.svg" alt="google icon" />
      </IconContainer>
    </Container>
  );
}
