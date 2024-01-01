import { FC, useEffect } from 'react';

//-- import MUI components --//
import { Container } from '@/components/SavedList/SavedList.styles';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useCandidatesContext } from '@/context/CandidatesContext';

//-- import components --//
import SavedList from '@/components/SavedList/SavedList';

//-- import api methods --//
import { CandidateProfileMethods } from '@/Utils/utils';
const {
  fetchCandidateProfiles,
  fetchFullCandidateProfile,
  fetchJobPostingsAssociatedWithCandidate,
  fetchGenerationsAssociatedWithCandidate,
  deleteCandidateProfile,
} = CandidateProfileMethods;

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
    if(loggedInProps.user){
      getCandidateProfiles();
    }
  }, [loggedInProps.user]);

  const getAllJobPostingsAssociatedWithCandidate = async (id: any) => {
    const response = await fetchJobPostingsAssociatedWithCandidate(id);
    if (response) {
      dispatch({
        type: 'UPDATE_JOB_POSTINGS',
        payload: response.data,
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
      const response = await fetchFullCandidateProfile(
        savedCandidatesListState.selected?.id
      );
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

    if (savedCandidatesListState.selected) {
      getFullCandidateProfile();
      getAllJobPostingsAssociatedWithCandidate(
        savedCandidatesListState.selected?.id
      );
      getAllGenerationsAssociatedWithCandidate(
        savedCandidatesListState.selected?.id
      );
    }
  }, [savedCandidatesListState.selected]);

  // 9. TODO: create hook to handle search bar value
  useEffect(() => {
    dispatch({
      type: 'UPDATE_FILTERED_SAVED_CANDIDATES_LIST',
      payload: savedCandidatesListState.savedCandidatesList?.filter(
        (candidate) =>
          candidate.name
            .toLowerCase()
            .includes(savedCandidatesListState.search.toLowerCase())
      ),
    });
  }, [savedCandidatesListState.search]);

  useEffect(() => {
    getAllJobPostingsAssociatedWithCandidate(
      savedCandidatesListState.selected?.id
    );
  }, [jobPostingsState.refreshJobPostings]);

  return (
    <Container>
      <SavedList
        savedItems={savedCandidatesListState?.filteredItems}
        search={savedCandidatesListState?.search}
        loading={savedCandidatesListState?.loading}
        selected={savedCandidatesListState?.selected}
        listType='candidates'
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
    </Container>
  );
};

export default SavedCandidatesList;
