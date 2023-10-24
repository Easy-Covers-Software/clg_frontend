'use client';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import { useSavedCoverLettersContext } from '@/context/SavedCoverLettersContext';

import CoverLetterSummary from '@/components/CoverLetterSummay/CoverLetterSummary';
import CoverLetter from '@/components/CoverLetter/CoverLetter';

// Want to eventually change this depending on if a generation has already occured or not
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

export default function CoverLetterEdit() {
  const { state } = useSavedCoverLettersContext();
  const {
    coverLetterData,
    jobDetailsProps,
    simpleAdjustmentProps,
    intermediateAdjustmentProps,
    customAdjustmentProps,
    saveProps,
    downloadProps,
    adjustmentSection,
  } = state;

  return (
    <Container>
      <CoverLetterSummary
        summaryDetails={jobDetailsProps}
        checked={null}
        handleChange={null}
      />
      <CoverLetter
        coverLetterData={coverLetterData}
        simpleAdjustmentProps={simpleAdjustmentProps}
        intermediateAdjustmentProps={intermediateAdjustmentProps}
        customAdjustmentProps={customAdjustmentProps}
        saveProps={saveProps}
        downloadProps={downloadProps}
        adjustmentSection={adjustmentSection}
      />
    </Container>
  );
}
