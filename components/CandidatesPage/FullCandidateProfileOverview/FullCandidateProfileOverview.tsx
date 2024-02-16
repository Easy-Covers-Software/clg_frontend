import React, { useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import styled from '@emotion/styled';

import { Paper, Typography } from '@mui/material';
import CandidateJobsList from './components/CandidateJobsList';
import WorkPreferencesPanel from './components/WorkPreferencesPanel/WorkPreferencesPanel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the upload icon

import { Container } from './FullCandidateProfileOverview.styles';

import ExtraDetailsPanel from './components/ExtraDetailsPanel';
import { CandidateListItem } from '@/Types/CandidatesSection.types';
import { JobPostingListObject } from '@/Types/JobPostingsSection.types';
import ProfessionalDetailsPanel from './components/ProfessionalDetailsPanel/ProfessionalDetailsPanel';
import { FormGroup, Divider, FormControlLabel, Switch } from '@mui/material';
import { Header } from './components/ProfessionalDetailsPanel/ProfessionalDetailsPanel.styles';

const ColumnContainer = styled(Grid)`
  height: 100%;
  // max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  gap: 1%;
`;

const HeaderContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5%;
`;

const SwitchContainer = styled(FormGroup)`
  margin-right: 1.5%;
`;

const StyledDivider = styled(Divider)`
  border-color: #13d0b7;
  opacity: 0.4;
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
  updateProfessionalDetails: (data: any, value) => void;
}

const PanelBackgroundPaper = styled(Paper)`
  // height: 100%;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const FullCandidateProfileOverview: React.FC<any> = ({
  // KEEP
  updateMode,
  handleCalculate,
  updateSelectedJobPosting,
  handleFileChange,

  // REMOVE
  jobPostings, // 1.
  resumeUrl, // 2.
  jobLoadingId, // 7.
  updateProfessionalDetails, //
  selectedCandidate,
  candidatePanelMode,

  // NEW
  updateCandDetailsPanelMode,
  workPreferencesState,
  handleDropdownPreferenceChange,

  candidateState,
}) => {
  const fileInputRef = useRef(null);

  console.log('candidatePanelMode', candidatePanelMode);

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
        <PanelBackgroundPaper>
          <HeaderContainer>
            {candidatePanelMode === 'Professional' ? (
              <Header>Professional Details</Header>
            ) : (
              <Header>Work Preferences</Header>
            )}
            <SwitchContainer>
              <FormControlLabel
                control={
                  <Switch
                    color="success"
                    checked={
                      candidatePanelMode === 'Professional' ? false : true
                    }
                    onChange={() => {
                      if (candidatePanelMode === 'Professional') {
                        updateCandDetailsPanelMode('Work Preferences');
                      } else {
                        updateCandDetailsPanelMode('Professional Details');
                      }
                    }}
                  />
                }
                label="Work Preferences"
                labelPlacement="start"
              />
            </SwitchContainer>
          </HeaderContainer>

          {candidatePanelMode === 'Professional' ? (
            <ProfessionalDetailsPanel
              selectedCandidate={selectedCandidate}
              professionalDetails={candidateState.professionalDetailsState}
              updateProfessionalDetails={updateProfessionalDetails}
            />
          ) : (
            // Else personal details
            <WorkPreferencesPanel
              selectedCandidate={selectedCandidate}
              handleDropdownPreferenceChange={handleDropdownPreferenceChange}
            />
          )}
        </PanelBackgroundPaper>
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
