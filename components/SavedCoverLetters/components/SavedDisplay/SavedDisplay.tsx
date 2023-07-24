import { Container } from "./SavedDisplay.styles";

import SearchAndFilter from "./components/SearchAndFilter";
import SavedLettersList from "./components/SavedLettersList";

import { Typography } from "@mui/material";

export default function SavedDisplay() {
  return (
    <Container>
      <Typography variant="savedHeader">Saved Cover Letters</Typography>
      <SearchAndFilter />
      <SavedLettersList />
    </Container>
  );
}
