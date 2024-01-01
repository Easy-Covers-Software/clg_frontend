'use client';

import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';

import LoginInputs from './components/LoginInputs';
import CreateAccountOptions from './components/CreateAccountOptions';

import { useAuth } from '@/context/AuthContext';
import { Typography } from '@mui/material';

import {
  DialogContentContainer,
  CreateAccountContainer,
  DividerContainer,
  SignInButton,
  FullLogo,
} from './LoginDialog.styles';

import { APIResponse, AuthResponse } from '@/Types/ApiResponse.types';

import { LoginApiMethods } from '@/Utils/utils';
const { createAccount, login, resetPassword } = LoginApiMethods;


const ToggleBackToLogin = ({ accountAuthProps }) => (
  <SignInButton
    onClick={() => accountAuthProps?.updateAction('login')}
  >
    Back to Login
  </SignInButton>
);



export default function LoginDialog() {
  const { state, dispatch } = useAuth();
  const { accountAuthProps, dialogProps, snackbar } = state;

  const handleClose = (): void => {
    dialogProps?.toggleLoginIsOpen();
  };

  const handleLogin = async (): Promise<void> => {
    const response: APIResponse<AuthResponse> = await login(
      accountAuthProps?.username,
      accountAuthProps?.email,
      accountAuthProps?.password
    );

    console.log('login response', response);

    if (response.data) {
      dispatch({ type: 'UPDATE_USER' });
      accountAuthProps.reset();
      snackbar.updateSnackbar(
        true,
        'success',
        `Succes! ${response.data.message}`
      );
      dialogProps.toggleLoginIsOpen();
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error! Invalid credentials.');
    }
  };

  const handleResetPassword = async (): Promise<void> => {
    const response: APIResponse<AuthResponse> = await resetPassword(
      accountAuthProps?.email
    );

    if (response.data) {
      snackbar.updateSnackbar(
        true,
        'success',
        `Success! ${response.data.message}`
      );
      dialogProps.toggleLoginIsOpen();
    } else {
      snackbar.updateSnackbar(true, 'error', `Error! ${response.error}`);
    }
  };

  const renderAuthActions = () => {
    if (accountAuthProps?.action !== 'forgot') {
      return (
        <>
          <Typography
            className="forgot-password"
            onClick={() => accountAuthProps?.updateAction('forgot')}
          >
            Forgot password?
          </Typography>
          <SignInButton onClick={handleLogin}>Sign In</SignInButton>
        </>
      );
    } else {
      return (
        <>
          <SignInButton onClick={handleResetPassword} style={{ marginTop: '3%' }}>
            Send Reset Email
          </SignInButton>

          <ToggleBackToLogin accountAuthProps={accountAuthProps} />
        </>
      );
    }
  };

  return (
    <Dialog
      open={dialogProps?.isLoginOpen}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      PaperProps={{
        style: {
          backgroundColor: '#F8F8FF',
          minHeight: '510px'
        },
      }}
      >
      <DialogContentContainer>

        <FullLogo src='/easy-covers-full.svg' alt='Description of Image' />
        
        <LoginInputs />
        
        {renderAuthActions()}

      </DialogContentContainer>


    </Dialog>
  );
}
