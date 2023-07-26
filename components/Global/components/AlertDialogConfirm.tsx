import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

interface AlertDialogConfirmProps {
  open: boolean;
  header: string;
  message: string;
}

export default function AlertDialogConfirm(props: AlertDialogConfirmProps) {
  const { open, header, message } = props;
  const { handleAlertDialogConfirmClose, dispatch } = useAuth();

  const handleCancel = () => {
    dispatch({ type: "SET_DID_CONFIRM_ALERT", payload: false });
    handleAlertDialogConfirmClose();
  };

  const handleConfirm = () => {
    dispatch({ type: "SET_DID_CONFIRM_ALERT", payload: true });
    handleAlertDialogConfirmClose();
  };

  console.log("header", header);

  return (
    <div>
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
          {/* <UnSelectedButton onClick={handleCancel}>Cancel</UnSelectedButton>
          <UnSelectedButton onClick={handleConfirm} autoFocus>
            Delete
          </UnSelectedButton> */}
          <Button onClick={handleCancel}>
            <Typography variant="alertDialogButton">Cancel</Typography>
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            <Typography variant="alertDialogButton">Delete</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
