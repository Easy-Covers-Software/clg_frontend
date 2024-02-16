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

const DropdownOptions = styled(Grid2)`
  // height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const DropdownDetailsHeader = styled(Typography)`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DropdownDetails = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
`;

const Preferences = ({
  workPreferencesState,
  handleDropdownPreferenceChange,
}) => {
  const resetPreferenceDropdownSelection = () => {
    handleDropdownPreferenceChange('');
  };

  console.log('WPRF STATE: ', workPreferencesState);

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
                selected={workPreferencesState.selectedDropdownPreference}
                handleSelection={handleDropdownPreferenceChange}
                reset={resetPreferenceDropdownSelection}
              />
              <DropdownPreference
                type="Sponsorship Required"
                selected={workPreferencesState.selectedDropdownPreference}
                handleSelection={handleDropdownPreferenceChange}
                reset={resetPreferenceDropdownSelection}
              />
            </DropdownPreferenceGroup>
            <DropdownPreferenceGroup>
              <DropdownPreference
                type="Background Check"
                selected={workPreferencesState.selectedDropdownPreference}
                handleSelection={handleDropdownPreferenceChange}
                reset={resetPreferenceDropdownSelection}
              />
              <DropdownPreference
                type="Company Culture"
                selected={workPreferencesState.selectedDropdownPreference}
                handleSelection={handleDropdownPreferenceChange}
                reset={resetPreferenceDropdownSelection}
              />
            </DropdownPreferenceGroup>
            <DropdownPreferenceGroup>
              <DropdownPreference
                type="Work / Life Balance"
                selected={workPreferencesState.selectedDropdownPreference}
                handleSelection={handleDropdownPreferenceChange}
                reset={resetPreferenceDropdownSelection}
              />
              <DropdownPreference
                type="Ideal Next Role"
                selected={workPreferencesState.selectedDropdownPreference}
                handleSelection={handleDropdownPreferenceChange}
                reset={resetPreferenceDropdownSelection}
              />
            </DropdownPreferenceGroup>
          </DropdownOptions>
          <DetailedPreferencesContainer>
            <DropdownDetailsHeader>
              {workPreferencesState.selectedDropdownPreference} Details
            </DropdownDetailsHeader>
            <DropdownDetails></DropdownDetails>
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
