import React, { useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import styled from '@emotion/styled';

import { Typography } from '@mui/material';
import CandidateJobsList from './components/CandidateJobsList';
import PersonalDetailsPanel from './components/PersonalDetailsPanel/PersonalDetailsPanel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the upload icon

import { Container } from './FullCandidateProfileOverview.styles';

import ExtraDetailsPanel from './components/ExtraDetailsPanel';
import { CandidateListItem } from '@/Types/CandidatesSection.types';
import { JobPostingListObject } from '@/Types/JobPostingsSection.types';
import ProfessionalDetailsPanel from './components/ProfessionalDetailsPanel/ProfessionalDetailsPanel';

const ColumnContainer = styled(Grid)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  gap: 1%;
`;

interface Props {
  selectedCandidate: CandidateListItem;
  jobPostings: JobPostingListObject[];
  jobLoadingId: string | null;
  resumeUrl: string;
  updateSelectedJobPosting: (jobPosting: JobPostingListObject) => void;
  updateMode: (mode: string) => void;
  handleCalculate: (jobPostingId: string) => void;
  handleFileChange: (file: File) => void;
}

const FullCandidateProfileOverview: React.FC<Props> = ({
  selectedCandidate,
  jobPostings,
  jobLoadingId,
  updateSelectedJobPosting,
  updateMode,
  handleCalculate,
  resumeUrl,
  handleFileChange,
}) => {
  const fileInputRef = useRef(null);

  const handleResumeClick = () => {
    if (resumeUrl === '') {
      fileInputRef.current.click();
    } else {
      updateMode('resume');
    }
  };

  return (
    <Container container>
      {/*** LEFT SIDE ***/}
      <ColumnContainer xs={12} md={8}>
        {/* TOP LEFT */}
        <ProfessionalDetailsPanel selectedCandidate={selectedCandidate} />

        {/* BOTTOM LEFT */}
        <PersonalDetailsPanel selectedCandidate={selectedCandidate} />
      </ColumnContainer>

      {/*** RIGHT SIDE ***/}
      <ColumnContainer xs={12} md={4}>
        {/* 3. Resume Panel - Top Right */}
        <ExtraDetailsPanel updateMode={updateMode} />

        {/* 4. Personal Details Panel - Bottom Right (fills remaining space) */}
        <CandidateJobsList
          jobPostings={jobPostings && jobPostings}
          loadingId={jobLoadingId}
          updateSelectedJobPosting={updateSelectedJobPosting}
          handleCalculate={handleCalculate}
        />
      </ColumnContainer>
    </Container>
  );
};

export default FullCandidateProfileOverview;
