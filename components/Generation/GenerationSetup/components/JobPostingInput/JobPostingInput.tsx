import React, { useState } from "react";
import styled from "@emotion/styled";

import { useGenerationContext } from "@/context/GenerationContext";

import { JobPostingTextInputField } from "./JobPostingInput.styles";

export default function JobPostingInput() {
  const { state, dispatch } = useGenerationContext();
  const { jobPosting } = state;

  const [placeholder, setPlaceholder] = useState(
    "Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for..."
  );

  const handleChange = (e) => {
    dispatch({ type: "SET_JOB_POSTING", payload: e.target.value });
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (jobPosting === "") {
      setPlaceholder(
        "Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for..."
      );
    }
  };

  return (
    <JobPostingTextInputField
      placeholder={placeholder}
      value={jobPosting}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
