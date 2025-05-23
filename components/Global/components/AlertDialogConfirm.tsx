import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useAuth } from '@/context/AuthContext';

interface AlertDialogConfirmProps {
  open: boolean;
  header: string;
  message: string;
  buttonText: string;
}

export default function AlertDialogConfirm({
  open,
  header,
  message,
  buttonText,
}: AlertDialogConfirmProps) {
  const { state, dispatch } = useAuth();
  const { dialogProps, confirmDialog } = state;

  const handleCancel = () => {
    confirmDialog?.updateDidConfirmAlert(false);
    confirmDialog?.reset();
  };

  const handleConfirm = () => {
    confirmDialog?.updateDidConfirmAlert(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{header}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant='outlined'
          onClick={handleCancel}
          style={{
            color: '#006d4b',
            border: '1px solid #006d4b',
          }}
        >
          <Typography variant='body1'>Cancel</Typography>
        </Button>
        <Button
          variant='outlined'
          onClick={handleConfirm}
          autoFocus
          style={{
            color: '#006d4b',
            border: '1px solid #006d4b',
          }}
        >
          <Typography variant='body1'>{buttonText}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
