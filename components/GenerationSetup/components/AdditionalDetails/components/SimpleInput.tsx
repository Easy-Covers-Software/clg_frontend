import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

import styled from '@emotion/styled';

const Container = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const FormInput = styled(FormControl)`
  width: 95%;
  padding-right: 0;
`;

const InputField = styled(TextField)`
  border-radius: 4px;
  border: 1px solid #006d4b;
  // background-color: var(--theme-main, #f5f5f5);
  background-color: #fff;
`;

const QuestionContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
`;

export default function SimpleInput(props) {
  const [value, setValue] = React.useState('');
  const [value2, setValue2] = React.useState('');

  const clearInput = () => {
    setValue('');
  };

  return (
    <Container>
      <FormInput variant="outlined">
        <QuestionContainer>
          <Typography fontSize={'0.7rem'} mt={0.5}>
            Years of your most relevant experience
          </Typography>

          <Tooltip title="Delete" placement="top">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </QuestionContainer>

        <InputField
          id="email-input"
          variant="outlined"
          placeholder="2021-present"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disableTouchRipple
                  aria-label="toggle password visibility"
                  onClick={clearInput}
                  edge="end"
                >
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormInput>

      <FormInput variant="outlined">
        <QuestionContainer>
          <Typography fontSize={'0.7rem'} mt={0.5}>
            Years of your most relevant experience
          </Typography>

          <Tooltip title="Delete" placement="top">
            <InfoIcon fontSize="small" />
          </Tooltip>
        </QuestionContainer>
        <InputField
          id="email-input"
          variant="outlined"
          placeholder="Email"
          value={value2}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue2(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disableTouchRipple
                  aria-label="toggle password visibility"
                  onClick={clearInput}
                  edge="end"
                >
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormInput>
    </Container>
  );
}
