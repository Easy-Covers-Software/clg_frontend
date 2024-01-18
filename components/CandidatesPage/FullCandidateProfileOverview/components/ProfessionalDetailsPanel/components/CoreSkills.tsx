import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { SectionHeader, SubDivider } from '../ProfessionalDetailsPanel.styles';
import { Typography } from '@mui/material';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';
import Chip from '@mui/material/Chip';

const Container = styled(Grid)`
  width: 100%;
  height: 15%;

  margin: 0;
  // border: 1px solid black;
`;

const ChipsContainer = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 0.5;
  padding: 0 2%;
  margin: 0;
  overflow: none;
`;

const skills = [
  'Django',
  'React.js',
  'Python',
  'Typescript',
  'Bash',
  'PostgreSQL',
  // 'Linux',
];

const CoreSkills = () => {
  // const skillChips = selectedCandidate.skills
  const skillChips = skills.map((skill, index) => (
    <Chip
      key={index}
      label={skill.trim()}
      style={{ margin: '2px', border: '1px solid #006D4B' }}
    />
  ));

  return (
    <Container xs={6}>
      <SectionHeader>Core Skills</SectionHeader>
      <SubDivider />

      <ChipsContainer>{skillChips}</ChipsContainer>
    </Container>
  );
};

export default CoreSkills;
