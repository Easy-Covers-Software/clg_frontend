import React, { useState } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const AdditionalDetailsFreeTextField = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  box-sizing: border-box;
  background-color: #f8f8ff;
  padding: 2%;
  min-width: 100%;
  max-width: 100%;
  border-top: 1px solid #006d4b;
  border-radius: 4px;
  ::placeholder {
    color: #e2e2e2; // Change this to the color you want
  }
`;

export default function AdditionalDetailsFreeText() {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(
    'Add any information that is not in your resume that you think is relevant to your application',
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
    <>
      <Typography ml={1} mb={-2}>
        Anything else you'd like to add?
      </Typography>
      <AdditionalDetailsFreeTextField
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </>
  );
}
