import { FC, useEffect } from 'react';

//-- import MUI components --//
import { Container } from '@/components/PageStructure/SavedList/SavedList.styles';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useCandidatesContext } from '@/context/CandidatesContext';

//-- import components --//
import SavedList from '@/components/PageStructure/SavedList/SavedList';

//-- import api methods --//
import {
  fetchCandidateProfiles,
  fetchFullCandidateProfile,
  fetchJobPostingsAssociatedWithCandidate,
  fetchGenerationsAssociatedWithCandidate,
  deleteCandidateProfile,
} from '@/api/CandidateProfileMethods';

const SavedCandidatesList: FC = () => {
  // 1. get auth state from context and destructure snackbar
  const { state: authState } = useAuth();
  const { loggedInProps, snackbar } = authState;

  // 2. TODO: get candidate profile state and dispatch from context
  const { state, dispatch } = useCandidatesContext();
  const {
    savedCandidatesListState,
    jobPostingsState,
    selectedCandidateProfile,

    listState,
    selectedItemBodyDisplayState,
    selectedListItemFullDetails,
  } = state;

  // 3. TODO: create function to fetch candidate profiles from db
  const getCandidateProfiles = async (): Promise<void> => {
    const response = await fetchCandidateProfiles();
    if (response) {
      dispatch({
        type: 'UPDATE_SAVED_CANDIDATES_LIST',
        payload: response.data,
      });
      dispatch({
        type: 'UPDATE_FILTERED_SAVED_CANDIDATES_LIST',
        payload: response.data,
      });
    } else {
      snackbar.updateSnackbar(
        true,
        'Error fetching candidate profiles',
        'error'
      );
    }
  };

  // 4. TODO: create function to toggle selection of candidate profile on list
  const handleToggle = (selected: any) => () => {
    dispatch({
      type: 'UPDATE_SELECTED',
      payload: selected,
    });
  };

  // 5. TODO: create function to delete candidate profile from db
  const handleDelete = async (id: any): Promise<void> => {
    const response = await deleteCandidateProfile(id);
    if (response) {
      dispatch({
        type: 'UPDATE_SELECTED',
        payload: null,
      });
      getCandidateProfiles();
      snackbar.updateSnackbar(true, 'Candidate profile deleted', 'success');
    } else {
      snackbar.updateSnackbar(
        true,
        'Error deleting candidate profile',
        'error'
      );
    }
  };

  // 6. TODO: create function to handle search bar value
  const handleSearchChange = (event) => {
    dispatch({ type: 'UPDATE_SEARCH_VALUE', payload: event.target.value });
  };

  // 7. TODO: create hook to call fetch function once the component mounts
  useEffect(() => {
    getCandidateProfiles();
  }, []);

  useEffect(() => {
    if (loggedInProps.user) {
      getCandidateProfiles();
    }
  }, [loggedInProps.user]);

  const getAllJobPostingsAssociatedWithCandidate = async (id: any) => {
    const response = await fetchJobPostingsAssociatedWithCandidate(id);
    if (response) {
      dispatch({
        type: 'UPDATE_CANDIDATE_JOB_POSTINGS_LIST_STATE',
        payload: { jobPostings: response.data },
      });
    } else {
      snackbar.updateSnackbar(
        true,
        'Error fetching job postings associated with candidate',
        'error'
      );
    }
  };

  // 8. TODO: create hook to fetch the full candidate profile when the selected candidate changes
  useEffect(() => {
    const getFullCandidateProfile = async () => {
      const response = await fetchFullCandidateProfile(listState.selected?.id);
      if (response) {
        dispatch({
          type: 'SET_SELECTED_CANDIDATE_PROFILE',
          payload: response.data,
        });
      } else {
        snackbar.updateSnackbar(
          true,
          'Error fetching full candidate profile',
          'error'
        );
      }
    };

    const getAllGenerationsAssociatedWithCandidate = async (id: any) => {
      const response = await fetchGenerationsAssociatedWithCandidate(id);
      if (response) {
        dispatch({
          type: 'UPDATE_GENERATIONS',
          payload: response.data,
        });
      } else {
        snackbar.updateSnackbar(
          true,
          'Error fetching generations associated with candidate',
          'error'
        );
      }
    };

    if (listState.selected) {
      getFullCandidateProfile();
      getAllJobPostingsAssociatedWithCandidate(listState.selected?.id);
      getAllGenerationsAssociatedWithCandidate(listState.selected?.id);
    }
  }, [listState.selected]);

  // 9. TODO: create hook to handle search bar value
  useEffect(() => {
    dispatch({
      type: 'UPDATE_FILTERED_SAVED_CANDIDATES_LIST',
      payload: listState?.listItems.filter((candidate) =>
        candidate.name.toLowerCase().includes(listState.search.toLowerCase())
      ),
    });
  }, [listState.search]);

  useEffect(() => {
    getAllJobPostingsAssociatedWithCandidate(listState.selected?.id);
  }, [listState.refresh]);

  return (
    <Container>
      <SavedList
        savedItems={listState?.filteredListItems}
        search={listState?.search}
        loading={listState?.loading}
        selected={listState?.selected}
        listType="candidates"
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
    </Container>
  );
};

export default SavedCandidatesList;
