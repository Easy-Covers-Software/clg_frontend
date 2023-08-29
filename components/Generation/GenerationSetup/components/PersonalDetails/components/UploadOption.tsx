import React, { useState } from 'react';
import { useGenerationContext } from '@/context/GenerationContext';
import { Typography } from '@mui/material';

import { CoverLetterApiMethods } from '@/Utils/utils';
const { uploadResume } = CoverLetterApiMethods;

import { UploadOptionStyledComponents } from '../PersonalDetails.styles';
import {
  APIResponse,
  ResumeUploadApiResponse,
} from '@/Types/ApiResponse.types';
const { Container, FileUploadInput, Dropzone, Label } =
  UploadOptionStyledComponents;

export default function UploadOption({ label, accept }) {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  const { state } = useGenerationContext();
  const { additionalDetails, generationSetupProps } = state;

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

  const fileDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    generationSetupProps?.updateResume(e);
    await handleUploadResume();
  };

  const handleChange = async (e) => {
    generationSetupProps?.updateResume(e.target.files[0]);
    await handleUploadResume(e.target.files[0]);
  };

  const handleUploadResume = async (file: File): Promise<void> => {
    const response: APIResponse<ResumeUploadApiResponse> = await uploadResume(
      file,
      generationSetupProps?.freeText,
      additionalDetails?.simpleInput1,
      additionalDetails?.simpleInput2,
      additionalDetails?.simpleInput3,
      additionalDetails?.openEndedInput
    );
  };

  const getDisplayText = (resume: { name?: string }) => {
    if (resume && resume.name !== '') {
      return resume.name;
    }
    return 'Drag and drop your files here or click to select files';
  };

  return (
    <Container>
      <FileUploadInput
        id={id}
        type='file'
        onChange={handleChange}
        accept={accept}
      />
      <Label htmlFor={id}>
        <Dropzone
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <Typography className='drag-drop'>
            {getDisplayText(generationSetupProps?.resume)}
          </Typography>
        </Dropzone>
      </Label>
    </Container>
  );
}
