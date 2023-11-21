import { useState, FC } from 'react';

import Typography from '@mui/material/Typography';
import { useAuth } from '@/context/AuthContext';

import { Helpers, GenerationMethods } from '@/Utils/utils';
const { makeAdjustment } = GenerationMethods;
const { determineCoverLetterHtml } = Helpers;

// import { CustomReQueryStyledComponents } from '../ReQueryOptions.styles';
// const { CustomReQueryField, SubmitButton } = CustomReQueryStyledComponents;
import { CustomAdjustmentStyledComponents } from '../AdvancedAdjustments.styles';
const { Container, SubContainer, CustomReQueryField, SubmitButton } =
  CustomAdjustmentStyledComponents;
import { useMediaQuery } from '@mui/material';

import {
  CoverLetterData,
  CustomAdjustmentProps,
} from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  customAdjustmentProps: CustomAdjustmentProps;
}

const CustomAdjustment: FC<Props> = ({
  coverLetterData,
  customAdjustmentProps,
}) => {
  const { state } = useAuth();
  const { loggedInProps, snackbar } = state;

  const [placeholder, setPlaceholder] = useState(
    'Anything you want to change about the cover letter...'
  );

  const handleChange = (e) => {
    customAdjustmentProps?.updateCustomAdjustment(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (customAdjustmentProps?.customAdjustment === '') {
      setPlaceholder('Anything you want to change about the cover letter...');
    }
  };

  const handleCustomAdjustment = async (): Promise<void> => {
    coverLetterData?.toggleLoadingCoverLetter();

    const response = await makeAdjustment(
      'custom',
      '',
      customAdjustmentProps?.customAdjustment,
      determineCoverLetterHtml(coverLetterData)
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

  const shouldDisable = (coverLetterData: CoverLetterData) => {
    if (
      coverLetterData?.loadingCoverLetter ||
      coverLetterData?.coverLetterHtml === '' ||
      customAdjustmentProps?.customAdjustment === ''
    ) {
      return true;
    } else {
      return false;
    }
  };

  const disable = shouldDisable(coverLetterData);

  return (
    <Container>
      <SubContainer>
        <Typography className='custom-adjustment-heading'>
          Custom Adjustment
        </Typography>
        <CustomReQueryField
          placeholder={placeholder}
          value={customAdjustmentProps?.customAdjustment}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </SubContainer>

      <SubmitButton onClick={handleCustomAdjustment} disabled={disable}>
        REGENERATE
      </SubmitButton>
    </Container>
  );
};

export default CustomAdjustment;
