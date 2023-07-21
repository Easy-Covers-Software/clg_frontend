import React, { useState } from "react";
import styled from "@emotion/styled";

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

import { JobPostingTextInputField } from "./JobPostingInput.styles";

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
