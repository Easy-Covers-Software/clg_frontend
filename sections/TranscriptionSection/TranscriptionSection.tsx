'use client';

// External Libraries
import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

// Context
import { useAuth } from '@/context/AuthContext';
import TranscriptionContext from '@/context/TranscriptionContext';
// import SavedCoverLettersContext from '@/context/SavedCoverLettersContext';

// Components (global)
import SnackbarAlert from '../../components/Global/components/SnackbarAlert';
import AlertDialogConfirm from '../../components/Global/components/AlertDialogConfirm';

// Components (local)
import LoginDialog from '@/components/Global/Login/LoginDialog';
// import SettingsDialog from '@/components/Settings/SettingsDialog';

import SavedPhoneCallsList from './components/SavedPhoneCallsList';
import TranscriptionSectionBody from './components/TranscriptionSectionBody';

// import SavedProfilesList from './components/SavedProfilesList/SavedProfilesList';

const Container = styled(Grid)`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export default function TranscriptionPage() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();

  const { trackers, dialogProps, snackbar, confirmDialog } = state;

  useEffect(() => {
    if (trackers.updatePage) {
      trackers.updatePage('calls');
    }
  }, [trackers.updatePage]);

  return (
    <Container>
      {dialogProps.isLoginOpen ? <LoginDialog /> : null}
      {/* {dialogProps.isSettingsOpen ? <SettingsDialog /> : null} */}
      <TranscriptionContext>
        <SavedPhoneCallsList />
        <TranscriptionSectionBody />
      </TranscriptionContext>

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
