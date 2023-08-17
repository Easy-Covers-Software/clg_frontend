"use client";

import React, { useState, useEffect, useRef } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import UpgradeAccountOption from "./components/UpgradeAccountOption";
import { useAuth } from "@/context/AuthContext";

import { DialogContentContainer, FullLogo } from "./SettingsDialog.styles";

import Paypal from "./components/Paypal";
import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";

let packages = [
  {
    name: "Intro Drafter",
    features: ["5 Cover Letters", "10 Adjustments"],
    price: "$0.99",
    price_gpt4: "$1.99",
  },
  {
    name: "Dynamic Drafter",
    features: ["10 cover letters", "20 Adjustments"],
    price: "$1.99",
    price_gpt4: "$2.99",
  },
  {
    name: "Pro Drafter",
    features: ["20 cover letters", "40 Adjustments"],
    price: "$2.99",
    price_gpt4: "$5.99",
  },
  {
    name: "Letter Luminary",
    features: ["75 cover letters", "150 Adjustments"],
    price: "$4.99",
    price_gpt4: "$9.99",
  },
  {
    name: "Cover Connoisseur",
    features: ["200 cover letters", "400 Adjustments"],
    price: "$9.99",
    price_gpt4: "$18.99",
  },
];

const PaypalContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;

  @media screen (min-width: 0px) and (max-width: 600px) {
    margin-bottom: 25%;
  }
`;

export default function SettingsDialog() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { state, toggleSettingsIsOpen } = useAuth();
  const { isSettingsOpen } = state;
  const [selectedPackagePrice, setSelectedPackagePrice] = useState("");

  const [hasSelectedPricingOption, setHasSelectedPricingOption] =
    useState(false);

  const dialogRef = useRef(null);

  useEffect(() => {
    if (selectedPackagePrice !== "") {
      setHasSelectedPricingOption(true);
      if (isMobile) {
        // setTimeout(scrollToBottom, 1200);
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 3000);
      }
    }
  }, [selectedPackagePrice]);

  const handleClose = () => {
    toggleSettingsIsOpen(false);
  };

  return (
    <Dialog
      open={isSettingsOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundColor: "#F8F8FF",
        },
      }}
      ref={dialogRef}
    >
      <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />

      <Grid
        display={"flex"}
        mr={"3%"}
        style={{
          flexDirection: isMobile ? "column" : "row",
          // padding: isMobile ? "0 20%" : "0",
        }}
      >
        {hasSelectedPricingOption && isMobile && (
          <PaypalContainer>
            <Typography
              style={{
                fontSize: "1.5rem",
                color: "#006d4b",
                padding: "1%",
                borderBottom: "1px solid #006d4b",
              }}
            >
              {selectedPackagePrice}
            </Typography>
            <Paypal selectedPackagePrice={selectedPackagePrice} />
          </PaypalContainer>
        )}

        <DialogContentContainer>
          {packages.map((packageItem, i) => (
            <UpgradeAccountOption
              key={i}
              packages={packageItem}
              setSelectedPackagePrice={setSelectedPackagePrice}
            />
          ))}
        </DialogContentContainer>

        {hasSelectedPricingOption && !isMobile && (
          <PaypalContainer>
            <Typography
              style={{
                fontSize: "1.5rem",
                color: "#006d4b",
                padding: "1%",
                borderBottom: "1px solid #006d4b",
              }}
            >
              {selectedPackagePrice}
            </Typography>
            <Paypal selectedPackagePrice={selectedPackagePrice} />
          </PaypalContainer>
        )}
      </Grid>
    </Dialog>
  );
}
