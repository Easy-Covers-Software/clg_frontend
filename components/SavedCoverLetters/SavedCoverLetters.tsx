'use client';

import { useAuth } from '@/context/AuthContext';
import SavedCoverLettersContext from '@/context/SavedCoverLettersContext';

import LoginDialog from '@/components/Login/LoginDialog';
import SettingsDialog from '@/components/Settings/SettingsDialog';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import SnackbarAlert from '../Global/components/SnackbarAlert';

import SavedDisplay from './components/SavedDisplay/SavedDisplay';
import Edit from './components/Edit/Edit';

import AlertDialogConfirm from '../Global/components/AlertDialogConfirm';
import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

const Container = styled(Grid)`
  display: flex;
  // justify-content: space-between;
  justify-content: end;
  width: 100%;
`;

export default function SavedCoverLetters() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state, dispatch } = useAuth();

  const { trackers, dialogProps, snackbar, confirmDialog, mobileMode } = state;

  useEffect(() => {
    if (trackers.updatePage) {
      trackers.updatePage('saved');
    }
  }, [trackers.updatePage]);

  return (
    <Container>
      {dialogProps.isLoginOpen ? <LoginDialog /> : null}
      {dialogProps.isSettingsOpen ? <SettingsDialog /> : null}
      <SavedCoverLettersContext>
        {isMobile ? (
          <>
            {trackers.mobileModeSaved === 'choose' ? (
              <SavedDisplay />
            ) : (
              <Edit />
            )}
          </>
        ) : (
          <>
            <SavedDisplay />
            <Edit />
          </>
        )}
      </SavedCoverLettersContext>

      <SnackbarAlert
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />

      <AlertDialogConfirm
        open={confirmDialog.open}
        header={confirmDialog.header}
        message={confirmDialog.message}
        buttonText={confirmDialog.buttonText}
      />
    </Container>
  );
}
