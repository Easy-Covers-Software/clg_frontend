import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLoginContext } from '@/context/StateContext';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Unstable_Grid2/Grid2';

import LoginInputs from './components/LoginInputs';
import CreateAccountOptions from './components/CreateAccountOptions';

import { PrimaryButton } from '../Global';

import styled from '@emotion/styled';

const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -12%;
  gap: 24px;
`;

const SignInButton = styled(PrimaryButton)`
  width: 68%;
  margin: 0 auto;
  padding: 8px 0;
`;

export default function LoginDialog() {
  const { isLoginOpen, toggleLoginIsOpen } = useLoginContext();

  const handleClickOpen = () => {
    toggleLoginIsOpen(true);
  };

  const handleClose = () => {
    toggleLoginIsOpen(false);
  };

  return (
    <Dialog
      open={isLoginOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: {
          backgroundColor: '#F8F8FF',
        },
      }}
    >
      <img
        src="/easy-covers-full.svg"
        alt="Description of Image"
        height={180}
        width={'50%'}
        style={{
          margin: '0 auto',
          marginTop: '-6%',
        }}
      />

      <DialogContentContainer>
        <LoginInputs />

        <SignInButton onClick={handleClose}>Sign In</SignInButton>
      </DialogContentContainer>

      <Grid padding={'3%'}>
        <Grid width={'78%'} margin={'0 auto'}>
          <Divider>Or create account with</Divider>
        </Grid>

        <Grid>
          <CreateAccountOptions />
        </Grid>
      </Grid>
    </Dialog>
  );
}
