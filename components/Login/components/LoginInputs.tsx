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
    <Container component='form'>
      <Typography
        align='center'
        style={{
          color: '#006b4d',
          fontSize: '1.2rem',
          marginBottom: '1rem',
        }}
      >
        For a limited time new users get 2 free cover letters and 6 free
        adjustments! Sign up now!
      </Typography>
      <FormInput variant='outlined'>
        <InputField
          id='email-input'
          variant='outlined'
          placeholder='Email'
          value={accountAuthProps?.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            //--* AUTH UPDATE *--//
            accountAuthProps?.updateEmail(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  disableTouchRipple
                  aria-label='toggle password visibility'
                  onClick={accountAuthProps?.clearEmail}
                  edge='end'
                >
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormInput>

      {accountAuthProps?.action !== 'forgot' && (
        <FormInput variant='outlined'>
          <InputField
            id='password-input'
            variant='outlined'
            placeholder='Password'
            value={accountAuthProps?.password}
            type={accountAuthProps?.showPassword ? 'text' : 'password'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              accountAuthProps?.updatePassword(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => {
                      accountAuthProps?.toggleShowPassword();
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {accountAuthProps?.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormInput>
      )}

      {accountAuthProps?.action === 'create' && (
        <FormInput variant='outlined'>
          <InputField
            id='password-input-repeat'
            variant='outlined'
            placeholder='Re-enter Password'
            value={accountAuthProps?.newPasswordRepeat}
            type={accountAuthProps?.showPasswordRepeat ? 'text' : 'password'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              accountAuthProps?.updateNewPasswordRepeat(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => {
                      accountAuthProps?.toggleShowPasswordRepeat();
                    }}
                    onMouseDown={handleMouseDownPasswordRepeat}
                    edge='end'
                  >
                    {accountAuthProps?.showPasswordRepeat ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormInput>
      )}
    </Container>
  );
}
