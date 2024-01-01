import { FC, useEffect } from 'react';

//-- import MUI components --//
import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Container } from '@/components/SavedList/SavedList.styles';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useJobPostingsContext } from '@/context/JobPostingsContext';

//-- import components --//
import SavedList from '@/components/SavedList/SavedList';

//-- import api methods --//
import { JobPostingMethods } from '@/Utils/utils';
const {
  fetchJobPostings,
  fetchFullJobPosting,
  fetchCandidatesAssociatedWithJobPosting,
  deleteJobPosting,
} = JobPostingMethods;

const JobPostingsList: FC = () => {
  const { state: authState } = useAuth();
  const { loggedInProps, snackbar } = authState;

  // TODO: get candidate profile state and dispatch from context
  const { state, dispatch } = useJobPostingsContext();
  const { savedJobPostingsListState, selectedJobPostingState } = state;

  // TODO: create function to fetch candidate profiles from db
  const getJobPostings = async (): Promise<void> => {
    const response = await fetchJobPostings();
    if (response) {
      dispatch({
        type: 'UPDATE_SAVED_JOB_POSTINGS_LIST',
        payload: response.data,
      });
      dispatch({
        type: 'UPDATE_FILTERED_SAVED_JOB_POSTINGS_LIST',
        payload: response.data,
      });
    } else {
      snackbar.updateSnackbar(true, 'Error fetching job postings', 'error');
    }
  };

  // TODO: create function to toggle selection of candidate profile on list
  const handleToggle = (selected: any) => () => {
    dispatch({
      type: 'UPDATE_SELECTED',
      payload: selected,
    });
  };

  // TODO: create function to delete candidate profile from db
  const handleDelete = async () => {
    const response = await deleteJobPosting(savedJobPostingsListState.selected);
    if (response) {
      snackbar.updateSnackbar(
        true,
        'Successfully deleted job posting',
        'success'
      );
      dispatch({
        type: 'UPDATE_SELECTED',
        payload: null,
      });
      getJobPostings();
    } else {
      snackbar.updateSnackbar(true, 'Error deleting job posting', 'error');
    }
  };

  // TODO: create function to handle search and filter
  const handleSearchChange = (event) => {
    dispatch({ type: 'UPDATE_SEARCH_VALUE', payload: event.target.value });
  };

  // TODO: create hook to fetch job posting upon mount
  useEffect(() => {
    getJobPostings();
  }, []);

  useEffect(() => {
    if(loggedInProps.user){
      getJobPostings();
    }
  }, [loggedInProps.user]);

  const getAllCandidatesAssociatedToJobPosting = async (id) => {
    console.log('GETTING CALLED');

    const response = await fetchCandidatesAssociatedWithJobPosting(id);
    if (response) {
      dispatch({
        type: 'UPDATE_ALL_CANDIDATES',
        payload: response.data,
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
      const response = await fetchFullJobPosting(
        savedJobPostingsListState.selected.id
      );
      if (response) {
        dispatch({
          type: 'SET_SELECTED_JOB_POSTING',
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

    if (savedJobPostingsListState.selected) {
      getFullJobPosting();
      getAllCandidatesAssociatedToJobPosting(
        savedJobPostingsListState.selected.id
      );
    }
  }, [savedJobPostingsListState.selected]);

  // TODO: create hook to delete job posting upon confirmation
  useEffect(() => {
    getAllCandidatesAssociatedToJobPosting(
      savedJobPostingsListState?.selected?.id
    );
  }, [selectedJobPostingState.refreshCandidates]);

  return (
    <Container>
      <SavedList
        savedItems={savedJobPostingsListState?.filteredItems}
        search={savedJobPostingsListState?.search}
        loading={savedJobPostingsListState?.loading}
        selected={savedJobPostingsListState?.selected}
        listType={'jobPostings'}
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
    </Container>
  );
};

export default JobPostingsList;
