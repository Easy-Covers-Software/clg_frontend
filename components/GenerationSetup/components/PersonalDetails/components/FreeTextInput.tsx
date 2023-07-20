import React, { useState } from "react";
import styled from "@emotion/styled";

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

const FreeTextInputField = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  box-sizing: border-box;
  background-color: white;
  padding: 2%;
  border-top: 1px solid #006d4b;
  border-radius: 4px;
  margin-bottom: 2%;
  ::placeholder {
    color: #e2e2e2; // Change this to the color you want
  }
`;

export default function FreeTextInput() {
  const { state, dispatch } = useGenerationSetupContext();
  const { freeTextPersonalDetails } = state;

  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for..."
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
        "Either directly copy and paste the job posting you are applying for or provide your own description of the postion you are applying for..."
      );
    }
  };

  return (
    <FreeTextInputField
      placeholder={placeholder}
      value={freeTextPersonalDetails}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
