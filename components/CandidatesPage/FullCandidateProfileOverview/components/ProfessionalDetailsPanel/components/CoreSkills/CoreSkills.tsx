import { useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import {
  SectionHeader,
  SubDivider,
} from '../../ProfessionalDetailsPanel.styles';
import { Typography } from '@mui/material';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';

const Container = styled(Grid)`
  width: 70%;
  height: 15%;
  // flex: 1;
  margin-top: 3%;
  margin: 0;
  padding: 1%;
  // margin: auto;
  // border: 1px solid black;
`;

const ChipsContainer = styled(Grid)`
  display: flex;
  // justify-content: end;
  align-items: end;
  flex-wrap: wrap;
  padding: 0 2%;
  margin: 0;
  overflow: scroll;
`;

const CoreSkills = ({ skills }) => {
  const [open, setOpen] = useState(true);

  // const skillChips = selectedCandidate.skills
  const skillChips = skills?.map((skill, index) => (
    <Chip
      key={index}
      label={skill.trim()}
      style={{
        margin: '0.8% 0',
        border: '1px solid #006D4B',
        backgroundColor: '#f8f8ff',
      }}
    />
  ));

  return (
    <Container>
      <SectionHeader>Core Skills</SectionHeader>

      <SubDivider />

      <ChipsContainer>{skillChips}</ChipsContainer>
    </Container>
  );
};

export default CoreSkills;
