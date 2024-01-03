import { FC } from 'react';
import { useMediaQuery } from '@mui/material';

// desktop / tablet component
import SimpleAdjustmentButtonGroup from './components/SimpleAdjustmentButtonGroup';

// mobile components
import { IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { determineGenerationHtml } from '@/Utils/utils';

import { makeAdjustment } from '@/api/GenerationMethods';

import { APIResponse, AdjustmentApiResponse } from '@/Types/ApiResponse.types';
import { Snackbar } from '@/Types/AuthContext.types';

import {
  SimpleAdjustmentsStyledComponents,
  SimpleAdjustmentsMobileStyledComponents,
} from './SimpleAdjustments.styles';
const {
  Container,
  MobileContainer,
  SimpleAdjustmentsContainer,
  ToggleAdvancedAdjustmentsButton,
} = SimpleAdjustmentsStyledComponents;

const { RestartIconButton } = SimpleAdjustmentsMobileStyledComponents;

import DownloadMenu from '@/components/GenerationPage/Download/DownloadMenu';

import { useAuth } from '@/context/AuthContext';

import {
  SimpleAdjustmentProps,
  AdjustmentSectionProps,
  CoverLetterData,
} from '@/Types/GenerationContext.types';

interface Props {
  generationData: any;
  simpleAdjustmentProps: SimpleAdjustmentProps;
  adjustmentSection: AdjustmentSectionProps;
  reset: () => void;
}

const SimpleAdjustments: FC<any> = ({
  generationData,
  simpleAdjustmentProps,
  adjustmentSection,
  toggleAdjustmentsSection,
  reset,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { state } = useAuth();
  const { loggedInProps, snackbar } = state;

  const handleDecreaseSimpleAdjustment = async (
    buttonLabel: string
  ): Promise<void> => {
    generationData?.toggleLoadingCoverLetter();

    const response: APIResponse<AdjustmentApiResponse> = await makeAdjustment(
      'simple',
      buttonLabel,
      'decrease',
      determineGenerationHtml(generationData)
    );

    if (response.data) {
      generationData?.updateCoverLetterParts(response.data.cover_letter);
      loggedInProps.updateUser();
      generationData?.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(true, 'success', 'Adjustment made successfully.');
    } else {
      generationData?.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(
        true,
        'error',
        'An error occured while making adjustment. Please try again.'
      );
    }
  };

  const handleIncreaseSimpleAdjustment = async (
    buttonLabel: string
  ): Promise<void> => {
    generationData?.toggleLoadingCoverLetter();

    const response: APIResponse<AdjustmentApiResponse> = await makeAdjustment(
      'simple',
      buttonLabel,
      'increase',
      determineGenerationHtml(generationData)
    );

    if (response.data) {
      generationData?.updateCoverLetterParts(response.data.cover_letter);
      loggedInProps.updateUser();
      generationData?.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(true, 'success', 'Adjustment made successfully.');
    } else {
      generationData?.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(
        true,
        'error',
        'An error occured while making adjustment. Please try again.'
      );
    }
  };

  const shouldDisable = (coverLetterData: CoverLetterData) => {
    if (!coverLetterData?.loading && coverLetterData?.coverLetterHtml !== '') {
      return false;
    } else {
      return true;
    }
  };

  const disable = shouldDisable(generationData);

  return (
    <>
      {isMobile ? (
        <MobileContainer>
          <RestartIconButton>
            <RestartAltIcon />
          </RestartIconButton>

          <ToggleAdvancedAdjustmentsButton onClick={toggleAdjustmentsSection}>
            Adjustments
          </ToggleAdvancedAdjustmentsButton>

          <RestartIconButton>
            {/* DOWNLOAD / SAVE */}
            <RestartAltIcon />
          </RestartIconButton>
        </MobileContainer>
      ) : (
        <Container>
          <SimpleAdjustmentsContainer>
            <SimpleAdjustmentButtonGroup
              buttonLabel="Length"
              disabled={disable}
              handleDecreaseSimpleAdjustment={handleDecreaseSimpleAdjustment}
              handleIncreaseSimpleAdjustment={handleIncreaseSimpleAdjustment}
            />
            <SimpleAdjustmentButtonGroup
              buttonLabel="Formality"
              disabled={disable}
              handleDecreaseSimpleAdjustment={handleDecreaseSimpleAdjustment}
              handleIncreaseSimpleAdjustment={handleIncreaseSimpleAdjustment}
            />
            <SimpleAdjustmentButtonGroup
              buttonLabel="Personability"
              disabled={disable}
              handleDecreaseSimpleAdjustment={handleDecreaseSimpleAdjustment}
              handleIncreaseSimpleAdjustment={handleIncreaseSimpleAdjustment}
            />
          </SimpleAdjustmentsContainer>

          <ToggleAdvancedAdjustmentsButton onClick={toggleAdjustmentsSection}>
            Adjustments
          </ToggleAdvancedAdjustmentsButton>
        </Container>
      )}
    </>
  );
};

export default SimpleAdjustments;
