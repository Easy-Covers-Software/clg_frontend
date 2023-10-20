import React, { useState } from 'react';

import { useGenerationContext } from '@/context/GenerationContext';

import { FreeTextInputStyledComponents } from '../PersonalDetails.styles';
const { TextArea } = FreeTextInputStyledComponents;

export default function FreeTextInput() {
  const { state } = useGenerationContext();
  const { generationSetupProps } = state;
  const [placeholder, setPlaceholder] = useState(
    'Provide a description about your education, work experience, skills, and any other information that you think is relevant to your application...'
  );

  const handleChange = (e) => {
    generationSetupProps?.updateFreeText(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (generationSetupProps?.freeText === '') {
      setPlaceholder(
        'Provide a description about your education, work experience, skills, and any other information that you think is relevant to your application...'
      );
    }
  };

  return (
    <TextArea
      placeholder={placeholder}
      value={generationSetupProps?.freeText}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
