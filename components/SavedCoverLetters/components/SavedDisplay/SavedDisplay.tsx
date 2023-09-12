import { Container, SubContainer } from './SavedDisplay.styles';

import SearchAndFilter from './components/SearchAndFilter';
import SavedLettersList from './components/SavedLettersList';

import { Typography } from '@mui/material';

export default function SavedDisplay() {
  return (
    <Container>
      <SubContainer>
        <Typography className='saved-header'>Saved Cover Letters</Typography>
        <SearchAndFilter />
        <SavedLettersList />
      </SubContainer>
    </Container>
  );
}
