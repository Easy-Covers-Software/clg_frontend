import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import SignedInDisplay from './components/SignedInDisplay';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

import { Container, GenerationModeTab, Tabs } from './MenuLoggedIn.styles';

export default function MenuLoggedIn() {
  const {
    state: { trackers },
    dispatch,
  } = useAuth();

  const { page } = trackers;
  console.log('page', page);

  return (
    <Container>
      <Tabs>
        <Link href={'/'} className={'no_underline'} passHref>
          <GenerationModeTab
            style={{
              backgroundColor: page === 'generation-mode' ? '#f5faf5' : 'white',
            }}
            onClick={() => {
              trackers?.updatePage('generation-mode');
            }}
          >
            Generate
          </GenerationModeTab>
        </Link>

        <Link href={'/transcription'} className={'no_underline'} passHref>
          <GenerationModeTab
            style={{
              backgroundColor: page === 'transcription' ? '#f5faf5' : 'white',
            }}
            onClick={() => {
              trackers?.updatePage('transcription');
            }}
          >
            Transcription
          </GenerationModeTab>
        </Link>

        <Link href={'/saved'} className={'no_underline'} passHref>
          <GenerationModeTab
            style={{
              backgroundColor: page === 'saved' ? '#f5faf5' : 'white',
            }}
            onClick={() => {
              trackers?.updatePage('saved');
            }}
          >
            Saved
          </GenerationModeTab>
        </Link>
      </Tabs>

      {/* <Grid> */}
      <SignedInDisplay />
      {/* </Grid> */}
    </Container>
  );
}
