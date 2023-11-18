'use client';

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { LoginApiMethods } from '@/Utils/utils';
import SnackbarAlert from '../Global/components/SnackbarAlert';
import {
  APIResponse,
  ForgotPasswordSuccessApiResponse,
} from '@/Types/ApiResponse.types';

import {
  APIResponse,
  ForgotPasswordSuccessApiResponse,
} from '@/Types/ApiResponse.types';

const { submitNewPasswords } = LoginApiMethods;

const ResetPasswordForm = () => {
  const { state } = useAuth();
  const { snackbar } = state;

  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const getTokensFromUrl = () => {
    const path = window.location.pathname;
    const parts = path.split('/');

    const uid = parts[2];
    const token = parts[3];

    return { uid, token };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentURL = window.location.href;

    console.log('Current URL:', currentURL);
    // Validate passwords match
    if (newPassword1 !== newPassword2) {
      alert('Passwords do not match!');
      return;
    }

    // Get uid and token from URL
    const { uid, token } = getTokensFromUrl();

    console.log('UID:', uid);
    console.log('token:', token);

    const response: APIResponse<ForgotPasswordSuccessApiResponse> =
      await submitNewPasswords(newPassword1, newPassword2, uid, token);

    if (
      response.data &&
      response.data.detail === 'Password has been reset with the new password.'
    ) {
      snackbar?.updateSnackbar(true, 'success', 'Password has been reset!');
      setTimeout((window.location.href = '/'), 3000);
    }

    console.log('New Passsses Response:', response);

    // TODO: Make an API call or other logic to reset the password
    console.log('New Password: ', newPassword1);
  };

  return (
    <Grid container justifyContent='center' alignItems='center'>
      <Paper elevation={3} style={{ padding: '2rem', marginBottom: '10%' }}>
        <Typography className='enter-new-password'>
          Enter your new password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type='password'
            label='New Password'
            variant='outlined'
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />

          <TextField
            fullWidth
            type='password'
            label='Confirm New Password'
            variant='outlined'
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />

          <Grid2 display='flex' justifyContent='flex-end'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              style={{ border: '1px solid #006d4b', color: '#006d4b' }}
            >
              Reset Password
            </Button>
          </Grid2>
        </form>
      </Paper>
      <SnackbarAlert
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />
    </Grid>
  );
};

export default ResetPasswordForm;
