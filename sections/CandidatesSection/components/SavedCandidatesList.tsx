import { FC, useEffect } from 'react';

//-- import MUI components --//
import { Container } from '@/components/PageStructure/SavedList/SavedList.styles';

//-- import context --//
import { useAuth } from '@/context/AuthContext';
import { useCandidatesContext } from '@/context/CandidatesContext';

//-- import components --//
import SavedList from '@/components/PageStructure/SavedList/SavedList';

import {
  CandidateListItem,
  CandidateJobPostingsWithScore,
} from '@/Types/CandidatesSection.types';
import { APIResponse } from '@/Types/Api.types';

//-- import api methods --//
import {
  fetchCandidateProfiles,
  fetchJobPostingsAssociatedWithCandidate,
  deleteCandidateProfile,
} from '@/api/CandidateProfileMethods';

const SavedCandidatesList: FC = () => {
  //=== Context ===//
  //= Auth Context =//
  const { state: authState } = useAuth();
  const { loggedInProps, snackbar } = authState;

  //= Candidates Context =//
  const { state } = useCandidatesContext();
  const { listState, bodyState } = state;

  //=== Helpers ===//
  //= TOGGLE CANDIDATE PROFILE SELECTION =//
  const handleCandidateSelectionChange =
    (selected: CandidateListItem) => () => {
      listState.updateSelected(selected);
    };

  //=== HANDLE SEARCH CHANGE ===//
  const handleSearchChange = (searchValue: string) => {
    listState.updateSearch(searchValue);
  };

  //=== API Methods ===//
  //= DELETE CANDIDATE PROFILE =//
  const handleDelete = async (id: string): Promise<void> => {
    const response = await deleteCandidateProfile(id);
    if (response) {
      listState.updateSelected(null);
      await getCandidateProfiles();
      snackbar.updateSnackbar(true, 'Candidate profile deleted', 'success');
    } else {
      snackbar.updateSnackbar(
        true,
        'Error deleting candidate profile',
        'error'
      );
    }
  };

  //= GET CANDIDATE PROFILES =//
  const getCandidateProfiles = async (): Promise<void> => {
    try {
      const response: APIResponse<CandidateListItem[]> =
        await fetchCandidateProfiles();

      listState.updateListItems(response.data);
      listState.updateFilteredListItems(response.data);
    } catch (err) {
      console.log(err);
      snackbar.updateSnackbar(
        true,
        'Error fetching candidate profiles',
        'error'
      );
    }
  };

  //= GET ALL JOB POSTINGS ASSOCIATED WITH CANDIDATE =//
  const getAllJobPostingsAssociatedWithCandidate = async (id: string) => {
    if (!id) return console.error('No candidate id provided');
    try {
      const response: APIResponse<CandidateJobPostingsWithScore> =
        await fetchJobPostingsAssociatedWithCandidate(id);

      bodyState.updateCandidateJobPostingsListState(
        'jobPostings',
        response.data
      );
    } catch (err) {
      snackbar.updateSnackbar(
        true,
        'Error fetching job postings associated with candidate',
        'error'
      );
    }
  };

  //=== HOOKS ===//
  //= GET FULL CANDIDATE PROFILE WHEN SELECTION CHANGES =//
  useEffect(() => {
    if (!listState.selected) return;

    listState.setFullCandidateProfile(listState.selected);
    getAllJobPostingsAssociatedWithCandidate(listState.selected.id);
  }, [listState.selected]);

  //= UPDATE FILTERED LIST WHEN SEARCH VALUE CHANGES =//
  useEffect(() => {
    listState.updateFilteredListItems(
      listState.listItems.filter((candidate: CandidateListItem) =>
        candidate.name.toLowerCase().includes(listState.search.toLowerCase())
      )
    );
  }, [listState.search]);

  //= UPDATE LIST WHEN REFRESH STATE CHANGES =//
  useEffect(() => {
    getAllJobPostingsAssociatedWithCandidate(listState.selected?.id);
  }, [listState.refresh]);

  //= UPDATE LIST WHEN USER LOGS IN =//
  useEffect(() => {
    if (loggedInProps.user) {
      getCandidateProfiles();
    }
  }, [loggedInProps.user]);

  return (
    <Container>
      <SavedList
        listType="candidates"
        items={listState?.filteredListItems}
        search={listState?.search}
        loading={listState?.loading}
        selected={listState?.selected}
        handleNewSelection={handleCandidateSelectionChange}
        handleSearchChange={handleSearchChange}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default SavedCandidatesList;
