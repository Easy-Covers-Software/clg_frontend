import React, { useState } from "react";
import styled from "@emotion/styled";
import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

const FileUploadInput = styled.input`
  display: none;
`;

const Dropzone = styled.div`
  width: 100%;
  height: 100px;
  border: 2px dashed #888;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Label = styled.label`
  display: flex;
  width: 80%;
  white-space: nowrap;
`;

export default function UploadOption({ label, accept }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  const { handleFileChange } = useGenerationSetupContext();

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
    <>
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
          Drag and drop your files here or click to select files
        </Dropzone>
      </Label>
    </>
  );
}
