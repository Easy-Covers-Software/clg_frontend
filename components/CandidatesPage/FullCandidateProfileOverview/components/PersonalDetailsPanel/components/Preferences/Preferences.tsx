import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import {
  SectionHeader,
  SubDivider,
} from '../../../ProfessionalDetailsPanel/ProfessionalDetailsPanel.styles';
import { Typography } from '@mui/material';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';

import SinglePreference from './components/SinglePreference/SinglePreference';

const Container = styled(Grid2)`
  width: 100%;
  height: 18%;

  margin: 0;
  padding: 0;
`;

const PreferencesContainer = styled(Grid2)`
  width: 100%;
  max-width: 40vw;
  height: 100%;
  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;
`;

const SinglePreferencesContainer = styled(Grid2)`
  height: 15vh;
  border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;

  margin: 0;
  padding: 0;
`;

const MultiOptionPreferencesContainer = styled(Grid2)`
  height: 22vh;
  border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  margin: 0;
  padding: 0;
`;

const DropdownPreferencesContainer = styled(Grid2)`
  height: 18vh;
  border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  margin: 0;
  padding: 0;
`;

const DetailedPreferencesContainer = styled(Grid2)`
  height: 22vh;
  border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  margin: 0;
  padding: 0;
`;

const Preferences = () => {
  return (
    <Container xs={6}>
      <SectionHeader>Preferences</SectionHeader>
      <SubDivider />

      <PreferencesContainer>
        {/* 1. Single Preference display */}
        <SinglePreferencesContainer>
          <SinglePreference type="Seeking Work" value="Urgently" />
          <SinglePreference type="Salary Needs" value="$125,000" />
          <SinglePreference type="Date Available" value="02/14/2024" />
          <SinglePreference type="Travel Availability" value="10%" />
        </SinglePreferencesContainer>

        {/* 2. Multi-option Preference display */}
        <MultiOptionPreferencesContainer></MultiOptionPreferencesContainer>

        {/* 3. Dropdown Preference display */}
        <DropdownPreferencesContainer></DropdownPreferencesContainer>

        {/* 4. Detailed Preference display */}
        <DetailedPreferencesContainer></DetailedPreferencesContainer>
      </PreferencesContainer>
    </Container>
  );
};

export default Preferences;

// const PreferenceLabel = styled(Typography)`
//   text-align: center;
//   font-size: 0.9rem;
//   font-weight: 600;
//   margin-bottom: -4%;
// `;

// // const PreferenceButton = styled(PrimaryButton)`
// const PreferenceButton = styled(UnSelectedButton)`
//   width: 90%;
//   font-size: 0.88rem;
//   height: 58%;
//   padding: 1% 0;
//   color: #006d4b;
//   background-color: white;
//   letter-spacing: 1px;
//   box-shadow: none;
//   line-height: 1.1;
//   border: 1px solid #006d4b;
// `;

// const SinglePreferenceContainer = styled(Grid)`
//   height: 86%;
//   width: 19%;
//   display: flex;
//   flex-direction: column;
//   // justify-content: center;
//   align-items: center;
//   padding: 0;
//   margin: 0;
//   padding-top: 1%;
// `;
