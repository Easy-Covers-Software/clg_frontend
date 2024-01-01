import { useState, FC, useEffect } from 'react';

import { IntermediateAdjustmentStyledComponents } from '../AdvancedAdjustments.styles';
const { Container, SubmitButton } = IntermediateAdjustmentStyledComponents;

import IntermediateAdjustmentInput from './IntermediateAdjustmentInput';
import { useAuth } from '@/context/AuthContext';
import { useMediaQuery } from '@mui/material';

import { determineGenerationHtml } from '@/Utils/utils';

import { makeAdjustment } from '@/api/GenerationMethods';

import { APIResponse, AdjustmentApiResponse } from '@/Types/ApiResponse.types';
import {
  IntermediateAdjustmentProps,
  CoverLetterData,
} from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  intermediateAdjustmentProps: IntermediateAdjustmentProps;
}

const IntermediateAdjustments: FC<Props> = ({
  coverLetterData,
  intermediateAdjustmentProps,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { state } = useAuth();
  const { loggedInProps, snackbar } = state;

  const getIntermediateAdjustmentTypeValue = (label: string): string | null => {
    switch (label) {
      case 'Add Skill':
        return intermediateAdjustmentProps?.addSkillInput;
      case 'Insert Keyword':
        return intermediateAdjustmentProps?.insertKeywordInput;
      case 'Remove':
        return intermediateAdjustmentProps?.removeRedundancyInput;
      default:
        return null;
    }
  };

  const handleIntermediateAdjustment = async (): Promise<void> => {
    coverLetterData?.toggleLoadingCoverLetter();

    const response: APIResponse<AdjustmentApiResponse> = await makeAdjustment(
      'intermediate',
      intermediateAdjustmentProps.intermediateType,
      getIntermediateAdjustmentTypeValue(
        intermediateAdjustmentProps.intermediateType
      ),
      determineGenerationHtml(coverLetterData)
    );

    if (response.data) {
      coverLetterData?.updateCoverLetterParts(response.data.cover_letter);
      coverLetterData?.toggleLoadingCoverLetter();
      loggedInProps.updateUser();
      snackbar.updateSnackbar(true, 'success', 'Adjustment made successfully.');
    } else {
      coverLetterData?.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(
        true,
        'error',
        'An error occured while making adjustment. Please try again.'
      );
    }
  };

  const isDisabled = (label: string): boolean => {
    if (
      intermediateAdjustmentProps?.intermediateType === null ||
      intermediateAdjustmentProps?.intermediateType === label
    ) {
      return false;
    } else {
      return true;
    }
  };

  const shouldDisable = (
    intermediateAdjustmentProps: IntermediateAdjustmentProps
  ): boolean => {
    if (intermediateAdjustmentProps.intermediateType === null) {
      return true;
    } else {
      return false;
    }
  };

  const disableRegenerateButton = shouldDisable(intermediateAdjustmentProps);

  useEffect(() => {
    if (
      intermediateAdjustmentProps?.addSkillInput === '' &&
      intermediateAdjustmentProps?.insertKeywordInput === '' &&
      intermediateAdjustmentProps?.removeRedundancyInput === ''
    ) {
      intermediateAdjustmentProps?.updateIntermediateType(null);
    }
  }, [
    intermediateAdjustmentProps.addSkillInput,
    intermediateAdjustmentProps.insertKeywordInput,
    intermediateAdjustmentProps.removeRedundancyInput,
  ]);

  return (
    <Container>
      <IntermediateAdjustmentInput
        label={'Add Skill'}
        inputValue={intermediateAdjustmentProps?.addSkillInput}
        intermediateAdjustmentProps={intermediateAdjustmentProps}
        disabled={isDisabled('Add Skill')}
      />
      <IntermediateAdjustmentInput
        label={'Insert Keyword'}
        inputValue={intermediateAdjustmentProps?.insertKeywordInput}
        intermediateAdjustmentProps={intermediateAdjustmentProps}
        disabled={isDisabled('Insert Keyword')}
      />
      <IntermediateAdjustmentInput
        label={'Remove'}
        inputValue={intermediateAdjustmentProps?.removeRedundancyInput}
        intermediateAdjustmentProps={intermediateAdjustmentProps}
        disabled={isDisabled('Remove')}
      />

      <SubmitButton
        onClick={handleIntermediateAdjustment}
        disabled={disableRegenerateButton}
      >
        Regenenerate
      </SubmitButton>
    </Container>
  );
};

export default IntermediateAdjustments;
