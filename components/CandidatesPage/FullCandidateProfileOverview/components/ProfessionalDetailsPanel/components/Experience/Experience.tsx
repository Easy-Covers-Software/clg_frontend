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

const ExperienceHistoryContainer = styled(Grid)`
  width: 100%;
  height: 50%;

  margin: 0;

  // padding: 0;
  // border: 1px solid black;
`;

const TabsBox = styled(Box)`
  // height: '100%';
  position: 'relative';
  margin-right: 2%;
  min-height: 0;
  margin-top: 0.5%;
`;

const TabsContainer = styled(Tabs)`
  min-height: 0;
  display: flex;
  max-width: 28vw;

  .MuiTabs-flexContainer {
    // justify-content: center;
  }

  &.MuiTabs-indicator {
    border-bottom: 1px solid #006d4b;
  }
`;

const SelectionTab = styled(Tab)`
  min-height: 0;
  height: 100%;
  width: 4vw;

  border: 1px solid #006d4b;
  border-radius: 4px 4px 0 0;
  padding: 2px 0;
  &.Mui-selected {
    color: #006d4b;
    font-weight: bold;
    text-decoration: underline;
    border-bottom: 1px solid #13d0b7;
  }
  &.MuiTabs-indicator {
    border-bottom: 1px solid #006d4b;
  }
  // MUI tab root
  &.MuiTab-root {
    min-width: 100px;
  }
`;

const MainContentContainer = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  padding-bottom: 5%;
  padding-left: 0.3%;
  padding-right: 0.3%;
`;

const MainContent = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

const Top = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0 1%;
`;

const TopHeader = styled(Typography)`
  font-size: 1.1rem;
`;

const Middle = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0 1%;
`;

const MiddleHeader = styled(Typography)`
  font-size: 1rem;
  margin-top: -1%;
`;

const Summary = styled(Grid)`
  display: flex;
  flex-direction: column;
  white-space: wrap;
  margin: 0;
  padding: 0;
  padding-left: 1%;
  overflow-y: scroll;
`;

const SummaryNote = styled(Typography)``;

const Experience = ({ selected, handleChange }) => {
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
            value={selected}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            <SelectionTab value="one" label="Job 1" />
            <SelectionTab value="two" label="Job 2" />
            <SelectionTab value="three" label="Job 3" />
            <SelectionTab value="four" label="Job 4" />
          </TabsContainer>
        </TabsBox>
      </Grid>

      <MainContentContainer>
        <MainContent>
          <Top>
            <TopHeader>Job Title</TopHeader>
            <TopHeader>Date</TopHeader>
          </Top>

          <Middle>
            <MiddleHeader>Company</MiddleHeader>
            <MiddleHeader>Industry</MiddleHeader>
          </Middle>

          <Divider />

          <Summary>
            {/* map the summary notes */}
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
            </SummaryNote>
            <SummaryNote>
              Note information for testing purposes brought in over 800k in
              contract revenue over the first 25 years
            </SummaryNote>
          </Summary>
        </MainContent>
      </MainContentContainer>
    </ExperienceHistoryContainer>
  );
};

export default Experience;
