import React from "react";

import {
  TypographyColored,
  PersonalDetailsModeSwitchStyledComponents,
} from "../PersonalDetails.styles";
const { Container, SwitchStyled } = PersonalDetailsModeSwitchStyledComponents;

interface PersonalDetailsModeSwitchProps {
  mode: string;
  setMode: (mode: string) => void;
}

export default function PersonalDetailsModeSwitch(
  props: PersonalDetailsModeSwitchProps
) {
  const { mode, setMode } = props;

  const handleChange = () => {
    setMode(mode === "upload" ? "text" : "upload");
  };

  return (
    <Container>
      <TypographyColored>Upload</TypographyColored>
      <SwitchStyled
        checked={mode === "text"}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <TypographyColored>Free Text</TypographyColored>
    </Container>
  );
}
