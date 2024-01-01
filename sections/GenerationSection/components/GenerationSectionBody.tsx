'use client';

import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import SelectionSummary from '@/components/SelectionSummary/SelectionSummary';
import CoverLetterSummary from '@/components/CoverLetterSummay/CoverLetterSummary';
import GenerationEditorFull from '@/components/GenerationEditor/GenerationEditorFull';

import { useGenerationContext } from '@/context/GenerationContext';

const Container = styled(Grid)`
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 98px);
  max-height: calc(100vh - 98px);
  min-height: calc(100vh - 98px);
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin-left: 0.3%;
  padding-bottom: 2%;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
  }
`;

const SubContainer = styled(Grid)`
  height: 100%;
  // width: 100%;
  margin: 0.75%;
  margin-top: 0;
  background-color: #f8f8ff;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #006d4b;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export default function GenerationSectionBody() {
  const { state, dispatch } = useGenerationContext();
  const {
    //== NEW ==//
    generationMode,

    //== OLD ==//
    coverLetterData,
    jobDetailsProps,
    simpleAdjustmentProps,
    intermediateAdjustmentProps,
    customAdjustmentProps,
    saveProps,
    downloadProps,
    adjustmentSection,
  } = state;

  const [checked, setChecked] = useState(false);

  const toggleMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'TOGGLE_GENERATION_MODE',
    });
  };

  return (
    <Container>
      <SelectionSummary
        summaryDetails={jobDetailsProps}
        checked={generationMode}
        handleChange={toggleMode}
      />
      {/* <SubContainer> */}
        <GenerationEditorFull
          coverLetterData={coverLetterData}
          simpleAdjustmentProps={simpleAdjustmentProps}
          intermediateAdjustmentProps={intermediateAdjustmentProps}
          customAdjustmentProps={customAdjustmentProps}
          saveProps={saveProps}
          downloadProps={downloadProps}
          adjustmentSection={adjustmentSection}
        />
      {/* </SubContainer> */}
    </Container>
  );
}
