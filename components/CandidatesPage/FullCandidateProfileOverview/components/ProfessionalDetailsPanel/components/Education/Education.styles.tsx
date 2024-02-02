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

export const EducationContainer = styled(Grid)`
  width: 96.5%;
  height: 20%;
  margin: auto;
  // flex: 1;

  // margin: 0;
  // margin-top: 1%;
  // padding: 0;
  // border: 1px solid red;
`;

export const TabsBox = styled(Box)`
  // height: '100%';
  position: 'relative';
  margin-right: 2%;
  min-height: 0;
  margin-top: 0.5%;
`;

export const TabsContainer = styled(Tabs)`
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

export const SelectionTab = styled(Tab)`
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

export const MainContentContainer = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  // flex-direction: column;
  margin: 0;
  padding: 0;
  padding-bottom: 4.5%;
  padding-left: 0.3%;
  padding-right: 0.3%;
`;

export const MainContent = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

export const GeneralInfo = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  margin: 0;
  padding: 0 1%;

  // border: 1px solid #006d4b;
`;

export const GeneralTop = styled(Grid)`
  // height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const GeneralTopHeader = styled(Typography)`
  font-size: 1.2rem;
  color: #006d4b;
  padding-top: 0.5%;
`;

export const GeneralBottom = styled(Grid)`
  // height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const GeneralBottomHeader = styled(Typography)`
  color: #006d4b;
  font-size: 1.35rem;
`;

export const CompletionInfo = styled(Grid)`
  height: 100%;
  width: 100%;
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;

  // border: 1px solid #006d4b;
`;

export const CompletionInfoHeader = styled(Typography)`
  color: #006d4b;
  margin: auto 0;
  padding: 0 3%;
`;
