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

import { LoginApiMethods } from '@/Utils/utils';
import { APIResponse, AuthResponse } from '@/Types/ApiResponse.types';
const { logout } = LoginApiMethods;

const Stat = ({ statName, statValue }) => (
  <StatContainer>
    <Typography className='access-stats left'>{statName}</Typography>
    <Typography className='access-stats right'>{statValue}</Typography>
  </StatContainer>
);

export default function SignedInDisplay() {
  const { state } = useAuth();
  const { loggedInProps, dialogProps, snackbar, user, accessLevel } = state;

  const handleLogout = async (): Promise<void> => {
    const response: APIResponse<AuthResponse> = await logout();

    if (response.data.message) {
      loggedInProps.reset();
      snackbar?.updateSnackbar(
        true,
        'success',
        `Success! ${response.data.message}`
      );
    } else {
      snackbar?.updateSnackbar(true, 'error', `Error: ${response.error}`);
    }
  };

  console.log('loggedInProps', loggedInProps);

  return (
    <Container>
      <CoverLetterStatsContainer>
        <Stat
          statName='Gpt-3 Generations'
          statValue={loggedInProps?.gpt3_generations_available}
        />
        <Stat
          statName='Gpt-4 Generations'
          statValue={loggedInProps?.gpt4_generations_available}
        />
        <Stat
          statName='Adjustments Available'
          statValue={loggedInProps?.adjustments_available}
        />
      </CoverLetterStatsContainer>
      <Typography className='profile-email'>{loggedInProps?.email}</Typography>

      <HorizontalDivider />

      <UnSelectedButton onClick={() => dialogProps?.toggleSettingsIsOpen()}>
        Upgrade
      </UnSelectedButton>

      <UnSelectedButton onClick={() => dialogProps?.toggleHelpDialog()}>
        Help
      </UnSelectedButton>

      <UnSelectedButton onClick={handleLogout}>Logout</UnSelectedButton>
    </Container>
  );
}
