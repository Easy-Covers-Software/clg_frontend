import { useEffect } from 'react';
import { Container, SubContainer } from './SavedProfilesList.styles';

import { Typography } from '@mui/material';
import { useSavedCoverLettersContext } from '@/context/SavedCoverLettersContext';

import { useAuth } from '@/context/AuthContext';
import SavedList from '@/components/SavedList/SavedList';

import { CoverLetterApiMethods } from '@/Utils/utils';

const { deleteSavedCoverLetter, fetchSavedCoverLetters } =
  CoverLetterApiMethods;

export default function SavedProfilesList() {
  const { state: authState } = useAuth();
  const { loggedInProps, trackers, snackbar, confirmDialog } = authState;

  const { state, dispatch } = useSavedCoverLettersContext();
  const { savedCoverLetterListProps } = state;

  // fetch saved cover letters
  const getSavedCoverLetters = async (): Promise<void> => {
    const response = await fetchSavedCoverLetters();
    if (response.data) {
      console.log('response.data', response.data);

      dispatch({
        type: 'UPDATE_SAVED_COVER_LETTERS',
        payload: response.data,
      });

      dispatch({
        type: 'UPDATE_FILTERED_ITEMS',
        payload: response.data,
      });
    } else {
      snackbar?.updateSnackbar(true, 'error', 'Error Fetching Cover Letters');
    }
  };

  const handleToggle = (selectedCoverLetter) => () => {
    dispatch({
      type: 'UPDATE_SELECTED_COVER_LETTER',
      payload: selectedCoverLetter,
    });
    // updateSelected(selectedCoverLetter);
    // setSelected(selectedCoverLetter);
  };

  useEffect(() => {
    getSavedCoverLetters();
  }, []);

  useEffect(() => {
    if (savedCoverLetterListProps?.search !== '') {
      const lowerCaseSearchString =
        savedCoverLetterListProps?.search.toLowerCase();

      const newFilteredCoverLetters =
        savedCoverLetterListProps?.savedItems.filter((item) =>
          item.save_name.toLowerCase().includes(lowerCaseSearchString)
        );
      dispatch({
        type: 'UPDATE_FILTERED_ITEMS',
        payload: newFilteredCoverLetters,
      });
      // updateFilteredItems(newFilteredCoverLetters);
    } else {
      dispatch({
        type: 'UPDATE_FILTERED_ITEMS',
        payload: savedCoverLetterListProps?.savedItems,
      });
      // updateFilteredItems(savedItems);
    }
  }, [savedCoverLetterListProps?.search]);

  const handleSearchChange = (event) => {
    dispatch({ type: 'UPDATE_SEARCH', payload: event.target.value });
  };

  return (
    <Container>
      <SavedList
        savedItems={savedCoverLetterListProps?.filteredItems}
        search={savedCoverLetterListProps?.search}
        loading={savedCoverLetterListProps?.loading}
        selected={savedCoverLetterListProps?.selected}
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
    </Container>
  );
}
