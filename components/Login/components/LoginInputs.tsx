import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { useAuth } from "@/context/AuthContext";

import { LoginInputsStyledComponents } from "../LoginDialog.styles";
const { Container, FormInput, InputField } = LoginInputsStyledComponents;

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
    forgotPassword,
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

      {!forgotPassword && (
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormInput>
      )}

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
                    {showPasswordRepeat ? <Visibility /> : <VisibilityOff />}
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
