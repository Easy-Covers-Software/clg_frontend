'use client';

import { useEffect } from 'react';

//-- mui --//
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';

//-- context --//
import { useAuth } from '@/context/AuthContext';

import { CandidatesContextProvider } from '@/context/CandidatesContext';

//-- components (global) --//
import SnackbarAlert from '../../components/Global/components/SnackbarAlert';
import AlertDialogConfirm from '../../components/Global/components/AlertDialogConfirm';
import LoginDialog from '@/components/Login/LoginDialog';

//-- components (local) --//
import SavedCandidatesList from './components/SavedCandidatesList';
import CandidateSelectionBody from './components/CandidateSelectionBody';

// const Container = styled(Grid)`
const Container = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export default function CandidatesSection() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();

  const { trackers, dialogProps, snackbar, confirmDialog } = state;

  useEffect(() => {
    if (trackers.updatePage) {
      trackers.updatePage('candidates');
    }
  }, [trackers.updatePage]);

  return (
    <Container>
      {dialogProps.isLoginOpen ? <LoginDialog /> : null}
      <CandidatesContextProvider>
        {isMobile ? (
          <>
            {trackers.mobileModeSaved === 'choose' ? (
              <SavedCandidatesList />
            ) : (
              <CandidateSelectionBody />
            )}
          </>
        ) : (
          <>
            <SavedCandidatesList />
            <CandidateSelectionBody />
          </>
        )}
      </CandidatesContextProvider>

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
