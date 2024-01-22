'use client';

import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import SelectionSummary from '@/components/PageStructure/SelectionSummary/SelectionSummary';
import GenerationEditorFull from '@/components/GenerationPage/GenerationEditor/GenerationEditorFull';

import { useGenerationContext } from '@/context/GenerationContext';

const Container = styled(Grid)`
  width: 100%;
  padding: 0.2%;

  display: flex;
  flex-direction: column;
  gap: 0.2%;

  border-radius: 4px;
  border: 1px solid #006d4b;
  background-color: white;
`;

const SubContainer = styled(Grid)`
  height: 100%;
  background-color: #f8f8ff;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

export default function GenerationSectionBody() {
  const { state, dispatch } = useGenerationContext();
  const { generationSetupState, bodyState } = state;

  const [checked, setChecked] = useState(false);

  //=== Helpers ===//
  const toggleGenerationMode = () => {
    if (generationSetupState.mode === 'email') {
      generationSetupState.updateGenerationMode('cover_letter');
    } else {
      generationSetupState.updateGenerationMode('email');
    }
  };

  const toggleAdjustmentsSection = () => {
    bodyState.toggleIsAdjustmentsSectionExpanded();
  };

  const getIsAdjustmentsSectionExpanded = () => {
    return bodyState.generationAdjustmentsState?.isAdjustmentsSectionExpanded;
  };

  const getSimpleAdjustmentState = () => {
    return bodyState.generationAdjustmentsState?.simpleAdjustmentState;
  };

  const getIntermediateAdjustmentState = () => {
    return bodyState.generationAdjustmentsState?.intermediateAdjustmentState;
  };

  const getCustomAdjustmentState = () => {
    return bodyState.generationAdjustmentsState?.customAdjustmentState;
  };

  return (
    <Container>
      <SelectionSummary
        summaryDetails={bodyState.selectionSummaryState}
        checked={generationSetupState.mode}
        handleChange={toggleGenerationMode}
      />

      {/* <SubContainer> */}
      <GenerationEditorFull
        generationData={bodyState.generationResultsState}
        updateGenerationResultsState={bodyState.updateGenerationResultsState}
        simpleAdjustmentProps={getSimpleAdjustmentState()}
        intermediateAdjustmentProps={getIntermediateAdjustmentState()}
        customAdjustmentProps={getCustomAdjustmentState()}
        adjustmentSection={getIsAdjustmentsSectionExpanded()}
        toggleAdjustmentsSection={toggleAdjustmentsSection}
        dispatch={dispatch}
        updateSimpleAdjustmentState={bodyState.updateSimpleAdjustmentState}
        updateIntermediateAdjustmentsState={
          bodyState.updateIntermediateAdjustmentState
        }
        updateCustomAdjustmentsState={bodyState.updateCustomAdjustmentState}
      />
      {/* </SubContainer> */}
    </Container>
  );
}
