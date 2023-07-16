"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import styled from "@emotion/styled";

import PersonalDetailsModeSwitch from "./components/PersonalDetailsModeSwitch";
import FreeTextInput from "./components/FreeTextInput";
import ResumeUploader from "./components/ResumeUpload";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 2%;
  height: ${({ mode }) => (mode === "upload" ? "auto" : "100%")};
  background-color: white;
  border: none;
  resize: none;
  z-index: -10;
`;
export default function PersonalDetails() {
  const [mode, setMode] = React.useState("upload"); // 'resume' or 'text'

  return (
    <Container mode={mode}>
      <PersonalDetailsModeSwitch mode={mode} setMode={setMode} />

      {mode === "upload" ? <ResumeUploader /> : <FreeTextInput />}
    </Container>
  );
}
