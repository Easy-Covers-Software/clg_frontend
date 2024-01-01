'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import { useAuth } from '@/context/AuthContext';

import { DialogContentContainer, FullLogo } from './SettingsDialog.styles';

import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

export default function SettingsDialog() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();
  const { dialogProps } = state;

  const handleClose = () => {
    dialogProps?.toggleSettingsIsOpen();
  };

  return (
    <Dialog
      open={dialogProps?.isSettingsOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          backgroundColor: '#F8F8FF',
        },
      }}
    >
      <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />

      <Grid>{/* CONTENT GOES HERE */}</Grid>
    </Dialog>
  );
}
