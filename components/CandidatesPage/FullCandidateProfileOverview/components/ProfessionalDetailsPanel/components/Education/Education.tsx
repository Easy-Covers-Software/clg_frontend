import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { SectionHeader } from '../../ProfessionalDetailsPanel.styles';

import {
  EducationContainer,
  TabsBox,
  TabsContainer,
  SelectionTab,
  MainContentContainer,
  MainContent,
  GeneralInfo,
  GeneralTop,
  GeneralTopHeader,
  GeneralBottom,
  GeneralBottomHeader,
  CompletionInfo,
  CompletionInfoHeader,
} from './Education.styles';

const Education = ({ educations, selected, selectedIndex, handleChange }) => {
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    });

    const end = new Date(endDate).toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    });

    return `${start} - ${end}`;
  };

  return (
    <EducationContainer item>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          padding: 0,
          margin: 0,
        }}
      >
        <SectionHeader>Education</SectionHeader>
        <TabsBox>
          <TabsContainer
            value={selectedIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            {educations.map((education, index) => (
              <SelectionTab
                key={index}
                value={index}
                label={education.education_level}
                // label={`Education ${index + 1}`}
              />
            ))}
          </TabsContainer>
        </TabsBox>
      </Grid>

      <MainContentContainer>
        <MainContent>
          <GeneralInfo>
            <GeneralTop>
              <GeneralTopHeader>{selected?.education_level}</GeneralTopHeader>
              <GeneralTopHeader>{selected?.field_of_study}</GeneralTopHeader>
            </GeneralTop>

            <GeneralBottom>
              <GeneralBottomHeader>{selected?.institution}</GeneralBottomHeader>
              <GeneralBottomHeader>
                {formatDateRange(selected?.start_date, selected?.end_date)}
              </GeneralBottomHeader>
            </GeneralBottom>
          </GeneralInfo>

          <Divider />

          <CompletionInfo>
            <CompletionInfoHeader>
              Status:&nbsp;&nbsp; {selected?.status}
            </CompletionInfoHeader>

            <Divider orientation="vertical" flexItem />

            <CompletionInfoHeader>
              GPA: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {selected?.gpa}
            </CompletionInfoHeader>

            <Divider orientation="vertical" flexItem />

            <CompletionInfoHeader>Additional Details</CompletionInfoHeader>
          </CompletionInfo>
        </MainContent>
      </MainContentContainer>
    </EducationContainer>
  );
};

export default Education;
