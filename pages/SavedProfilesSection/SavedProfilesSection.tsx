'use client';

// External Libraries
import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

// Context
import { useAuth } from '@/context/AuthContext';
import SavedCoverLettersContext from '@/context/SavedCoverLettersContext';

// Components (global)
import SnackbarAlert from '../../components/Global/components/SnackbarAlert';
import AlertDialogConfirm from '../../components/Global/components/AlertDialogConfirm';

// Components (local)
import LoginDialog from '@/components/Login/LoginDialog';
import SettingsDialog from '@/components/Settings/SettingsDialog';
import SavedProfilesList from './components/SavedProfilesList/SavedProfilesList';
import CoverLetterEdit from './components/CoverLetterEdit/CoverLetterEdit';

const Container = styled(Grid)`
  display: flex;
  // justify-content: space-between;
  justify-content: end;
  width: 100%;
`;

export default function SavedProfilesSection() {
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
              <SavedProfilesList />
            ) : (
              <CoverLetterEdit />
            )}
          </>
        ) : (
          <>
            <SavedProfilesList />
            <CoverLetterEdit />
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
