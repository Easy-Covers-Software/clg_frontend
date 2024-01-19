import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { SectionHeader, SubDivider } from '../ProfessionalDetailsPanel.styles';
import { Typography } from '@mui/material';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';

const Container = styled(Grid)`
  width: 100%;
  height: 18%;

  margin: 0;
  padding: 0;
`;

const PreferenceContainer = styled(Grid)`
  width: 96%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;

  margin: 0 auto;
  padding: 0;
`;

const PreferenceLabel = styled(Typography)`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: -4%;
`;

// const PreferenceButton = styled(PrimaryButton)`
const PreferenceButton = styled(UnSelectedButton)`
  width: 90%;
  font-size: 0.88rem;
  height: 58%;
  padding: 1% 0;
  color: #006d4b;
  background-color: white;
  letter-spacing: 1px;
  box-shadow: none;
  line-height: 1.1;
  border: 1px solid #006d4b;
`;

const SinglePreferenceContainer = styled(Grid)`
  height: 86%;
  width: 19%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  padding-top: 1%;
`;

const Preferences = () => {
  return (
    <Container xs={6}>
      <SectionHeader>Preferences</SectionHeader>
      <SubDivider />

      <PreferenceContainer>
        <SinglePreferenceContainer>
          <PreferenceLabel>Job Type</PreferenceLabel>
          <PreferenceButton>
            Full <br /> Time
          </PreferenceButton>
        </SinglePreferenceContainer>
        <SinglePreferenceContainer>
          <PreferenceLabel>Relocation</PreferenceLabel>
          <PreferenceButton>
            If <br /> Offered
          </PreferenceButton>
        </SinglePreferenceContainer>
        <SinglePreferenceContainer>
          <PreferenceLabel>Onsite</PreferenceLabel>
          <PreferenceButton>
            Remote <br /> Only
          </PreferenceButton>
        </SinglePreferenceContainer>
        <SinglePreferenceContainer>
          <PreferenceLabel>Travel</PreferenceLabel>
          <PreferenceButton>
            Up to <br /> 15%
          </PreferenceButton>
        </SinglePreferenceContainer>
        <SinglePreferenceContainer>
          <PreferenceLabel>Salary</PreferenceLabel>
          <PreferenceButton>75k-90k</PreferenceButton>
        </SinglePreferenceContainer>
      </PreferenceContainer>
    </Container>
  );
};

export default Preferences;
