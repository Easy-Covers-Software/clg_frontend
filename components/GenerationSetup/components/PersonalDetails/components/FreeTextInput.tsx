import React, { useState } from 'react';
import styled from '@emotion/styled';

const FreeTextInputField = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  box-sizing: border-box;
  background-color: #f8f8ff;
  padding: 2%;
  border-top: 1px solid #006d4b;
  border-radius: 4px;
  margin-bottom: 2%;
  ::placeholder {
    color: #e2e2e2; // Change this to the color you want
  }
`;

export default function FreeTextInput() {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(
    'Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for...',
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (value === '') {
      setPlaceholder(
        'Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for...',
      );
    }
  };

  return (
    <FreeTextInputField
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
