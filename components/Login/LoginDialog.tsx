"use client";

import React from "react";

import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";

import LoginInputs from "./components/LoginInputs";
import CreateAccountOptions from "./components/CreateAccountOptions";

import { useAuth } from "@/context/AuthContext";

import {
  DialogContentContainer,
  CreateAccountContainer,
  DividerContainer,
  SignInButton,
  FullLogo,
} from "./LoginDialog.styles";

export default function LoginDialog() {
  const { state, toggleLoginIsOpen, login, createAccount } = useAuth();
  const { isLoginOpen, createAccountEasyCovers } = state;

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
        ) : (
          <SignInButton onClick={() => login()}>Sign In</SignInButton>
        )}
      </DialogContentContainer>

      <CreateAccountContainer>
        <DividerContainer>
          <Divider>Or create account with</Divider>
        </DividerContainer>

        <CreateAccountOptions />
      </CreateAccountContainer>
    </Dialog>
  );
}
