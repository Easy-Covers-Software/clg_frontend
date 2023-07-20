import React, { useState } from "react";
import styled from "@emotion/styled";

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

const JobPostingTextInputField = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  padding: 2%;
  border: none;
  resize: none;
  ::placeholder {
    color: #e2e2e2; // Change this to the color you want
  }
`;

export default function JobPostingInput() {
  const { state, dispatch } = useGenerationSetupContext();
  const { jobPostingInput } = state;

  const [placeholder, setPlaceholder] = useState(
    "Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for..."
  );

  const handleChange = (e) => {
    dispatch({ type: "SET_JOB_POSTING_INPUT", payload: e.target.value });
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (jobPostingInput === "") {
      setPlaceholder(
        "Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for..."
      );
    }
  };

  return (
    <JobPostingTextInputField
      placeholder={placeholder}
      value={jobPostingInput}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
