"use client";

import React, { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

import Dialog from "@mui/material/Dialog";
import UpgradeAccountOption from "./components/UpgradeAccountOption";
import { useAuth } from "@/context/AuthContext";

import { DialogContentContainer, FullLogo } from "./SettingsDialog.styles";

import Paypal from "./components/Paypal";

let packages = [
  {
    name: "Intro Drafter",
    features: ["5 Unique Cover Letters", "10 Adjustments", "GPT-4 or GPT-3.5"],
    price: "$0.99",
    price_gpt4: "$1.99",
  },
  {
    name: "Dynamic Drafter",
    features: ["10 unique cover letters", "20 Adjustments", "GPT-4 or GPT-3.5"],
    price: "$1.99",
    price_gpt4: "$2.99",
  },
  {
    name: "3rd level",
    features: ["20 unique cover letters", "40 Adjustments", "GPT-4 or GPT-3.5"],
    price: "$2.99",
    price_gpt4: "$5.99",
  },
  {
    name: "Letter Luminary",
    features: [
      "75 unique cover letters",
      "150 Adjustments",
      "GPT-4 or GPT-3.5",
    ],
    price: "$4.99",
    price_gpt4: "$9.99",
  },
  {
    name: "Cover Connoisseur",
    features: [
      "200 unique cover letters",
      "400 Adjustments",
      "GPT-4 or GPT-3.5",
    ],
    price: "$9.99",
    price_gpt4: "$18.99",
  },
];

export default function SettingsDialog() {
  const { state, toggleSettingsIsOpen } = useAuth();
  const { isSettingsOpen } = state;
  const [selectedPackagePrice, setSelectedPackagePrice] = useState(null);

  const [hasSelectedPricingOption, setHasSelectedPricingOption] =
    useState(false);

  useEffect(() => {
    if (selectedPackagePrice !== null) {
      setHasSelectedPricingOption(true);
    }
  }, [selectedPackagePrice]);

  const handleClose = () => {
    toggleSettingsIsOpen(false);
  };

  const extractPrice = (frontendValue) => {
    const pattern = /(\d+\.\d+)/g;
    const match = frontendValue.match(pattern);

    if (match && match.length > 0) {
      return match[0];
    }

    return null;
  };

  const handleStripePayment = () => {};

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
        {packages.map((packageItem) => (
          <UpgradeAccountOption
            packages={packageItem}
            setSelectedPackagePrice={setSelectedPackagePrice}
          />
        ))}

        {hasSelectedPricingOption && (
          <Paypal selectedPackagePrice={selectedPackagePrice} />
        )}
      </DialogContentContainer>
    </Dialog>
  );
}
