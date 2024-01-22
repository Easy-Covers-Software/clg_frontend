import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { UnSelectedButton } from '@/components/Global/Global';

import { useAuth } from '@/context/AuthContext';

import { SignedInDisplayStyledComponents } from '../MenuLoggedIn.styles';
const {
  Container,
  HorizontalDivider,
  CoverLetterStatsContainer,
  StatContainer,
} = SignedInDisplayStyledComponents;

import { APIResponse, AuthResponse } from '@/Types/ApiResponse.types';
import { logout } from '@/api/AuthMethods';

const Stat = ({ statName, statValue }) => (
  <StatContainer>
    <Typography className="access-stats left">{statName}</Typography>
    <Typography className="access-stats right">{statValue}</Typography>
  </StatContainer>
);

export default function SignedInDisplay() {
  const { state } = useAuth();
  const { loggedInProps, dialogProps, snackbar, user, accessLevel } = state;

  const handleLogout = async (): Promise<void> => {
    const response: APIResponse<AuthResponse> = await logout();

    if (response.data) {
      // loggedInProps.reset();
      window.location.reload();
      snackbar.updateSnackbar(
        true,
        'success',
        `Success! ${response.data.message}`
      );
    } else {
      snackbar.updateSnackbar(true, 'error', 'Error logging out.');
    }
  };

  console.log('loggedInProps', loggedInProps);

  return (
    <Container>
      <Typography className="profile-email">{loggedInProps?.email}</Typography>

      <HorizontalDivider />

      <UnSelectedButton
        onClick={() => dialogProps?.toggleHelpDialog()}
        style={{
          border: '1px solid #006D4B',
        }}
      >
        Help
      </UnSelectedButton>

      <UnSelectedButton
        onClick={handleLogout}
        style={{
          border: '1px solid #006D4B',
        }}
      >
        Logout
      </UnSelectedButton>
    </Container>
  );
}
