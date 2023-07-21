import React, { useState } from "react";
import styled from "@emotion/styled";

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

import { FreeTextInputStyledComponents } from "../PersonalDetails.styles";
const { TextArea } = FreeTextInputStyledComponents;

export default function FreeTextInput() {
  const { state, dispatch } = useGenerationSetupContext();
  const { freeTextPersonalDetails } = state;

  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Provide a description about your education, work experience, skills, and any other information that you think is relevant to your application..."
  );

  const handleChange = (e) => {
    dispatch({
      type: "SET_FREE_TEXT_PERSONAL_DETAILS",
      payload: e.target.value,
    });
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (value === "") {
      setPlaceholder(
        "Provide a description about your education, work experience, skills, and any other information that you think is relevant to your application..."
      );
    }
  };

  return (
    <TextArea
      placeholder={placeholder}
      value={freeTextPersonalDetails}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
