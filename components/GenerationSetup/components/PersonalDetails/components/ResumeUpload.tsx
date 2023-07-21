"use client";

import React, { useState } from "react";
import UploadOption from "./UploadOption";
import { ResumeUploadStyledComponents } from "../PersonalDetails.styles";
const { Container, DragDropContainer } = ResumeUploadStyledComponents;

export default function ResumeUploader() {
  return (
    <Container>
      <DragDropContainer>
        <UploadOption
          label="Upload From Computer"
          accept=".pdf,.doc,.docx,.txt"
        />
      </DragDropContainer>

      {/* <AlternativeUploadContainer>
        <AlternativeUploadButton>Upload From Indeed</AlternativeUploadButton>

        <AlternativeUploadButton>Upload From LinkedIn</AlternativeUploadButton>
      </AlternativeUploadContainer> */}
    </Container>
  );
}
