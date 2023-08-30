import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { UnSelectedButton } from '@/components/Global/Global';
import {
  Container,
  HorizontalDivider,
  GenerationModeTab,
} from './MenuLoggedOut.styles';

export default function MenuLoggedOut() {
  const { state } = useAuth();
  const { accountAuthProps, trackers, dialogProps, page } = state;
  const { isLoginOpen } = state;

  return (
    <Container>
      <Link href={'/'} className={'no_underline'} passHref>
        <GenerationModeTab
          style={{
            backgroundColor:
              trackers?.page === 'generation-mode' ? '#f5faf5' : 'white',
          }}
        >
          Generate
        </GenerationModeTab>
      </Link>

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
