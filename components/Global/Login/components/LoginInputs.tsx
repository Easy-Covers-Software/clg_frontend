import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/context/AuthContext';

import { LoginInputsStyledComponents } from '../LoginDialog.styles';
const { Container, FormInput, InputField } = LoginInputsStyledComponents;



const EmailInputField = ({ accountAuthProps }) => (
  <InputField
    id="email-input"
    variant="outlined"
    placeholder="Email"
    value={accountAuthProps?.email}
    onChange={(event) => accountAuthProps?.updateEmail(event.target.value)}
    InputProps={{
      style: {
        padding: '1% 0',
        paddingRight: '5%',
        fontSize: '1.3rem',
      },
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            disableTouchRipple
            aria-label="toggle password visibility"
            onClick={accountAuthProps?.clearEmail}
            edge="end"
          >
            <HighlightOffIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);


const PasswordInputField = ({ accountAuthProps, handleMouseDownPassword }) => (
  <InputField
    id="password-input"
    variant="outlined"
    placeholder="Password"
    type={accountAuthProps?.showPassword ? 'text' : 'password'}
    value={accountAuthProps?.password}
    onChange={(event) => accountAuthProps?.updatePassword(event.target.value)}
    InputProps={{
      style: {
        padding: '1% 0',
        paddingRight: '5%',
        fontSize: '1.3rem',
      },
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={accountAuthProps?.toggleShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {accountAuthProps?.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);




export default function LoginInputs() {
  const { state } = useAuth();
  const { accountAuthProps } = state;

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseDownPasswordRepeat = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container component="form">
      {/* <FormInput variant="outlined"> */}
        <EmailInputField accountAuthProps={accountAuthProps} />
      {/* </FormInput> */}
  
      {accountAuthProps?.action !== 'forgot' && (
        // <FormInput variant="outlined">
          <PasswordInputField 
            accountAuthProps={accountAuthProps} 
            handleMouseDownPassword={handleMouseDownPassword} 
          />
        // </FormInput>
      )}
    </Container>
  )
}
