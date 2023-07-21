import React, { useState } from "react";
import styled from "@emotion/styled";
import { useGenerationSetupContext } from "@/context/GenerationSetupContext";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { UploadOptionStyledComponents } from "../PersonalDetails.styles";
const { Container, FileUploadInput, Dropzone, Label } =
  UploadOptionStyledComponents;

export default function UploadOption({ label, accept }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  const { state, handleFileChange } = useGenerationSetupContext();
  const { uploadedResumeFile } = state;

  const [dragging, setDragging] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const fileDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFileChange(e);
  };

  return (
    <Container>
      <FileUploadInput
        id={id}
        type="file"
        onChange={handleFileChange}
        accept={accept}
      />
      <Label htmlFor={id}>
        <Dropzone
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          {uploadedResumeFile && uploadedResumeFile.name !== ""
            ? uploadedResumeFile.name
            : "Drag and drop your files here or click to select files"}
        </Dropzone>
      </Label>
    </Container>
  );
}
