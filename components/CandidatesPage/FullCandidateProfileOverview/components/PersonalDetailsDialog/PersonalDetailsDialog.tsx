import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';
import { IconButton } from '@mui/material';
import SettingsAccessibilityTwoToneIcon from '@mui/icons-material/SettingsAccessibilityTwoTone';
import BasicInfo from '../WorkPreferencesPanel/components/BasicInfo/BasicInfo';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';

const StyledPaper = styled(Paper)``;

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <StyledPaper {...props} />
    </Draggable>
  );
}

const PersonalDetailsDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClickOpen}
        style={{
          border: '1px solid gray',
        }}
      >
        <SettingsAccessibilityTwoToneIcon fontSize="large" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={'sm'}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        {/* Title */}
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Personal Details
        </DialogTitle>

        {/* Body */}
        <DialogContent>
          <BasicInfo selectedCandidate={''} />
        </DialogContent>

        {/* Action Buttons */}
        <DialogActions>
          <UnSelectedButton autoFocus onClick={handleClose}>
            Close
          </UnSelectedButton>
          <UnSelectedButton onClick={handleClose}>Update</UnSelectedButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PersonalDetailsDialog;
