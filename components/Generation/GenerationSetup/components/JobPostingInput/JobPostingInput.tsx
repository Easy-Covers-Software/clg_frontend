import React, { useState } from 'react';
import { useGenerationContext } from '@/context/GenerationContext';
import { JobPostingTextInputField } from './JobPostingInput.styles';

export default function JobPostingInput() {
  const { state } = useGenerationContext();
  const { generationSetupProps } = state;

  const [placeholder, setPlaceholder] = useState(
    'Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for...'
  );

  const handleChange = (e) => {
    generationSetupProps?.updateJobPosting(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (generationSetupProps?.jobPosting === '') {
      setPlaceholder(
        'Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for...'
      );
    }
  };

  return (
    <JobPostingTextInputField
      placeholder={placeholder}
      value={generationSetupProps?.jobPosting}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
