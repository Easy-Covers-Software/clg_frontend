import React, { useState } from "react";
import Typography from "@mui/material/Typography";

import { AdditionalDetailsFreeTextStyledComponents } from "../AdditionalDetails.styles";
const { AdditionalDetailsFreeTextField } =
  AdditionalDetailsFreeTextStyledComponents;

export default function AdditionalDetailsFreeText() {
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "Add any information that is not in your resume that you think is relevant to your application"
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (value === "") {
      setPlaceholder(
        "Add any information that is not in your resume that you think is relevant to your application"
      );
    }
  };

  return (
    <>
      <Typography className="additional-details-anything-else">
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
