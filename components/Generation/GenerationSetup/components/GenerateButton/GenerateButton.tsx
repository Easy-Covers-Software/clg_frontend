import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { useGenerationContext } from '@/context/GenerationContext';
import {
  GenerateButton,
  GenerateButtonDouble,
} from '../../GenerationSetup.styles';

import { Helpers } from '@/Utils/utils';
const { checkAdditionalDetails } = Helpers;

import { CoverLetterApiMethods } from '@/Utils/utils';
const { getJobDetails, generateCoverLetter, uploadResume } =
  CoverLetterApiMethods;

import TwoModelsAvailableButton from './components/TwoModelAvailableButton';
import OneModelAvailableButton from './components/OneModelAvailableButton';

import {
  APIResponse,
  GetJobDetailsApiResponse,
  CoverLetterGenerateApiResponse,
  ResumeUploadApiResponse,
} from '@/Types/ApiResponse.types';
import { AdditionalDetails } from '@/Types/GenerationContext.types';

const Container = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2%;
`;

export default function GenerateButtons() {
  const { state } = useGenerationContext();
  const {
    additionalDetails,
    generationSetupProps,
    jobDetailsProps,
    coverLetterData,
  } = state;

  const { state: authState, dispatch } = useAuth();
  const { loggedInProps, dialogProps, snackbar, trackers } = authState;

  const determineAdditionalDetails = (): AdditionalDetails | null => {
    if (checkAdditionalDetails(additionalDetails)) {
      return additionalDetails;
    } else {
      return null;
    }
  };

  const handleResumeUpload = async (): Promise<boolean> => {
    const response: APIResponse<ResumeUploadApiResponse> = await uploadResume(
      generationSetupProps.isUsingPreviousResume,
      generationSetupProps?.freeText,
      additionalDetails?.simpleInput1,
      additionalDetails?.simpleInput2,
      additionalDetails?.simpleInput3,
      additionalDetails?.openEndedInput
    );

    if (response.data) {
      generationSetupProps?.updateResume(
        response.data.uploaded_resume_filename
      );
      // snackbar.updateSnackbar(true, 'success', 'Resume uploaded successfully.');
      return true;
    } else {
      console.error(response.error);
      snackbar.updateSnackbar(
        true,
        'error',
        'Error uploading resume. Please try again. If the problem persists, please contact us.'
      );
      return false;
    }
  };

  const handleGetJobDetails = async (): Promise<boolean> => {
    jobDetailsProps.toggleLoadingSummary();

    const response: APIResponse<GetJobDetailsApiResponse> = await getJobDetails(
      generationSetupProps?.jobPosting
    );

    if (response.data) {
      jobDetailsProps.updateJobTitle(response.data.job_title);
      jobDetailsProps.updateCompanyName(response.data.company_name);
      jobDetailsProps.updateMatchScore(response.data.match_score);
      jobDetailsProps.toggleLoadingSummary();

      return true;
    } else {
      console.error(response.error);
      jobDetailsProps?.toggleLoadingSummary();
      snackbar.updateSnackbar(
        true,
        'error',
        'Error getting job details. Please try again. If the problem persists, please contact us.'
      );
      return false;
    }
  };

  const handleGenerateCoverLetter = async (
    model: string
  ): Promise<void | boolean> => {
    if (generationSetupProps?.resume === null) {
      const success = await handleResumeUpload();
      if (!success) {
        snackbar.updateSnackbar(
          true,
          'error',
          'Error uploading resume. Please try again. If the problem persists, please contact us.'
        );
        return false;
      }
    }

    loggedInProps?.updateUser();

    if (model === '-1') {
      dialogProps.toggleLoginIsOpen();
      snackbar.updateSnackbar(
        true,
        'error',
        'You must be logged in to generate a cover letter.'
      );
      return;
    }

    if (model === '0') {
      dialogProps.toggleSettingsIsOpen();
      snackbar.updateSnackbar(
        true,
        'error',
        'You have no generations available. Upgrade to generate.'
      );
      return;
    }

    const success = await handleGetJobDetails();

    if (!success) {
      snackbar.updateSnackbar(
        true,
        'error',
        'Error getting job details. Please try again. If the problem persists, please contact us.'
      );
      return false;
    }

    coverLetterData.toggleLoadingCoverLetter();

    const addDetails = determineAdditionalDetails();

    const response: APIResponse<CoverLetterGenerateApiResponse> =
      await generateCoverLetter(model, addDetails);

    if (response.data) {
      coverLetterData.updateCoverLetterParts(response.data.cover_letter);
      coverLetterData.updateCoverLetterId(response.data.cover_letter_id);
      coverLetterData.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(
        true,
        'success',
        'Success! Cover letter generated.'
      );
    } else {
      console.error(response.error);
      coverLetterData.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(
        true,
        'error',
        'Error generating cover letter. Please try again. If the problem persists, please contact us.'
      );
    }
  };

  useEffect(() => {
    if (
      loggedInProps?.gpt3_generations_available > 0 ||
      loggedInProps?.gpt4_generations_available > 0
    ) {
      if (dialogProps?.isSettingsOpen) {
        snackbar.reset();
        dialogProps.toggleSettingsIsOpen();
        snackbar.updateSnackbar(
          true,
          'success',
          'Detected new credits to your account. You will now be able to generate your cover letter.'
        );
      }
    }
  }, [
    loggedInProps.gpt3_generations_available,
    loggedInProps.gpt4_generations_available,
  ]);

  const shouldDisableButton = (state) => {
    if (state.coverLetterData.loadingCoverLetter) return true;
    if (state.generationSetupProps.jobPosting === '') return true;

    const hasJobPosting = state.generationSetupProps.jobPosting !== '';
    const hasResume =
      state.generationSetupProps.resume !== null ||
      state.generationSetupProps.isUsingPreviousResume;
    const hasFreeText = state.generationSetupProps.freeText !== '';

    if (hasJobPosting && (hasResume || hasFreeText)) {
      return false;
    }

    if (hasJobPosting && checkAdditionalDetails(state.additionalDetails)) {
      return false;
    }

    return true;
  };

  const disableGenerate = shouldDisableButton(state);

  return (
    <Container>
      {loggedInProps?.gpt3_generations_available > 0 ||
      loggedInProps?.gpt4_generations_available > 0 ? (
        <TwoModelsAvailableButton
          generationSetupProps={generationSetupProps}
          loggedInProps={loggedInProps}
          trackers={trackers}
          handleGenerateCoverLetter={handleGenerateCoverLetter}
          disabled={disableGenerate}
        />
      ) : (
        <OneModelAvailableButton
          generationSetupProps={generationSetupProps}
          loggedInProps={loggedInProps}
          trackers={trackers}
          handleGenerateCoverLetter={handleGenerateCoverLetter}
          disabled={disableGenerate}
        />
      )}
    </Container>
  );
}
