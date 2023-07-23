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
      <TypographyColored
        variant="personalDetailsSwitch"
        selected={mode === "upload"}
        ml={"3%"}
      >
        Upload
      </TypographyColored>
      <SwitchStyled
        checked={mode === "text"}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <TypographyColored
        variant="personalDetailsSwitch"
        selected={mode === "text"}
      >
        Free Text
      </TypographyColored>
    </Container>
  );
}
