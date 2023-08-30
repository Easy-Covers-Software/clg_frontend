import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

// import MediumReQueryInput from './MediumReQueryInput';
// import CustomReQuery from './CustomReQuery';
import CustomAdjustment from './components/CustomAdjustment';

import { useAuth } from '@/context/AuthContext';
import { useGenerationContext } from '@/context/GenerationContext';
import { useMediaQuery } from '@mui/material';
// import { MoreOptionsReQuerysStyledComponents } from '../ReQueryOptions.styles';
// const { Container, MediumOptionsContainer, SubmitButton } =
//   MoreOptionsReQuerysStyledComponents;

import IntermediateAdjustments from './components/IntermediateAdjustments';
import IntermediateAdjustmentInput from './components/IntermediateAdjustmentInput';

import { AdvancedAdjustmentsStyledComponents } from './AdvancedAdjustments.styles';

const { Container, MediumOptionsContainer, SubmitButton } =
  AdvancedAdjustmentsStyledComponents;

import {
  IntermediateAdjustmentProps,
  CustomAdjustmentProps,
  AdjustmentSection,
  CoverLetterData,
} from '@/Types/GenerationContext.types';

interface Props {
  coverLetterData: CoverLetterData;
  intermediateAdjustmentProps: IntermediateAdjustmentProps;
  customAdjustmentProps: CustomAdjustmentProps;
}

const AdvancedAdjustments: FC<Props> = ({
  coverLetterData,
  intermediateAdjustmentProps,
  customAdjustmentProps,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Container>
      <IntermediateAdjustments
        coverLetterData={coverLetterData}
        intermediateAdjustmentProps={intermediateAdjustmentProps}
      />

      <CustomAdjustment
        coverLetterData={coverLetterData}
        customAdjustmentProps={customAdjustmentProps}
      />
    </Container>
  );
};

export default AdvancedAdjustments;
