import { useEffect } from 'react';
import { Container } from './SavedPhoneCalls.styles';

// Context
import { useAuth } from '@/context/AuthContext';
import { useTranscriptionContext } from '@/context/TranscriptionContext';

// Components (global)
import SavedList from '@/components/SavedList/SavedList';
import { UnSelectedButton, PrimaryButton } from '@/components/Global/Global';

import { TranscriptionMethods } from '@/Utils/utils';
const { fetchPhoneCalls, performTranscription } = TranscriptionMethods;

export default function SavedPhoneCalls() {
  const { state: authState } = useAuth();
  const { snackbar } = authState;

  const { state, dispatch } = useTranscriptionContext();
  console.log(state);
  const { phoneCallState } = state;

  // fetch saved phone calls
  const getSavedPhoneCalls = async (): Promise<void> => {
    const response = await fetchPhoneCalls();
    if (response.data) {
      console.log('response.data', response.data);

      dispatch({
        type: 'UPDATE_SAVED_PHONE_CALLS',
        payload: response.data,
      });

      dispatch({
        type: 'UPDATE_FILTERED_PHONE_CALLS',
        payload: response.data,
      });
    } else {
      snackbar?.updateSnackbar(true, 'error', 'Error Fetching Phone Calls');
    }
  };

  const handleToggle = (selected: any) => () => {
    dispatch(
      {
        type: 'UPDATE_SELECTED_PHONE_CALL',
        payload: selected,
      },
      ''
    );
  };

  const handleSearchChange = (event) => {
    dispatch({ type: 'UPDATE_SEARCH', payload: event.target.value }, '');
  };

  const handleTranscribe = async () => {
    const response = await performTranscription(phoneCallState?.selected?.id);
    if (response) {
      snackbar?.updateSnackbar(
        true,
        'success',
        'Phone Call Transcription Initiated.'
      );
    } else {
      snackbar?.updateSnackbar(true, 'error', 'Error Transcribing Phone Call');
    }
  };

  useEffect(() => {
    getSavedPhoneCalls();
  }, []);

  return (
    <Container>
      <SavedList
        savedItems={phoneCallState?.filteredItems}
        search={phoneCallState?.search}
        loading={phoneCallState?.loading}
        selected={phoneCallState?.selected}
        listType='phoneCalls'
        handleToggle={handleToggle}
        handleSearchChange={handleSearchChange}
      />
      <PrimaryButton onClick={handleTranscribe}>Transcribe</PrimaryButton>
    </Container>
  );
}
