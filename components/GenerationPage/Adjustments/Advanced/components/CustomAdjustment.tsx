import { useState, FC } from 'react';

import Typography from '@mui/material/Typography';
import { useAuth } from '@/context/AuthContext';

import { determineGenerationHtml } from '@/Utils/utils';

// import { CustomReQueryStyledComponents } from '../ReQueryOptions.styles';
// const { CustomReQueryField, SubmitButton } = CustomReQueryStyledComponents;
import { CustomAdjustmentStyledComponents } from '../AdvancedAdjustments.styles';
const { Container, SubContainer, CustomReQueryField, SubmitButton } =
  CustomAdjustmentStyledComponents;

import { makeAdjustment } from '@/api/GenerationMethods';

interface Props {
  coverLetterData: any;
  customAdjustmentProps: any;
}

const CustomAdjustment: FC<any> = ({
  coverLetterData,
  customAdjustmentProps,
  updateCustomAdjustmentState,
}) => {
  const { state } = useAuth();
  const { loggedInProps, snackbar } = state;

  const [placeholder, setPlaceholder] = useState(
    'Anything you want to change about the cover letter...'
  );

  const handleChange = (e) => {
    updateCustomAdjustmentState('customAdjustment', e.target.value); // 'customAdjustment' is the key, 'e.target.value' is the value
    // customAdjustmentProps?.updateCustomAdjustment(e.target.value);
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

  const shouldDisable = (coverLetterData: any) => {
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
        <Typography className="custom-adjustment-heading">
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
