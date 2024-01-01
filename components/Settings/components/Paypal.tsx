import React, { useState, useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

// import SnackbarAlert from "@/components/Global/components/SnackbarAlert";
import { useAuth } from '@/context/AuthContext';
import { extractPrice } from '@/Utils/utils';

import { AlertColor } from '@mui/material';

export default function Paypal({ selectedPackagePrice }) {
  const { state, dispatch } = useAuth();
  const { dialogProps, loggedInProps, snackbar } = state;

  const handleClose = () => {
    dialogProps?.toggleSettingsIsOpen();
  };

  return (
    <>
      <PayPalButtons
        style={{ layout: 'vertical', height: 45 }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: extractPrice(selectedPackagePrice),
                },
                custom_id: loggedInProps.email,
              },
            ],
          });
        }}
        onCancel={() =>
          snackbar?.updateSnackbar(true, 'warning', 'Payment Cancelled')
        }
        onError={(err) => {
          snackbar?.updateSnackbar(
            true,
            'error',
            'Error during transaction, please try again.'
          );
        }}
        onApprove={(data, actions) => {
          handleClose();
          dispatch({ type: 'UPDATE_USER', payload: true });
          snackbar?.updateSnackbar(
            true,
            'success',
            'Success! Payment Accepted, give up to 1 minute for credits to be added to your account!'
          );
          return actions.order.capture().then(function (details) {
            console.log('details', details);
          });
        }}
      />
    </>
  );
}
