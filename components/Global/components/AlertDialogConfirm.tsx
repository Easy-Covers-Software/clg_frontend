import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";

interface AlertDialogConfirmProps {
  open: boolean;
  header: string;
  message: string;
}

export default function AlertDialogConfirm({
  open,
  header,
  message,
}: AlertDialogConfirmProps) {
  const { handleAlertDialogConfirmClose, dispatch } = useAuth();

  const handleCancel = () => {
    dispatch({ type: "SET_DID_CONFIRM_ALERT", payload: false });
    handleAlertDialogConfirmClose();
  };

  const handleConfirm = () => {
    dispatch({ type: "SET_DID_CONFIRM_ALERT", payload: true });
    handleAlertDialogConfirmClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          <Typography variant="body1">Cancel</Typography>
        </Button>
        <Button variant="outlined" onClick={handleConfirm} autoFocus>
          <Typography variant="body1">Delete</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
