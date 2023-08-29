import { FC } from 'react';
import { useMediaQuery } from '@mui/material';

// desktop / tablet component
import SimpleAdjustmentButtonGroup from './components/SimpleAdjustmentButtonGroup';

// mobile components
import { IconButton } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { Helpers, CoverLetterApiMethods } from '@/Utils/utils';
const { makeAdjustment } = CoverLetterApiMethods;
const { determineCoverLetterHtml } = Helpers;

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

import DownloadMenu from '@/components/Download/DownloadMenu';

import { useAuth } from '@/context/AuthContext';

import {
  SimpleAdjustmentProps,
  AdjustmentSection,
  CoverLetterData,
} from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  simpleAdjustmentProps: SimpleAdjustmentProps;
  adjustmentSection: AdjustmentSection;
  reset: () => void;
}

const SimpleAdjustments: FC<Props> = ({
  coverLetterData,
  simpleAdjustmentProps,
  adjustmentSection,
  reset,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { state } = useAuth();
  const { snackbar } = state;

  const handleDecreaseSimpleAdjustment = async (
    buttonLabel: string
  ): Promise<void> => {
    const adjustmentLevel = 'simple';

    const response: APIResponse<AdjustmentApiResponse> = await makeAdjustment(
      'simple',
      buttonLabel,
      'decrease',
      determineCoverLetterHtml(coverLetterData)
    );

    if (response.data) {
      snackbar.updateSnackbar(true, 'success', 'Adjustment made successfully.');
    } else {
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
    coverLetterData?.toggleLoadingCoverLetter();

    const response: APIResponse<AdjustmentApiResponse> = await makeAdjustment(
      'simple',
      buttonLabel,
      'increase',
      determineCoverLetterHtml(coverLetterData)
    );

    if (response.data) {
      coverLetterData?.updateCoverLetterParts(response.data.cover_letter);
      snackbar.updateSnackbar(true, 'success', 'Adjustment made successfully.');
      coverLetterData?.toggleLoadingCoverLetter();
    } else {
      coverLetterData?.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(
        true,
        'error',
        'An error occured while making adjustment. Please try again.'
      );
    }
  };

  const shouldDisable = (coverLetterData: CoverLetterData) => {
    if (
      !coverLetterData.loadingCoverLetter &&
      coverLetterData?.coverLetterHtml !== ''
    ) {
      return false;
    } else {
      return true;
    }
  };

  const disable = shouldDisable(coverLetterData);

  return (
    <>
      {isMobile ? (
        <MobileContainer>
          <RestartIconButton>
            <RestartAltIcon />
          </RestartIconButton>

          <ToggleAdvancedAdjustmentsButton
            onClick={adjustmentSection.toggleIsAdjustmentsSectionExpanded}
          >
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
              buttonLabel='Length'
              disabled={disable}
              handleDecreaseSimpleAdjustment={handleDecreaseSimpleAdjustment}
              handleIncreaseSimpleAdjustment={handleIncreaseSimpleAdjustment}
            />
            <SimpleAdjustmentButtonGroup
              buttonLabel='Formality'
              disabled={disable}
              handleDecreaseSimpleAdjustment={handleDecreaseSimpleAdjustment}
              handleIncreaseSimpleAdjustment={handleIncreaseSimpleAdjustment}
            />
            <SimpleAdjustmentButtonGroup
              buttonLabel='Personability'
              disabled={disable}
              handleDecreaseSimpleAdjustment={handleDecreaseSimpleAdjustment}
              handleIncreaseSimpleAdjustment={handleIncreaseSimpleAdjustment}
            />
          </SimpleAdjustmentsContainer>

          <ToggleAdvancedAdjustmentsButton
            onClick={adjustmentSection.toggleIsAdjustmentsSectionExpanded}
          >
            Adjustments
          </ToggleAdvancedAdjustmentsButton>
        </Container>
      )}
    </>
  );
};

export default SimpleAdjustments;
