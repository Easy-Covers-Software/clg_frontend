'use client';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, List, Dialog, useMediaQuery } from '@mui/material';

import { useAuth } from '@/context/AuthContext';

import { UnSelectedButton } from '@/components/Global/Global';
import { DialogContentContainer, FullLogo } from './HelpDialog.styles';

import styled from '@emotion/styled';

import 'styles/help-dialog.css';

const InstructionsContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;
  @media screen (min-w idth: 0px) and (max-width: 600px) {
    margin-bottom: 25%;
  }
`;

const FullListItem = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;

  @media screen (min-width: 0px) and (max-width: 800px) {
    margin-bottom: 25%;
  }
`;

export default function HelpDialog() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { state } = useAuth();
  const { dialogProps } = state;

  const handleClose = () => {
    dialogProps?.toggleHelpDialog();
  };

  return (
    <Dialog
      open={dialogProps?.isHelpDialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          backgroundColor: '#F8F8FF',
          height: isMobile ? '90%' : '80%',
        },
      }}
    >
      <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />
      <DialogContentContainer>
        <Typography className="welcome" align="center">
          Welcome!
        </Typography>

        <InstructionsContainer>
          <List>
            <FullListItem>
              <Typography className="list-item" align="right" pr={0}>
                1.
              </Typography>
              <Typography className="list-item instructions">
                Directly copy and paste the posting / description of the job you
                are applying for or type in the information manually. The more
                descriptive the better the results.
              </Typography>
            </FullListItem>

            <FullListItem>
              <Typography className="list-item" align="right" pr={0}>
                2.
              </Typography>
              <Typography className="list-item instructions">
                Simply upload your current resume file. If you don't have one
                readily accessible, switch the toggle to free-text mode and
                enter your information manually (worse results unless very
                descriptive).
              </Typography>
            </FullListItem>

            <FullListItem>
              <Typography className="list-item" align="right" pr={0}>
                3.
              </Typography>
              <Typography className="list-item instructions">
                (optional) Enter the inputs that will help the AI generate the
                best results for you.
              </Typography>
            </FullListItem>
          </List>
        </InstructionsContainer>

        <Typography className="post-instruction" align="center">
          (The more descriptive the better the results)
        </Typography>

        <UnSelectedButton
          onClick={handleClose}
          style={{
            width: isMobile ? '100%' : '80%',
          }}
        >
          Got it!
        </UnSelectedButton>
      </DialogContentContainer>
    </Dialog>
  );
}
