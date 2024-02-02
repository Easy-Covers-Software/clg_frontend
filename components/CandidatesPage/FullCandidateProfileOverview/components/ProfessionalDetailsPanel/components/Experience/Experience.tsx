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
  ExperienceHistoryContainer,
  TabsBox,
  TabsContainer,
  SelectionTab,
  MainContentContainer,
  MainContent,
  Top,
  TopHeader,
  Middle,
  MiddleHeader,
  Summary,
  SummaryNote,
} from './Experience.styles';

const Experience = ({ experiences, selected, selectedIndex, handleChange }) => {
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
    <ExperienceHistoryContainer item>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          padding: 0,
          margin: 0,
        }}
      >
        <SectionHeader>Experience</SectionHeader>
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
            {experiences.map((experience, index) => (
              <SelectionTab
                key={index}
                value={index}
                label={experience.employer}
              />
            ))}
          </TabsContainer>
        </TabsBox>
      </Grid>

      <MainContentContainer>
        <MainContent>
          <Top>
            <TopHeader>{selected?.job_title}</TopHeader>
            <TopHeader>
              {formatDateRange(selected?.start_date, selected?.end_date)}
            </TopHeader>
          </Top>

          {/* <Middle>
            <MiddleHeader>{selected?.employer}</MiddleHeader>
            <MiddleHeader>{selected?.industry}</MiddleHeader>
          </Middle> */}

          <Divider />

          <Summary>
            {/* map the summary notes */}
            {selected?.summary.map((summary_point, index) => (
              <SummaryNote key={index}>{summary_point}</SummaryNote>
            ))}

            {/* <SummaryNote>
              Note information for testing purposes brought in over 800k in
              contract revenue over the first 25 years
            </SummaryNote>
            <SummaryNote>
              Note information for testing purposes brought in over 800k in
              contract revenue over the first 25 years
            </SummaryNote>
            <SummaryNote>
              Note information for testing purposes brought in over 800k in
              contract revenue over the first 25 years
            </SummaryNote>
            <SummaryNote>
              Note information for testing purposes brought in over 800k in
              contract revenue over the first 25 years
            </SummaryNote> */}
          </Summary>
        </MainContent>
      </MainContentContainer>
    </ExperienceHistoryContainer>
  );
};

export default Experience;
