import React, { useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import CandidateProfessionalDetails from './components/CandidateProfessionalDetails';
import { Typography } from '@mui/material';
import CandidateJobsList from './components/CandidateJobsList';
import CandidatePersonalDetails from './components/CandidatePersonalDetails';
import { useCandidatesContext } from '@/context/CandidatesContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the upload icon

import {
  Container,
  ProfessionDetailsGrid,
  JobPostingsListGrid,
  ResumePanelGrid,
  PersonalDetailsGrid,
  StyledPaper,
  ResumePanelPaper,
} from './FullCandidateProfileOverview.styles';

import { CandidateListItem } from '@/Types/CandidatesSection.types';
import { JobPostingListObject } from '@/Types/JobPostingsSection.types';

interface Props {
  selectedCandidate: CandidateListItem;
  jobPostings: JobPostingListObject[];
  jobLoadingId: string | null;
  resumeUrl: string;
  updateSelectedJobPosting: (jobPosting: JobPostingListObject) => void;
  updateScoreDetailsMode: (mode: string) => void;
  handleCalculate: (jobPostingId: string) => void;
  handleFileChange: (file: File) => void;
}

const FullCandidateProfileOverview: React.FC<Props> = ({
  selectedCandidate,
  jobPostings,
  jobLoadingId,
  updateSelectedJobPosting,
  updateScoreDetailsMode,
  handleCalculate,
  resumeUrl,
  handleFileChange,
}) => {
  const fileInputRef = useRef(null);

  const handleResumeClick = () => {
    if (resumeUrl === '') {
      fileInputRef.current.click();
    } else {
      updateScoreDetailsMode('resume');
    }
  };

  const renderResumePanel = (
    resumeUrl,
    handleResumeClick,
    fileInputRef,
    handleFileChange
  ) => {
    // Using an if-else statement for conditional rendering
    if (resumeUrl === '') {
      return (
        <ResumePanelPaper elevation={3} onClick={handleResumeClick}>
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h6">Upload Resume</Typography>
            <CloudUploadIcon style={{ fontSize: '48px', color: '#13d0b7' }} />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e.target.files[0])}
              accept=".pdf" // Modify as needed for other file types
            />
          </div>
        </ResumePanelPaper>
      );
    } else {
      return (
        <ResumePanelPaper elevation={3} onClick={handleResumeClick}>
          <Typography variant="h4">Resume</Typography>
        </ResumePanelPaper>
      );
    }
  };

  return (
    <Container container spacing={2}>
      {/* 1. Professional Details Panel - Top Left */}
      <Grid
        xs={12}
        md={7}
        container
        direction="column"
        spacing={2}
        height={'100%'}
        // flexWrap={'nowrap'}
        maxWidth={'35vw'}
      >
        <ProfessionDetailsGrid xs={12}>
          <StyledPaper
            elevation={3}
            style={{
              paddingBottom: 0,
              marginBottom: 0,
              display: 'flex',
            }}
          >
            <CandidateProfessionalDetails
              selectedCandidate={selectedCandidate}
            />
          </StyledPaper>
        </ProfessionDetailsGrid>

        {/* 2. Job Postings List - Bottom Left */}
        <JobPostingsListGrid xs={12}>
          <StyledPaper elevation={3}>
            <CandidateJobsList
              jobPostings={jobPostings && jobPostings}
              loadingId={jobLoadingId}
              updateSelectedJobPosting={updateSelectedJobPosting}
              handleCalculate={handleCalculate}
            />
          </StyledPaper>
        </JobPostingsListGrid>
      </Grid>

      {/* Right Column */}
      <Grid
        xs={12}
        md={5}
        container
        direction="column"
        spacing={2}
        height={'100%'}
        mr={'0.1%'}
        flexWrap={'nowrap'}
      >
        {/* 3. Resume Panel - Top Right */}
        <ResumePanelGrid xs={12}>
          {renderResumePanel(
            resumeUrl,
            handleResumeClick,
            fileInputRef,
            handleFileChange
          )}
        </ResumePanelGrid>

        {/* 4. Personal Details Panel - Bottom Right (fills remaining space) */}
        <PersonalDetailsGrid xs={12}>
          <StyledPaper elevation={3}>
            <CandidatePersonalDetails selectedCandidate={selectedCandidate} />
          </StyledPaper>
        </PersonalDetailsGrid>
      </Grid>
    </Container>
  );
};

export default FullCandidateProfileOverview;
