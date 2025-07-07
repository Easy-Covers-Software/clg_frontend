import React, { useRef } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Importing Grid2
import styled from '@emotion/styled';

import { Paper, Typography } from '@mui/material';
import CandidateJobsList from './components/CandidateJobsList';
import WorkPreferencesPanel from './components/WorkPreferencesPanel/WorkPreferencesPanel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the upload icon

import { Container } from './FullCandidateProfileOverview.styles';

import ExtraDetailsPanel from './components/ExtraDetailsPanel';
// import { CandidateListItem } from '@/Types/CandidatesSection.types';
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
  handleCalculate,
  updateSelectedJobPosting,
  handleFileChange,

  // REMOVE
  resumeUrl,
  updateProfessionalDetailsState,

  // NEW
  updateMode,
  updateCandDetailsPanelMode,
  handleDropdownPreferenceChange,

  candidateState,
}) => {
  const fileInputRef = useRef(null);

  return (
    <Container container>
      {/*** LEFT SIDE ***/}
      <ColumnContainer xs={12} md={8}>
        {/* TOP LEFT */}
        <PanelBackgroundPaper>
          <HeaderContainer>
            <Header>{candidateState.candidateDetailsMode}</Header>
            <SwitchContainer>
              <FormControlLabel
                control={
                  <Switch
                    color="success"
                    checked={
                      candidateState.candidateDetailsMode ===
                      'Professional Details'
                        ? false
                        : true
                    }
                    onChange={() => {
                      if (
                        candidateState.candidateDetailsMode ===
                        'Professional Details'
                      ) {
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

          {candidateState.candidateDetailsMode === 'Professional Details' ? (
            <ProfessionalDetailsPanel
              candidateState={candidateState}
              updateProfessionalDetailsState={updateProfessionalDetailsState}
            />
          ) : (
            <WorkPreferencesPanel
              candidateState={candidateState}
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
          currentJobs={candidateState.currentJobsState.jobs}
          updateSelectedJobPosting={updateSelectedJobPosting}
          handleCalculate={handleCalculate}
        />
      </ColumnContainer>
    </Container>
  );
};

export default FullCandidateProfileOverview;
