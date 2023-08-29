import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useSavedCoverLettersContext } from '@/context/SavedCoverLettersContext';
import { useAuth } from '@/context/AuthContext';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';

import styled from '@emotion/styled';

import { CoverLetterApiMethods } from '@/Utils/utils';
const { deleteSavedCoverLetter, fetchSavedCoverLetters } =
  CoverLetterApiMethods;

const EmptyListGrid = styled(Grid)`
  text-align: center;
  padding: 1%;
  margin-top: 5%;
`;

export default function SavedLettersList() {
  const { state, dispatch, resetSelected } = useSavedCoverLettersContext();

  const { savedCoverLetterListProps, getSavedLoading, search } = state;

  const { state: authState, dispatch: authDispatch } = useAuth();
  const {
    loggedInProps,
    dialogProps,
    trackers,
    snackbar,
    confirmDialog,
    didConfirmAlert,
  } = authState;

  const [savedCoverLetters, setSavedCoverLetters] = useState([]);
  const [filteredCoverLetters, setFilteredCoverLetters] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleToggle = (selectedCoverLetter) => () => {
    setSelected(selectedCoverLetter);
    dispatch({
      type: 'SET_SELECTED_COVER_LETTER',
      payload: selectedCoverLetter,
    });
  };

  useEffect(() => {
    dispatch({
      type: 'UPDATE_SAVED_LIST',
    });
  }, [loggedInProps.isAuthenticated]);

  const confirmDelete = async () => {
    const response = await deleteSavedCoverLetter(
      savedCoverLetterListProps.selectedCoverLetter?.id
    );

    if (response) {
      snackbar?.updateSnackbar(
        true,
        'success',
        'Cover Letter Deleted Successfully'
      );
      // savedCoverLetterListProps.resetSelected();
      confirmDialog?.reset();
      await getSavedCoverLetters();
    } else {
      snackbar?.updateSnackbar(true, 'error', 'Error Deleting Cover Letter');
    }
  };

  useEffect(() => {
    setFilteredCoverLetters(savedCoverLetters);
  }, [savedCoverLetters]);

  useEffect(() => {
    if (state.savedCoverLetterListProps.search !== '') {
      const lowerCaseSearchString =
        state.savedCoverLetterListProps.search.toLowerCase();
      const newFilteredCoverLetters = savedCoverLetters.filter((coverLetter) =>
        coverLetter.saveName.toLowerCase().includes(lowerCaseSearchString)
      );
      setFilteredCoverLetters(newFilteredCoverLetters);
    } else {
      setFilteredCoverLetters(savedCoverLetters);
    }
  }, [search]);

  useEffect(() => {
    if (confirmDialog.didConfirmAlert) {
      confirmDelete();
    }
  }, [confirmDialog.didConfirmAlert]);

  useEffect(() => {
    if (selected !== null) {
      trackers?.updateMobileModeSaved('edit');
    }
  }, [selected]);

  //-- new code --//
  const getSavedCoverLetters = async (): Promise<void> => {
    const response = await fetchSavedCoverLetters();

    if (response.data) {
      console.log('getSaved call', response.data);
      setSavedCoverLetters(response.data);
    } else {
      snackbar?.updateSnackbar(true, 'error', 'Error Fetching Cover Letters');
    }
  };

  const handleDelete = async () => {
    confirmDialog.openAlertDialogConfirm(
      true,
      'Delete Cover Letter',
      'Are you sure you want to delete this cover letter?',
      'Delete'
    );
  };

  // fetch saved cover letters on mount
  useEffect(() => {
    getSavedCoverLetters();
  }, []);

  // update saved cover letters when selected changes
  useEffect(() => {
    getSavedCoverLetters();
  }, [savedCoverLetterListProps?.selectedCoverLetter]);

  useEffect(() => {
    savedCoverLetterListProps.updateSavedCoverLetters(savedCoverLetters);
  }, [savedCoverLetters]);

  // if selected changes update in context
  useEffect(() => {
    if (selected !== null) {
      savedCoverLetterListProps.updateSelectedCoverLetter(selected);
    }
  }, [selected]);

  if (getSavedLoading) return <CircularProgress />;

  return (
    <List className='saved-letters-list'>
      {!loggedInProps.isAuthenticated ? (
        <EmptyListGrid>
          <Typography>
            Not signed in. Sign in to save cover letters and view them here.
          </Typography>
        </EmptyListGrid>
      ) : filteredCoverLetters.length === 0 && search === '' ? (
        <EmptyListGrid>
          <Typography>
            None Saved! Generate a cover letter and save to view on this page.
          </Typography>
        </EmptyListGrid>
      ) : filteredCoverLetters.length === 0 ? (
        <EmptyListGrid>
          <Typography>
            No cover letters found with that name. Try another search.
          </Typography>
        </EmptyListGrid>
      ) : (
        <>
          {filteredCoverLetters.length > 0 &&
            filteredCoverLetters?.map((coverLetter, i) => {
              const labelId = `radio-list-label-${coverLetter.save_name}-${i}`;

              return (
                <ListItem
                  key={labelId}
                  style={{
                    borderBottom: '0.4px solid #006D4B',
                  }}
                  secondaryAction={
                    <>
                      {selected?.id === coverLetter.id && ( // Assuming coverLetter has an id property
                        <IconButton
                          edge='end'
                          aria-label='comments'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                          }}
                        >
                          <DeleteForeverOutlinedIcon />
                        </IconButton>
                      )}
                    </>
                  }
                  disablePadding
                  onClick={handleToggle(coverLetter)} // Assuming coverLetter has an id property
                >
                  <IconButton disableRipple>
                    <Radio
                      edge='start'
                      checked={selected?.id === coverLetter.id} // Assuming coverLetter has an id property
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      style={{
                        color: '#006D4B',
                      }}
                    />
                  </IconButton>
                  <ListItemText
                    id={coverLetter.id}
                    primary={coverLetter.save_name}
                  />
                </ListItem>
              );
            })}
        </>
      )}
    </List>
  );
}
