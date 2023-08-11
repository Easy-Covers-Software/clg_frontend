import { useAuth } from "@/context/AuthContext";

import { CreateAccountOptionsStyledComponents } from "../LoginDialog.styles";
const { Container, GoogleSignInIcon, EasyCoversSignInIcon, IconContainer } =
  CreateAccountOptionsStyledComponents;

import { LoginUtils } from "@/Utils/utils";
import { Typography } from "@mui/material";
const { signInGoogle } = LoginUtils;

export default function CreateAccountOptions() {
  const { state, dispatch } = useAuth();
  const { createAccountEasyCovers, forgotPassword } = state;

  const handleCreateAccountEasyCovers = () => {
    dispatch({ type: "SET_CREATE_ACCOUNT_EASY_COVERS", payload: true });
  };

  const handleGoogle = () => {
    signInGoogle();
  };

  return (
    <Container>
      <IconContainer onClick={handleGoogle}>
        <GoogleSignInIcon src="/GoogleIcon.svg" alt="google icon" />
      </IconContainer>

      <IconContainer onClick={handleCreateAccountEasyCovers}>
        {createAccountEasyCovers || forgotPassword ? (
          <Typography
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch({
                type: "RESET_LOGIN",
              });
            }}
            style={{
              fontSize: "1.4rem",
              color: "#13d0b7",
            }}
          >
            Log In
          </Typography>
        ) : (
          <EasyCoversSignInIcon src="/easy-covers-full.svg" alt="google icon" />
        )}
      </IconContainer>
    </Container>
  );
}
