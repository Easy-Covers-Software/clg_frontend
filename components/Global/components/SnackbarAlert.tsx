import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AlertColor } from "@mui/material/Alert";

import { useAuth } from "@/context/AuthContext";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  type: AlertColor;
  message: string;
  open: boolean;
}

function SnackbarAlert(props: SnackbarProps) {
  const { type, message, open } = props;
  const { handleSnackbarClose } = useAuth();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    // call the onClose prop to notify the parent to close the snackbar
    handleSnackbarClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export { SnackbarAlert };
