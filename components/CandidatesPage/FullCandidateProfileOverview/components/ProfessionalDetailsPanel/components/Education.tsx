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

import { SectionHeader } from '../ProfessionalDetailsPanel.styles';

const EducationContainer = styled(Grid)`
  width: 100%;
  height: 32%;
  // flex: 1;

  margin: 0;
  margin-top: 1%;
  // padding: 0;
  // border: 1px solid red;
`;

const TabsBox = styled(Box)`
  height: '100%';
  position: 'relative';
  margin-left: 2%;
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
  padding: 4px 0;
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

        <SectionHeader>Education</SectionHeader>
      </Grid>

      <Divider
        sx={{
          width: '96.5%',
          margin: 'auto',
          borderColor: '#006D4B',
          opacity: 0.6,
        }}
      />
      <Grid
        style={{
          height: '76%',
          width: '96.5%',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          margin: '0 auto',
          border: '1px solid #006D4B',
          borderRadius: '0 0 4px 4px',
        }}
      ></Grid>
    </EducationContainer>
  );
};

export default Education;
