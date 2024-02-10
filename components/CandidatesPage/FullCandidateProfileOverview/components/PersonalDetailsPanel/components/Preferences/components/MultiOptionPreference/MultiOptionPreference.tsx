import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Paper, Typography } from '@mui/material';
import React from 'react';

const Container = styled(Grid2)`
  // height: 10vh;
  // width: 16vw;
  width: 33%;
  height: 16vh;
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
  height: 100%;
  // width: 18vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #13d0b7;
`;

const PreferenceValue = styled(Typography)`
  font-size: 1rem;
`;

type MultiOptionPreferenceValues = {
  [key: string]: string;
};

interface Props {
  type: string;
  values: MultiOptionPreferenceValues | any;
}

const MultiOptionPreference: React.FC<Props> = ({ type, values }) => {
  return (
    <Container>
      <Header>{type}</Header>
      <MultiPreferencePaper>
        {values.map((value: any) => {
          return (
            <PreferenceValue
              key={Object.keys(value)[0]}
              style={{ opacity: Object.values(value)[0] === 'true' ? 1 : 0.5 }}
            >
              {Object.keys(value)[0]}: {Object.values(value)[0]}
            </PreferenceValue>
          );
        })}
      </MultiPreferencePaper>
    </Container>
  );
};

export default MultiOptionPreference;
