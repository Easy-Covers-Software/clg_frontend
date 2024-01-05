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
  const { state: authState } = useAuth();
  const { loggedInProps, snackbar } = authState;

  // TODO: get candidate profile state and dispatch from context
  const { state, dispatch } = useJobPostingsContext();
  const {
    listState,
    bodyState,
    savedJobPostingsListState,
    selectedJobPostingState,
  } = state;

  // TODO: create function to fetch candidate profiles from db
  const getJobPostings = async (): Promise<void> => {
    const response = await fetchJobPostings();
    if (response) {
      dispatch({
        type: 'UPDATE_JOB_POSTINGS_LIST',
        payload: response.data,
      });
      dispatch({
        type: 'UPDATE_FILTERED_JOB_POSTINGS_LIST',
        payload: response.data,
      });
    } else {
      snackbar.updateSnackbar(true, 'Error fetching job postings', 'error');
    }
  };

  // TODO: create function to toggle selection of candidate profile on list
  const handleToggle = (selected: any) => () => {
    dispatch({
      type: 'UPDATE_SELECTED_JOB_POSTING_LIST_STATE',
      payload: selected,
    });
  };

  // TODO: create function to delete candidate profile from db
  const handleDelete = async () => {
    const response = await deleteJobPosting(listState.selected);
    if (response) {
      snackbar.updateSnackbar(
        true,
        'Successfully deleted job posting',
        'success'
      );
      dispatch({
        type: 'UPDATE_SELECTED_JOB_POSTING_LIST_STATE',
        payload: null,
      });
      getJobPostings();
    } else {
      snackbar.updateSnackbar(true, 'Error deleting job posting', 'error');
    }
  };

  // TODO: create function to handle search and filter
  const handleSearchChange = (event) => {
    dispatch({
      type: 'UPDATE_JOB_POSTINGS_LIST_SEARCH',
      payload: event.target.value,
    });
  };

  // TODO: create hook to fetch job posting upon mount
  useEffect(() => {
    getJobPostings();
  }, []);

  useEffect(() => {
    if (loggedInProps.user) {
      getJobPostings();
    }
  }, [loggedInProps.user]);

  const getAllCandidatesAssociatedToJobPosting = async (id) => {
    const response = await fetchCandidatesAssociatedWithJobPosting(id);
    if (response) {
      dispatch({
        type: 'UPDATE_JOB_POSTING_SELECTION_CANDIDATE_RANKINGS_STATE',
        payload: { allCandidates: response.data },
      });
    } else {
      snackbar.updateSnackbar(
        true,
        'Error fetching candidates associated to job posting',
        'error'
      );
    }
  };

  // TODO: create hook to fetch full job posting upon selection
  useEffect(() => {
    const getFullJobPosting = async () => {
      const response = await fetchFullJobPosting(listState.selected.id);
      if (response) {
        dispatch({
          type: 'SET_SELECTED_JOB_POSTING_FULL_DETAILS',
          payload: response.data,
        });
      } else {
        snackbar.updateSnackbar(
          true,
          'Error fetching full job posting',
          'error'
        );
      }
    };

    if (listState.selected) {
      getFullJobPosting();
      getAllCandidatesAssociatedToJobPosting(listState.selected.id);
    }
  }, [listState.selected]);

  // TODO: create hook to delete job posting upon confirmation
  useEffect(() => {
    getAllCandidatesAssociatedToJobPosting(listState?.selected?.id);
  }, [bodyState.candidateRankingsState.refreshCandidates]);

  return (
    <Container>
      <SavedList
        savedItems={listState?.filteredListItems}
        search={listState?.search}
        loading={listState?.loading}
        selected={listState?.selected}
        listType={'jobPostings'}
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
    </Container>
  );
};

export default JobPostingsList;
