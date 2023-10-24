import { useEffect } from 'react';
import { Container } from './SavedProfilesList.styles';

import { useSavedCoverLettersContext } from '@/context/SavedCoverLettersContext';

import { useAuth } from '@/context/AuthContext';
import SavedList from '@/components/SavedList/SavedList';

import { CoverLetterApiMethods } from '@/Utils/utils';
const { deleteSavedCoverLetter, fetchSavedCoverLetters } =
  CoverLetterApiMethods;

export default function SavedProfilesList() {
  const { state: authState } = useAuth();
  const { snackbar } = authState;

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

  const handleToggle = (selectedCoverLetter: any) => () => {
    dispatch(
      {
        type: 'UPDATE_SELECTED_COVER_LETTER',
        payload: selectedCoverLetter,
      },
      ''
    );
  };

  const handleSearchChange = (event) => {
    dispatch({ type: 'UPDATE_SEARCH', payload: event.target.value }, '');
  };

  useEffect(() => {
    if (savedCoverLetterListProps?.search !== '') {
      const lowerCaseSearchString =
        savedCoverLetterListProps?.search.toLowerCase();

      const newFilteredCoverLetters =
        savedCoverLetterListProps?.savedItems.filter((item) =>
          item.save_name.toLowerCase().includes(lowerCaseSearchString)
        );
      dispatch(
        {
          type: 'UPDATE_FILTERED_ITEMS',
          payload: newFilteredCoverLetters,
        },
        ''
      );
    } else {
      dispatch(
        {
          type: 'UPDATE_FILTERED_ITEMS',
          payload: savedCoverLetterListProps?.savedItems,
        },
        ''
      );
    }
  }, [savedCoverLetterListProps?.search]);

  useEffect(() => {
    getSavedCoverLetters();
  }, []);

  return (
    <Container>
      <SavedList
        savedItems={savedCoverLetterListProps?.filteredItems}
        search={savedCoverLetterListProps?.search}
        loading={savedCoverLetterListProps?.loading}
        selected={savedCoverLetterListProps?.selected}
        listType='coverLetters'
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
    </Container>
  );
}
