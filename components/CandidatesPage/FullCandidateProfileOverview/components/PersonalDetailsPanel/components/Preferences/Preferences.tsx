import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import {
  SectionHeader,
  SubDivider,
} from '../../../ProfessionalDetailsPanel/ProfessionalDetailsPanel.styles';
import { Typography } from '@mui/material';
import { PrimaryButton, UnSelectedButton } from '@/components/Global/Global';
import { Paper } from '@mui/material';
import SinglePreference from './components/SinglePreference/SinglePreference';
import MultiOptionPreference from './components/MultiOptionPreference/MultiOptionPreference';
import DropdownPreference from './components/DropdownPreference/DropdownPreference';

const Container = styled(Grid2)`
  width: 100%;
  height: 48vh;

  margin: 0;
  padding: 0;
  gap: 3%;
`;

const PreferencesContainer = styled(Grid2)`
  width: 100%;
  max-width: 40vw;
  height: 100%;
  max-height: 46vh;
  display: flex;
  flex-direction: column;
  // align-items: center;

  margin: 0;
  padding: 0;
  // gap: 3%;
`;

const SinglePreferencesContainer = styled(Grid2)`
  height: 12vh;
  // border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;

  margin: 0;
  padding: 0;
  margin-left: 1%;
`;

const MultiOptionPreferencesContainer = styled(Grid2)`
  height: 23vh;
  // border: 1px solid #13d0b7;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  margin-top: 1%;
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
  // gap: 1%;
  margin-top: 2%;
`;

const DetailedPreferencesContainer = styled(Grid2)`
  display: flex; // Ensure it's a flex container
  flex-wrap: wrap; // Allow children to wrap
  align-content: flex-start; // Align wrapped lines at the start of the container
  height: auto; // Allow container to expand based on content
  min-height: 24vh; // Keep your original height as min-height
  width: 99.6%;
  border: 1px solid #13d0b7;
  border-top: none;
  border-radius: 4px;
  margin: 0;
  padding: 10px;
  white-space: wrap;
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

const DropdownOptions = styled(Grid2)`
  // height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const WrappedTypography = styled(Typography)`
  width: 100%;
  word-break: break-word;
`;

const Preferences = ({ workPreferencesState }) => {
  return (
    <Container>
      {/* <SectionHeader>Work Preferences</SectionHeader> */}
      {/* <SubDivider /> */}

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
              { Remote: 'true' },
              { Hybrid: 'true' },
              { Onsite: 'false' },
            ]}
          />
          <MultiOptionPreference
            type="Role Type"
            values={[
              { FullTime: 'true' },
              { PartTime: 'false' },
              { Contract: 'true' },
              { Internship: 'false' },
            ]}
          />
          <MultiOptionPreference
            type="Company Size"
            values={[
              { Startup: 'true' },
              { Small: 'true' },
              { Medium: 'true' },
              { Large: 'false' },
              // { enterprise: 'false' },
            ]}
          />
        </MultiOptionPreferencesContainer>

        {/* 3. Dropdown Preference display */}
        <DropdownPreferencesContainer>
          {/* <DropdownSectionHeader>Select:</DropdownSectionHeader> */}
          <DropdownOptions>
            <DropdownPreferenceGroup>
              <DropdownPreference
                type="Open To Relocation"
                details="I will move anywhere in the country besides Illinois. The amount of corn there disturbs me."
                selected={workPreferencesState.selectedDropdownPreference}
              />
              <DropdownPreference
                type="Sponsorship Required"
                details="I am from india and will need to get my current sponsor transfered to my new employer. I will facilitate the process."
                selected={workPreferencesState.selectedDropdownPreference}
              />
            </DropdownPreferenceGroup>
            <DropdownPreferenceGroup>
              <DropdownPreference
                type="Background Check"
                details="This will be where the details from the background check will be displayed from the new backgrond check model I need to implement."
                selected={workPreferencesState.selectedDropdownPreference}
              />
              <DropdownPreference
                type="Company Culture"
                details="I prefer a small startup role environment where i will be able to wear many hats and have a direct impact on the company. I want my voice to be heard and to have a major role in the decision making on the technical side of the business. I am not interested in a large corporate environment."
                selected={workPreferencesState.selectedDropdownPreference}
              />
            </DropdownPreferenceGroup>
            <DropdownPreferenceGroup>
              <DropdownPreference
                type="Work / Life Balance"
                details="I am a workaholic at heart and currently do not have a spouse or family to take care of, therefore I do not have any specific interest in a work / life balanced position."
                selected={workPreferencesState.selectedDropdownPreference}
              />
              <DropdownPreference
                type="Ideal Next Role"
                details="I would like to get a nice mix of the tech stack i am comfortable with which is django (python) + react.js (javascript/typescript) while also expanding into new places of python that i have not yet worked with like with machine learning or data science. I would also like to work with a team that is open to new ideas and is willing to take risks. I am not interested in a role that is just maintaining a legacy codebase."
                selected={workPreferencesState.selectedDropdownPreference}
              />
            </DropdownPreferenceGroup>
          </DropdownOptions>
          <DetailedPreferencesContainer>
            {/* TODO: need to update this to be a dynamic context value */}
            <WrappedTypography>
              I would like to get a nice mix of the tech stack i am comfortable
              with which is django (python) + react.js (javascript/typescript)
              while also expanding into new places of python that i have not yet
              worked with like with machine learning or data science. I would
              also like to work with a team that is open to new ideas and is
              willing to take risks. I am not interested in a role that is just
              maintaining a legacy codebase.
            </WrappedTypography>
          </DetailedPreferencesContainer>
        </DropdownPreferencesContainer>

        {/* 4. Selected Detailed Preference display */}
        {/* <DetailedPreferencesContainer>

        </DetailedPreferencesContainer> */}
      </PreferencesContainer>
    </Container>
  );
};

export default Preferences;
