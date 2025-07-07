import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Paper, Typography } from '@mui/material';
import React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

const Container = styled(Grid2)`
  // height: 10vh;
  // width: 16vw;
  width: 30%;
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

const ValueContainer = styled(Grid2)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  height: 100%;
`;

type MultiOptionPreferenceValues = {
  [key: string]: string;
};

interface Props {
  type: string;
  values: MultiOptionPreferenceValues | any;
}

const MultiOptionPreference: React.FC<Props> = ({ type, values }) => {
  const determineIcon = (value: any) => {
    return value === 'true' ? (
      <CheckCircleOutlineIcon fontSize="small" />
    ) : (
      <ClearIcon fontSize="small" />
    );
  };

  return (
    <Container>
      <Header>{type}</Header>
      <MultiPreferencePaper>
        {values.map((value: any) => {
          return (
            <ValueContainer>
              <PreferenceValue
                key={Object.keys(value)[0]}
                style={{
                  opacity: Object.values(value)[0] === 'true' ? 1 : 0.5,
                }}
              >
                {`${Object.keys(value)[0]}: `}
              </PreferenceValue>

              {determineIcon(Object.values(value)[0])}
            </ValueContainer>
          );
        })}
      </MultiPreferencePaper>
    </Container>
  );
};

export default MultiOptionPreference;
