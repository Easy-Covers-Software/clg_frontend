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
              backgroundColor: page === 'jobPostings' ? '#f5faf5' : 'white',
            }}
            onClick={() => {
              trackers?.updatePage('jobPostings');
            }}
          >
            Job Postings
          </GenerationModeTab>
        </Link>

        <Link href={'/candidates'} className={'no_underline'} passHref>
          <GenerationModeTab
            style={{
              backgroundColor: page === 'candidates' ? '#f5faf5' : 'white',
            }}
            onClick={() => {
              trackers?.updatePage('candidates');
            }}
          >
            Candidates
          </GenerationModeTab>
        </Link>

        <Link href={'/generate'} className={'no_underline'} passHref>
          <GenerationModeTab
            style={{
              backgroundColor: page === 'generate' ? '#f5faf5' : 'white',
            }}
            onClick={() => {
              trackers?.updatePage('generate');
            }}
          >
            Generate
          </GenerationModeTab>
        </Link>

        <Link href={'/calls'} className={'no_underline'} passHref>
          <GenerationModeTab
            style={{
              backgroundColor: page === 'calls' ? '#f5faf5' : 'white',
            }}
            onClick={() => {
              trackers?.updatePage('calls');
            }}
          >
            Calls
          </GenerationModeTab>
        </Link>
      </Tabs>

      {/* <Grid> */}
      <SignedInDisplay />
      {/* </Grid> */}
    </Container>
  );
}
