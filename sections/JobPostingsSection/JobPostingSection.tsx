'use client';

// External Libraries
import { useEffect } from 'react';

//-- mui --//
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

//-- context --//
import { useAuth } from '@/context/AuthContext';
import { JobPostingsContextProvider } from '@/context/JobPostingsContext';

//-- components (global) --//
import SnackbarAlert from '../../components/Global/components/SnackbarAlert';
import AlertDialogConfirm from '../../components/Global/components/AlertDialogConfirm';
import LoginDialog from '@/components/Global/Login/LoginDialog';

//-- components (local) --//
import JobPostingsList from './components/JobPostingsList';
import JobPostingSelectionBody from './components/JobPostingSelectionBody';

const Container = styled(Grid)`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export default function JobPostingSection() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();

  const { trackers, dialogProps, snackbar, confirmDialog } = state;

  useEffect(() => {
    if (trackers.updatePage) {
      trackers.updatePage('jobPostings');
    }
  }, [trackers.updatePage]);

  return (
    <Container>
      {dialogProps.isLoginOpen ? <LoginDialog /> : null}
      {/* {dialogProps.isSettingsOpen ? <SettingsDialog /> : null} */}
      <JobPostingsContextProvider>
        {isMobile ? (
          <>
            {trackers.mobileModeSaved === 'choose' ? (
              <JobPostingsList />
            ) : (
              <JobPostingSelectionBody />
            )}
          </>
        ) : (
          <>
            <JobPostingsList />
            <JobPostingSelectionBody />
          </>
        )}
      </JobPostingsContextProvider>

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
