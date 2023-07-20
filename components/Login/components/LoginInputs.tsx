import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useAuth } from "@/context/AuthContext";

import styled from "@emotion/styled";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
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

export default function LoginInputs() {
  const {
    state,
    dispatch,
    clearInput,
    handleClickShowPassword,
    handleClickShowPasswordRepeat,
  } = useAuth();
  const {
    email,
    password,
    showPassword,
    newPasswordRepeat,
    createAccountEasyCovers,
    showPasswordRepeat,
  } = state;

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

  console.log("email", email);

  return (
    <Container component="form">
      <FormInput variant="outlined">
        <InputField
          id="email-input"
          variant="outlined"
          placeholder="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: "SET_EMAIL", payload: event.target.value });
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
        <InputField
          id="password-input"
          variant="outlined"
          placeholder="Password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: "SET_PASSWORD", payload: event.target.value });
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormInput>

      {createAccountEasyCovers && (
        <FormInput variant="outlined">
          <InputField
            id="password-input-repeat"
            variant="outlined"
            placeholder="Re-enter Password"
            value={newPasswordRepeat}
            type={showPasswordRepeat ? "text" : "password"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: "SET_NEW_PASSWORD_REPEAT",
                payload: event.target.value,
              });
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordRepeat}
                    onMouseDown={handleMouseDownPasswordRepeat}
                    edge="end"
                  >
                    {showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
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
