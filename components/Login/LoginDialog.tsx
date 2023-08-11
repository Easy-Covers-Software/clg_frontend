"use client";

import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";

import LoginInputs from "./components/LoginInputs";
import CreateAccountOptions from "./components/CreateAccountOptions";

import { useAuth } from "@/context/AuthContext";
import { Typography } from "@mui/material";
// import { SuccessSnackbar } from "@/components/Global/components/Snackbars";

import {
  DialogContentContainer,
  CreateAccountContainer,
  DividerContainer,
  SignInButton,
  FullLogo,
} from "./LoginDialog.styles";

export default function LoginDialog() {
  const {
    state,
    dispatch,
    toggleLoginIsOpen,
    login,
    createAccount,
    resetPassword,
  } = useAuth();
  const { isLoginOpen, createAccountEasyCovers, forgotPassword } = state;

  const handleClose = () => {
    toggleLoginIsOpen(false);
  };

  return (
    <Dialog
      open={isLoginOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: {
          backgroundColor: "#F8F8FF",
        },
      }}
    >
      <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />

      <DialogContentContainer>
        <LoginInputs />

        {createAccountEasyCovers ? (
          <SignInButton onClick={() => createAccount()}>
            Create Account
          </SignInButton>
        ) : forgotPassword ? (
          <SignInButton onClick={() => resetPassword()}>
            Send Reset Email
          </SignInButton>
        ) : (
          <>
            <Typography
              style={{
                cursor: "pointer",
                position: "relative",
                top: "-10px",
                right: "-100px",
                fontSize: "0.9rem",
                color: "#13d0b7",
              }}
              onClick={() => {
                dispatch({
                  type: "SET_FORGOT_PASSWORD",
                  payload: true,
                });
              }}
            >
              Forgot password?
            </Typography>
            <SignInButton onClick={() => login()}>Sign In</SignInButton>
          </>
        )}
      </DialogContentContainer>

      <CreateAccountContainer>
        <DividerContainer>
          <Divider
            style={{
              color: "#006d4b",
            }}
          >
            Or continue with Google / Create Account
          </Divider>
        </DividerContainer>

        <CreateAccountOptions />
      </CreateAccountContainer>
    </Dialog>
  );
}
