import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import { SectionHeader } from './ProfessionalDetailsPanel.styles';
import CoreSkills from './components/CoreSkills';
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
import Preferences from './components/Preferences';

interface Props {
  selectedCandidate: CandidateListItem;
}

const skills = ['Django', 'React.js', 'Python', 'Typescript', 'Bash'];

const ProfessionalDetailsPanel: React.FC<Props> = ({ selectedCandidate }) => {
  //== skill chips ==//
  // const skillChips = selectedCandidate.skills
  const skillChips = skills.map((skill, index) => (
    <Chip key={index} label={skill.trim()} style={{ margin: '2px' }} />
  ));

  //== For linked in and portfolio website ==//
  const openInNewTab = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('URL is undefined or empty');
    }
  };

  const [jobs, setJobs] = React.useState(0);
  const [edu, setEdu] = React.useState(0);

  const handleJobsChange = (event: React.SyntheticEvent, newValue: number) => {
    setJobs(newValue);
  };

  const handleEduChange = (event: React.SyntheticEvent, newValue: number) => {
    setEdu(newValue);
  };

  return (
    <ProfessionalDetailsGrid>
      <ProfessionalDetailsPaper elevation={3}>
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5%',
          }}
        >
          <Header>Professional Details</Header>
          <FormGroup
            sx={{
              marginRight: '1.5%',
            }}
          >
            <FormControlLabel
              control={<Switch color="success" />}
              label="Work Preferences"
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>

        {/* </Grid> */}
        <Divider
          sx={{
            borderColor: '#13d0b7',
            opacity: 0.4,
          }}
        />
        <MainSections container>
          {/* 1. Experience History */}
          <EmploymentHistory selected={jobs} handleChange={handleJobsChange} />

          {/* 2. Education */}
          <Education selected={edu} handleChange={handleEduChange} />

          {/* 3. Work Preferences */}
          {/* <Preferences /> */}

          {/* 4. Skills */}
          <CoreSkills />
        </MainSections>
      </ProfessionalDetailsPaper>
    </ProfessionalDetailsGrid>
  );
};

export default ProfessionalDetailsPanel;
