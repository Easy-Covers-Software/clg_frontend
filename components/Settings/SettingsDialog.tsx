"use client";

import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import UpgradeAccountOption from "./components/UpgradeAccountOption";
import { useAuth } from "@/context/AuthContext";
import { PayPalButtons } from "@paypal/react-paypal-js";

import { DialogContentContainer, FullLogo } from "./SettingsDialog.styles";

let packages = [
  {
    name: "Cover Connoisseur",
    features: [
      "GPT-4 Access",
      "Unlimited Cover Letters",
      "Unlimited Adjustments",
    ],
    price: "$19.99/month",
    price_gpt4: "NA",
  },
  {
    name: "Letter Luminary",
    features: [
      "GPT-3.5 Access",
      "Unlimited Cover Letters",
      "Unlimited Adjustments",
    ],
    price: "$12.99/month",
    price_gpt4: "NA",
  },
  {
    name: "Dynamic Drafter",
    features: ["11 unique cover letters", "18 Adjustments", "GPT-4 or GPT-3.5"],
    price: "$3.99",
    price_gpt4: "$4.99",
  },
  {
    name: "Intro Drafter",
    features: ["2 Unique Cover Letters", "5 Adjustments", "GPT-4 or GPT-3.5"],
    price: "$0.99",
    price_gpt4: "$1.99",
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
        <UpgradeAccountOption
          packages={packages[0]}
          setSelectedPackagePrice={setSelectedPackagePrice}
        />
        <UpgradeAccountOption
          packages={packages[1]}
          setSelectedPackagePrice={setSelectedPackagePrice}
        />
        <UpgradeAccountOption
          packages={packages[2]}
          setSelectedPackagePrice={setSelectedPackagePrice}
        />
        <UpgradeAccountOption
          packages={packages[3]}
          setSelectedPackagePrice={setSelectedPackagePrice}
        />

        {hasSelectedPricingOption && (
          <>
            <PayPalButtons
              style={{
                layout: "horizontal",
                height: 45,
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: extractPrice(selectedPackagePrice),
                      },
                    },
                  ],
                });
              }}
              onCancel={() =>
                toast(
                  "You cancelled the payment. Try again by clicking the PayPal button",
                  {
                    duration: 6000,
                  }
                )
              }
              onError={(err) => {
                toast.error(
                  "There was an error processing your payment. If this error please contact support.",
                  { duration: 6000 }
                );
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  toast.success(
                    "Payment completed. Thank you, " +
                      details.payer.name.given_name
                  );
                });
              }}
            />
            {/* <UnSelectedButton>Debit/Credit</UnSelectedButton> */}
          </>
        )}
        <Toaster position="top-center" />
      </DialogContentContainer>
    </Dialog>
  );
}
