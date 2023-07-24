import React, { useState } from "react";
import styled from "@emotion/styled";

import { useGenerationContext } from "@/context/GenerationContext";

import { FreeTextInputStyledComponents } from "../PersonalDetails.styles";
const { TextArea } = FreeTextInputStyledComponents;

export default function FreeTextInput() {
  const { state, dispatch } = useGenerationContext();
  const { freeText } = state;

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
      value={freeText}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
