import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import { SectionHeader } from './ProfessionalDetailsPanel.styles';
import CoreSkills from './components/CoreSkills';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {
  ProfessionalDetailsGrid,
  ProfessionalDetailsPaper,
  Header,
  MainSections,
} from './ProfessionalDetailsPanel.styles';

import { CandidateListItem } from '@/Types/CandidatesSection.types';
import Preferences from './components/Preferences';

const ExperienceHistoryContainer = styled(Grid)`
  width: 100%;
  height: 32%;

  margin: 0;
  // border: 1px solid black;
`;

const EducationContainer = styled(Grid)`
  width: 100%;
  height: 22%;

  margin: 0;
  // border: 1px solid red;
`;

const SkillsContainer = styled(Grid)`
  width: 100%;
  height: 15%;

  margin: 0;
  // border: 1px solid black;
`;

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

  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ProfessionalDetailsGrid xs={12}>
      <ProfessionalDetailsPaper elevation={3}>
        <Header>Professional Details</Header>
        <Divider
          sx={{
            borderColor: '#13d0b7',
            opacity: 0.4,
          }}
        />
        <MainSections container>
          {/* 1. Experience History */}
          <ExperienceHistoryContainer item>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                margin: 0,
                // height: '2vh',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  paddingLeft: '2%',
                  minHeight: 0,
                }}
              >
                <Box
                  sx={{
                    width: '6vw',
                    height: '4vh',
                    border: '1px solid #006D4B',
                  }}
                ></Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                  style={{
                    height: '100%',
                  }}
                >
                  <Tab
                    value="one"
                    label="Item 1"
                    sx={{
                      border: '1px solid #006D4B',
                      minHeight: 0,
                    }}
                  />
                  <Tab
                    value="two"
                    label="Item Two"
                    sx={{
                      border: '1px solid #006D4B',
                      // height: '3vh',
                      minHeight: 0,
                    }}
                  />
                  <Tab
                    value="three"
                    label="Item Three"
                    sx={{
                      border: '1px solid #006D4B',
                      minHeight: 0,
                      padding: '1% 0',
                    }}
                  />
                </Tabs>
              </Box>

              <SectionHeader>Experience</SectionHeader>
            </Grid>

            <Divider
              sx={{
                width: '96.5%',
                margin: 'auto',
                borderColor: '#006D4B',
                opacity: 0.6,
              }}
            />
          </ExperienceHistoryContainer>

          {/* 2. Education */}
          <EducationContainer item>
            <SectionHeader>Education</SectionHeader>
            <Divider
              sx={{
                width: '96.5%',
                margin: 'auto',
                borderColor: '#006D4B',
                opacity: 0.6,
              }}
            />
            {/* <Preferences></Preferences> */}
          </EducationContainer>

          {/* 3. Work Preferences */}
          <Preferences />

          {/* 4. Skills */}
          <CoreSkills />
        </MainSections>
      </ProfessionalDetailsPaper>
    </ProfessionalDetailsGrid>
  );
};

export default ProfessionalDetailsPanel;
