import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import {
  SectionHeader,
  SubDivider,
} from '../../../ProfessionalDetailsPanel/ProfessionalDetailsPanel.styles';
import { Typography } from '@mui/material';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';

import SinglePreference from './components/SinglePreference/SinglePreference';
import MultiOptionPreference from './components/MultiOptionPreference/MultiOptionPreference';
import DropdownPreference from './components/DropdownPreference/DropdownPreference';

const Container = styled(Grid2)`
  width: 100%;
  height: 48vh;

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
  height: 12vh;
  // border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;

  margin: 0;
  padding: 0;
`;

const MultiOptionPreferencesContainer = styled(Grid2)`
  height: 23vh;
  // border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  // margin: auto;
`;

const DropdownPreferencesContainer = styled(Grid2)`
  // height: 18vh;
  height: 100%;
  width: 100%;
  // border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-top: 1%;
  gap: 1%;
`;

const DetailedPreferencesContainer = styled(Grid2)`
  height: 22vh;
  border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  margin: 0;
  padding: 0;
`;

const DropdownPreferenceGroup = styled(Grid2)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const DropdownSectionHeader = styled(Typography)`
  position: relative;
  font-size: 1.2rem;
  font-weight: 600;
  color: #006d4b;
  text-align: start;
  margin: 0;
  padding: 0;
  left: -42%;
  top: 3%;
`;

const Preferences = () => {
  return (
    <Container>
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
        <MultiOptionPreferencesContainer>
          <MultiOptionPreference
            type="On-Site Availability"
            values={[
              { remote: 'true' },
              { hybrid: 'true' },
              { inPerson: 'false' },
            ]}
          />
          <MultiOptionPreference
            type="Role Type"
            values={[
              { fullTime: 'true' },
              { partTime: 'false' },
              { contract: 'true' },
              { internship: 'false' },
            ]}
          />
          <MultiOptionPreference
            type="Company Size"
            values={[
              { startup: 'true' },
              { small: 'true' },
              { medium: 'true' },
              { large: 'false' },
              // { enterprise: 'false' },
            ]}
          />
        </MultiOptionPreferencesContainer>

        {/* 3. Dropdown Preference display */}
        <DropdownPreferencesContainer>
          <DropdownSectionHeader>Select:</DropdownSectionHeader>
          <DropdownPreferenceGroup>
            <DropdownPreference
              type="Open To Relocation"
              details="I will move anywhere in the country besides Illinois. The amount of corn there disturbs me."
            />
            <DropdownPreference
              type="Sponsorship Required"
              details="I am from india and will need to get my current sponsor transfered to my new employer. I will facilitate the process."
            />
          </DropdownPreferenceGroup>
          <DropdownPreferenceGroup>
            <DropdownPreference
              type="Background Check"
              details="This will be where the details from the background check will be displayed from the new backgrond check model I need to implement."
            />
            <DropdownPreference
              type="Company Culture"
              details="I prefer a small startup role environment where i will be able to wear many hats and have a direct impact on the company. I want my voice to be heard and to have a major role in the decision making on the technical side of the business. I am not interested in a large corporate environment."
            />
          </DropdownPreferenceGroup>
          <DropdownPreferenceGroup>
            <DropdownPreference
              type="Work / Life Balance"
              details="I am a workaholic at heart and currently do not have a spouse or family to take care of, therefore I do not have any specific interest in a work / life balanced position."
            />
            <DropdownPreference
              type="Ideal Next Role"
              details="I would like to get a nice mix of the tech stack i am comfortable with which is django (python) + react.js (javascript/typescript) while also expanding into new places of python that i have not yet worked with like with machine learning or data science. I would also like to work with a team that is open to new ideas and is willing to take risks. I am not interested in a role that is just maintaining a legacy codebase."
            />
          </DropdownPreferenceGroup>
        </DropdownPreferencesContainer>

        {/* 4. Detailed Preference display */}
        {/* <DetailedPreferencesContainer></DetailedPreferencesContainer> */}
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
