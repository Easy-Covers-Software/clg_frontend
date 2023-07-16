import React, { useState } from "react";
import styled from "@emotion/styled";
import { useGenerationSetupContext } from "@/context/GenerationSetupContext";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Container = styled(Grid)`
  height: 100%;
  width: 100%;
  border: 2px dashed #888;
  display: flex;
  background-color: white;
  border-radius: 4px;
`;

const FileUploadInput = styled.input`
  display: none;
`;

const Dropzone = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    background-color: #f5f5f5;
  }
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  white-space: nowrap;
`;

export default function UploadOption({ label, accept }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  const { handleFileChange, uploadedResumeFile } = useGenerationSetupContext();

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
