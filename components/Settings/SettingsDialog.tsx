"use client";

import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";

import { PrimaryButton } from "../Global";

import UpgradeAccountOption from "./components/UpgradeAccountOption";
import { useAuth } from "@/context/AuthContext";
import { Typography } from "@mui/material";

const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -8%;
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
  margin-top: -3%;
`;

let packages = [
  {
    name: "Cover Connoisseur",
    features: [
      "GPT-4 Access",
      "Unlimited Cover Letters",
      "Unlimited Adjustments",
    ],
    price: "$24.99/month",
    price_gpt4: "NA",
  },
  {
    name: "Letter Luminary",
    features: [
      "GPT-3.5 Turbo Access",
      "Unlimited Cover Letters",
      "Unlimited Adjustments",
    ],
    price: "$12.99/month",
    price_gpt4: "NA",
  },
  {
    name: "Dynamic Drafter",
    features: [
      "20 unique cover letters",
      "25 adjustments/queries",
      "GPT-4 or GPT-3.5 Turbo",
    ],
    price: "$4.99",
    price_gpt4: "$8.99",
  },
  {
    name: "Intro Drafter",
    features: [
      "6 Unique Cover Letters",
      "8 Adjustments",
      "GPT-4 or GPT-3.5 Turbo",
    ],
    price: "$2.99",
    price_gpt4: "$4.99",
  },
];

export default function SettingsDialog() {
  const { isSettingsOpen, toggleSettingsIsOpen } = useAuth();

  const handleClose = () => {
    toggleSettingsIsOpen(false);
  };

  return (
    <Dialog
      open={isSettingsOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: "#F8F8FF",
        },
      }}
    >
      <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />

      <DialogContentContainer>
        <UpgradeAccountOption packages={packages[0]} />
        <UpgradeAccountOption packages={packages[1]} />
        <UpgradeAccountOption packages={packages[2]} />
        <UpgradeAccountOption packages={packages[3]} />
      </DialogContentContainer>
    </Dialog>
  );
}
