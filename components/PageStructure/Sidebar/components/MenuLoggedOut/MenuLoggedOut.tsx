import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { UnSelectedButton } from '@/components/Global/Global';
import {
  Container,
  HorizontalDivider,
  GenerationModeTab,
} from './MenuLoggedOut.styles';

//== TODO: Dont want to display any nav options besides login ==//
export default function MenuLoggedOut() {
  const { state } = useAuth();
  const { accountAuthProps, trackers, dialogProps, page } = state;
  const { isLoginOpen } = state;

  return (
    <Container>
      <Grid>
        <HorizontalDivider />
        <UnSelectedButton
          onClick={() => dialogProps?.toggleLoginIsOpen()}
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          Sign In
        </UnSelectedButton>
      </Grid>
    </Container>
  );
}
