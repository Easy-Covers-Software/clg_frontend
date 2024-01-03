'use client';

import { useAuth } from '@/context/AuthContext';
import { GenerationContext } from '@/context/GenerationContext';

import LoginDialog from '@/components/Global/Login/LoginDialog';
import SettingsDialog from '@/components/Global/Settings/SettingsDialog';
import HelpDialog from '@/components/Global/HelpDialog/HelpDialog';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

// import GenerationSetup from './components/GenerationSetup'
import GenerationSetupLists from './components/GenerationSetupLists';
import GenerationSectionBody from './components/GenerationSectionBody';

import SnackbarAlert from '../../components/Global/components/SnackbarAlert';
import AlertDialogConfirm from '../../components/Global/components/AlertDialogConfirm';
import { useEffect } from 'react';

import { useMediaQuery } from '@mui/material';

const Container = styled(Grid)`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen (max-width: 0px) and (max-width: 600px) {
    // height: calc(100vh - 60px);
  }

  @media screen and (max-width: 600px) {
  }

  @media screen and (max-width: 420px) {
  }
`;

export default function GenerationSection() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state, dispatch } = useAuth();
  const { trackers, dialogProps, snackbar, confirmDialog } = state;

  useEffect(() => {
    if (trackers.updatePage) {
      trackers.updatePage('generate');
    }
  }, [trackers.updatePage]);

  return (
    <Container>
      {dialogProps?.isLoginOpen ? <LoginDialog /> : null}
      {dialogProps?.isHelpDialogOpen ? <HelpDialog /> : null}
      <GenerationContext>
        <GenerationSetupLists />
        <GenerationSectionBody />
      </GenerationContext>

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
