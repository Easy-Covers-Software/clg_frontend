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
  width: 96.5%;
  height: 20%;
  margin: auto;
  // flex: 1;

  // margin: 0;
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
  width: 8vw;
  white-space: nowrap;
  // make overflow ellipsis
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;

  border: 1px solid #006d4b;
  border-radius: 4px 4px 0 0;
  padding: 2px 0;
  &.Mui-selected {
    color: #006d4b;
    // font-weight: bold;
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
  width: 75%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin: 0;
  padding: 0 1%;

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
  color: #006d4b;
  padding-top: 0.5%;
`;

const GeneralBottom = styled(Grid)`
  // height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const GeneralBottomHeader = styled(Typography)`
  color: #006d4b;
  font-size: 1.3rem;
`;

const CompletionInfo = styled(Grid)`
  height: 100%;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;

  // border: 1px solid #006d4b;
`;

const CompletionInfoHeader = styled(Typography)`
  color: #006d4b;
`;

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

          <Divider orientation="vertical" flexItem />

          <CompletionInfo>
            <CompletionInfoHeader>
              Status:&nbsp;&nbsp; {selected?.status}
            </CompletionInfoHeader>
            <CompletionInfoHeader>
              GPA:
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {selected?.gpa}
            </CompletionInfoHeader>
          </CompletionInfo>
        </MainContent>
      </MainContentContainer>
    </EducationContainer>
  );
};

export default Education;
