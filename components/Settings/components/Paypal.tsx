import React, { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

import { SnackbarAlert } from "@/components/Global/components/SnackbarAlert";
import { useAuth } from "@/context/AuthContext";

import { SettingsUtils } from "@/Utils/utils";
import { AlertColor } from "@mui/material";

export default function Paypal({ selectedPackagePrice }) {
  const { toggleSettingsIsOpen, updateSnackbar } = useAuth();
  const { extractPrice } = SettingsUtils;

  const handleClose = () => {
    toggleSettingsIsOpen(false);
  };

  return (
    <>
      <PayPalButtons
        style={{ layout: "horizontal", height: 45 }}
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
        onCancel={() => updateSnackbar(true, "warning", "Payment Cancelled")}
        onError={(err) => {
          updateSnackbar(
            true,
            "error",
            "Error during transaction, please try again."
          );
        }}
        onApprove={(data, actions) => {
          handleClose();
          updateSnackbar(true, "success", "Success! Upgrade Complete!");
          return actions.order.capture().then(function (details) {
            console.log("details", details);
          });
        }}
      />
    </>
  );
}
