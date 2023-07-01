import * as React from 'react';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

const Container = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #006d4b;
  border-left: 1px solid #006d4b;
  border-right: 1px solid #006d4b;
  border-radius: 8px 8px 0 0;
  padding: 0.5%;
  width: 40%;
  white-space: nowrap;
  background-color: #f8f8ff;
  z-index: 1;
  border-bottom: 0;
`;

const SwitchStyled = styled(Switch)(() => ({
  width: 70,
  height: 26,
  padding: 0,
  margin: 8,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(42px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#13d0b7',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: 'lightgray',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#13d0b7',
    opacity: 1,
  },
}));

interface PersonalDetailsModeSwitchProps {
  mode: string;
  setMode: (mode: string) => void;
}

export default function PersonalDetailsModeSwitch(
  props: PersonalDetailsModeSwitchProps,
) {
  const { mode, setMode } = props;

  const handleChange = () => {
    setMode(mode === 'upload' ? 'text' : 'upload');
  };

  return (
    <Container>
      <Typography>Upload</Typography>
      <SwitchStyled
        checked={mode === 'text'}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Typography>Free Text</Typography>
    </Container>
  );
}
