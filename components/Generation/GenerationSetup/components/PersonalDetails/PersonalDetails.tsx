"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import styled from "@emotion/styled";

import { Container } from "./PersonalDetails.styles";

import PersonalDetailsModeSwitch from "./components/PersonalDetailsModeSwitch";
import FreeTextInput from "./components/FreeTextInput";
import ResumeUploader from "./components/ResumeUpload";

export default function PersonalDetails() {
  const [mode, setMode] = React.useState("upload"); // 'resume' or 'text'

  return (
    <Container mode={mode}>
      <PersonalDetailsModeSwitch mode={mode} setMode={setMode} />

      {mode === "upload" ? <ResumeUploader /> : <FreeTextInput />}
    </Container>
  );
}
