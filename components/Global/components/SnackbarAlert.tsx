import React, { SyntheticEvent } from 'react';
import { Snackbar, Alert as MuiAlert, AlertColor } from '@mui/material';
import { AlertProps } from '@mui/material/Alert';
import { useAuth } from '@/context/AuthContext';

interface SnackbarProps {
  type: AlertColor;
  message: string;
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
));

function SnackbarAlert({ type, message, open }: SnackbarProps) {
  const { state } = useAuth();
  const { snackbar } = state;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    snackbar.reset();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlert;
