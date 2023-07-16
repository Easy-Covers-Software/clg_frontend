"use client";

import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";

import { PrimaryButton } from "../Global";
import LoginInputs from "./components/LoginInputs";
import CreateAccountOptions from "./components/CreateAccountOptions";
import axios from "axios";

import { useRouter } from "next/navigation";

import Cookies from "cookie";

import { useLoginContext } from "@/context/LoginContext";

const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -12%;
  gap: 24px;
`;

const CreateAccountContainer = styled(Grid)`
  padding: 5%;
`;

const DividerContainer = styled(Grid)`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5%;
`;

const SignInButton = styled(PrimaryButton)`
  width: 68%;
  margin: 0 auto;
  padding: 10px 0;
`;

const FullLogo = styled.img`
  height: 180px;
  width: 50%;
  margin: 0 auto;
  margin-top: -6%;
`;

export default function LoginDialog() {
  const { isLoginOpen, toggleLoginIsOpen } = useLoginContext();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleClose = () => {
    toggleLoginIsOpen(false);
  };

  const signInGoogle = async () => {
    console.log("FUNCTION IS GETTING CALLED");

    const endpoint = "https://127.0.0.1:8000/accounts/login/";

    try {
      const response = await axios.get(endpoint, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);

        router.push("/");
      }
    } catch (error) {}
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

        <SignInButton onClick={handleClose}>Sign In</SignInButton>
      </DialogContentContainer>

      <CreateAccountContainer>
        <DividerContainer>
          <Divider>Or create account with</Divider>
        </DividerContainer>

        <CreateAccountOptions signInGoogle={signInGoogle} />
      </CreateAccountContainer>
    </Dialog>
  );
}
