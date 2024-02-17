import React from 'react';
import Grid from '@mui/material/Grid';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import { SectionHeader } from './ProfessionalDetailsPanel.styles';
import CoreSkills from './components/CoreSkills/CoreSkills';
import ProfessionalLinks from './components/ProfessionalLinks/ProfessionalLinks';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EmploymentHistory from './components/Experience/Experience';
import Education from './components/Education/Education';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import { FormGroup, FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';

import {
  ProfessionalDetailsGrid,
  ProfessionalDetailsPaper,
  Header,
  MainSections,
} from './ProfessionalDetailsPanel.styles';

import { CandidateListItem } from '@/Types/CandidatesSection.types';
import Preferences from '../WorkPreferencesPanel/components/Preferences/Preferences';

interface Props {
  selectedCandidate: CandidateListItem;
}

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

const SkillsContainer = styled(Grid)`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const skills = ['Django', 'React.js', 'Python', 'Typescript', 'Bash'];

const ProfessionalDetailsPanel: React.FC<any> = ({
  candidateState,
  updateProfessionalDetailsState,
}) => {
  const [job, setJob] = React.useState(0);
  const [edu, setEdu] = React.useState(0);

  const handleJobsChange = (event: React.SyntheticEvent, newValue: number) => {
    setJob(newValue);
    updateProfessionalDetailsState(
      'selectedExperience',
      candidateState.selectedCandidate.employment_history[newValue]
    );
  };

  const handleEduChange = (event: React.SyntheticEvent, newValue: number) => {
    updateProfessionalDetailsState(
      'selectedEducation',
      candidateState.selectedCandidate.education_history[newValue]
    );
    setEdu(newValue);
  };

  return (
    <ProfessionalDetailsGrid>
      <ProfessionalDetailsPaper elevation={3}>
        <StyledDivider />

        <MainSections container>
          {/* 1. Experience History */}
          <EmploymentHistory
            experiences={candidateState.selectedCandidate?.employment_history}
            selected={
              candidateState.professionalDetailsState?.selectedExperience
            }
            selectedIndex={job}
            handleChange={handleJobsChange}
          />

          {/* 2. Education */}
          <Education
            educations={candidateState.selectedCandidate?.education_history}
            selected={
              candidateState.professionalDetailsState?.selectedEducation
            }
            selectedIndex={edu}
            handleChange={handleEduChange}
          />

          {/* 3. Skills */}
          <SkillsContainer>
            <CoreSkills skills={candidateState.selectedCandidate.core_skills} />

            <ProfessionalLinks />
          </SkillsContainer>
        </MainSections>
      </ProfessionalDetailsPaper>
    </ProfessionalDetailsGrid>
  );
};

export default ProfessionalDetailsPanel;
