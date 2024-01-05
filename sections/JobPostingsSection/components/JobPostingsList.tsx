import { FC, useEffect } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Container } from '@/components/PageStructure/SavedList/SavedList.styles';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useJobPostingsContext } from '@/context/JobPostingsContext';

//-- import components --//
import SavedList from '@/components/PageStructure/SavedList/SavedList';

//-- import api methods --//
import {
  fetchJobPostings,
  fetchFullJobPosting,
  fetchCandidatesAssociatedWithJobPosting,
  deleteJobPosting,
} from '@/api/JobPostingsMethods';

const JobPostingsList: FC = () => {
  //=== Context ===//
  const { state: authState } = useAuth();
  const { loggedInProps, snackbar } = authState;

  const { state } = useJobPostingsContext();
  const { listState, bodyState } = state;

  //=== Helpers ===//
  const handleSearchChange = (searchValue: string) => {
    listState.updateSearch(searchValue);
  };

  const handleNewJobPostingSelection = (selected: any) => () => {
    listState.updateSelected(selected);
  };

  //=== API Methods ===//
  const getJobPostings = async (): Promise<void> => {
    const response = await fetchJobPostings();
    if (response) {
      listState.updateListItems(response.data);
      listState.updateFilteredListItems(response.data);
    } else {
      snackbar.updateSnackbar(true, 'Error fetching job postings', 'error');
    }
  };

  const handleDelete = async () => {
    const response = await deleteJobPosting(listState.selected);
    if (response) {
      listState.updateSelected(null);
      await getJobPostings();
      snackbar.updateSnackbar(
        true,
        'Successfully deleted job posting',
        'success'
      );
    } else {
      snackbar.updateSnackbar(true, 'Error deleting job posting', 'error');
    }
  };

  const getAllCandidatesAssociatedToJobPosting = async (id) => {
    const response = await fetchCandidatesAssociatedWithJobPosting(id);
    if (response) {
      bodyState.updateCandidateRankingsState('allCandidates', response.data);
    } else {
      snackbar.updateSnackbar(
        true,
        'Error fetching candidates associated to job posting',
        'error'
      );
    }
  };

  //=== Hooks ===//
  useEffect(() => {
    if (loggedInProps.user) {
      getJobPostings();
    }
  }, [loggedInProps.user]);

  useEffect(() => {
    if (!listState.selected) return console.error('No job posting selected');

    const getFullJobPosting = async () => {
      const response = await fetchFullJobPosting(listState.selected.id);
      if (response) {
        listState.setFullJobPostingDetails(response.data);
      } else {
        snackbar.updateSnackbar(
          true,
          'Error fetching full job posting',
          'error'
        );
      }
    };

    getFullJobPosting();
    getAllCandidatesAssociatedToJobPosting(listState.selected.id);
  }, [listState.selected]);

  useEffect(() => {
    getAllCandidatesAssociatedToJobPosting(listState?.selected?.id);
  }, [bodyState.candidateRankingsState.refreshCandidates]);

  return (
    <Container>
      <SavedList
        listType={'jobPostings'}
        items={listState?.filteredListItems}
        search={listState?.search}
        loading={listState?.loading}
        selected={listState?.selected}
        handleNewSelection={handleNewJobPostingSelection}
        handleSearchChange={handleSearchChange}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default JobPostingsList;
