import React, { useState } from "react";
import styled from "@emotion/styled";
import { useGenerationContext } from "@/context/GenerationContext";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";

import { UploadOptionStyledComponents } from "../PersonalDetails.styles";
const { Container, FileUploadInput, Dropzone, Label } =
  UploadOptionStyledComponents;

export default function UploadOption({ label, accept }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  const { state, handleFileChange } = useGenerationContext();
  const { resume } = state;

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

  const getDisplayText = (resume: { name?: string }) => {
    if (resume && resume.name !== "") {
      return resume.name;
    }
    return "Drag and drop your files here or click to select files";
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
          <Typography className="drag-drop">
            {getDisplayText(resume)}
          </Typography>
        </Dropzone>
      </Label>
    </Container>
  );
}
