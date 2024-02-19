import { FC, useCallback, useEffect, useState } from 'react';

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
  const handleNewSelection = (selected: CandidateListItem) => () => {
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
    if (response.data) {
      listState.updateSelected(null);
      await getCandidateProfiles();
      snackbar.updateSnackbar(true, 'Candidate profile deleted', 'success');
    } else {
      snackbar.updateSnackbar(
        true,
        'Error deleting candidate profile',
        `Error! ${response.error.response.data}`
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
    }
  };

  //= GET ALL JOB POSTINGS ASSOCIATED WITH CANDIDATE =//
  const getAllJobPostingsAssociatedWithCandidate = async (id: string) => {
    if (!id) return console.error('No candidate id provided');
    const response: APIResponse<CandidateJobPostingsWithScore> =
      await fetchJobPostingsAssociatedWithCandidate(id);

    console.log('response.data', response.data);

    if (response.data) {
      bodyState.updateCurrentJobsState('jobs', response.data);
    } else {
      console.log(response.error);
    }
  };

  //=== HOOKS ===//
  //= GET FULL CANDIDATE PROFILE WHEN SELECTION CHANGES =//
  useEffect(() => {
    if (
      !listState.selected ||
      bodyState.mode === 'resume' ||
      bodyState.mode === 'calls' ||
      bodyState.mode === 'jobStatus'
    )
      return;

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

  // want to add a function that if the jobStatusState.selectedJob is not null then a switch statement is called to determine which list to be passed to the SavedList component
  const determineCurrentList = () => {
    if (bodyState.mode === 'jobStatus') {
      switch (bodyState.jobStatusState.mode) {
        case 'overview':
          // if (
          //   listState?.selected !== null &&
          //   !('name' in listState?.selected) &&
          //   bodyState.candidateState.selectedCandidate !== null
          // ) {
          //   listState.updateSelected(
          //     bodyState.candidateState.selectedCandidate
          //   );
          // }
          return;

        case 'resume':
          return [];
        case 'calls':
          return bodyState.jobStatusState?.selectedJob.phone_calls;
        case 'feedback':
          return bodyState.jobStatusState?.selectedJob.feedback;
        case 'generations':
          return bodyState.jobStatusState?.selectedJob.generations;
        default:
          return listState?.filteredListItems;
      }
    } else {
      switch (bodyState.mode) {
        case 'overview':
          if (
            listState?.selected !== null &&
            !('name' in listState?.selected) &&
            bodyState.candidateState.selectedCandidate !== null
          ) {
            listState.updateSelected(
              bodyState.candidateState.selectedCandidate
            );
          }
          return listState?.filteredListItems;
        case 'resume':
          return bodyState.candidateState.resumeState.resumes;
        case 'calls':
          return bodyState.candidateState.callsState.calls;
        case 'feedback':
          return bodyState.candidateState.feedbackState.feedback;
        case 'generations':
          return bodyState.candidateState.generationsState.generations;
        default:
          return listState?.filteredListItems;
      }
    }
  };

  // useEffect(() => {
  //   determineCurrentList();
  // }, [bodyState]);

  // useEffect(() => {
  //   if
  // }, [listState?.selected]);

  return (
    <Container>
      <SavedList
        listType="candidates"
        items={determineCurrentList()}
        search={listState?.search}
        loading={listState?.loading}
        selected={listState?.selected}
        handleNewSelection={handleNewSelection}
        handleSearchChange={handleSearchChange}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default SavedCandidatesList;
