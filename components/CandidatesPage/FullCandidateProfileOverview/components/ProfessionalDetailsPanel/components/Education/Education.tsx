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

const EducationContainer = styled(Grid)`
  width: 100%;
  height: 20%;
  // flex: 1;

  margin: 0;
  // margin-top: 1%;
  // padding: 0;
  // border: 1px solid red;
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
  padding-bottom: 4.5%;
  padding-left: 0.3%;
  padding-right: 0.3%;
`;

const MainContent = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;

  margin: 0;
  padding: 0;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

const GeneralInfo = styled(Grid)`
  height: 100%;
  width: 72%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin: 0;
  padding: 0.5% 1% 0 1%;

  // border: 1px solid #006d4b;
`;

const GeneralTop = styled(Grid)`
  // height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GeneralTopHeader = styled(Typography)`
  font-size: 1.1rem;
`;

const GeneralBottom = styled(Grid)`
  // height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GeneralBottomHeader = styled(Typography)``;

const CompletionInfo = styled(Grid)`
  height: 100%;
  width: 28%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;

  // border: 1px solid #006d4b;
`;

const CompletionInfoHeader = styled(Typography)``;

const Education = ({ selected, handleChange }) => {
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
            <SelectionTab value="one" label="Education 1" />
            <SelectionTab value="two" label="Education 2" />
          </TabsContainer>
        </TabsBox>
      </Grid>

      <MainContentContainer>
        <MainContent>
          <GeneralInfo>
            <GeneralTop>
              <GeneralTopHeader>Bachelors of Science</GeneralTopHeader>
              <GeneralTopHeader>Date</GeneralTopHeader>
            </GeneralTop>

            <GeneralBottom>
              <GeneralBottomHeader>University of Texas</GeneralBottomHeader>
              <GeneralBottomHeader>Field of Study</GeneralBottomHeader>
            </GeneralBottom>
          </GeneralInfo>

          <Divider orientation="vertical" flexItem />

          <CompletionInfo>
            <CompletionInfoHeader>Completed</CompletionInfoHeader>
            <CompletionInfoHeader>gpa: 3.5</CompletionInfoHeader>
          </CompletionInfo>
        </MainContent>
      </MainContentContainer>
    </EducationContainer>
  );
};

export default Education;
