import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Paper, Typography } from '@mui/material';
import React from 'react';

const Container = styled(Grid2)`
  // height: 10vh;
  // width: 18vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Typography)`
  // width: 100%;
  // height: 100%;

  position: relative;
  top: 3%;
  left: 3%;
`;

const MultiPreferencePaper = styled(Paper)`
  height: 7vh;
  // width: 18vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #13d0b7;
`;

const PreferenceValue = styled(Typography)`
  font-size: 1.4rem;
`;

type MultiOptionPreferenceValues = {
  [key: string]: string;
};

interface Props {
  type: string;
  values: MultiOptionPreferenceValues;
}

const MultiOptionPreference: React.FC<Props> = ({ type, values }) => {
  return (
    <Container>
      <Header>{type}</Header>
      <MultiPreferencePaper>
        {/* Loop through the dictionary of 'values' where the key will be the option value and value will be a true or false value and displaying the ones that are true in a checked off checkbox and the false ones will be slightly opaque  */}
        {Object.entries(values).map(([key, value]) => (
          <PreferenceValue
            key={key}
            style={{ opacity: value === 'true' ? 1 : 0.5 }}
          >
            {key}
          </PreferenceValue>
        ))}
      </MultiPreferencePaper>
    </Container>
  );
};

export default MultiOptionPreference;
