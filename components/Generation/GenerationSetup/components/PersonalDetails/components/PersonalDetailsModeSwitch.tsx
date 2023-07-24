import React from "react";

import { useCoverLetterResultsContext } from "@/context/ResultsContext";
import { Typography } from "@mui/material";
import { PersonalDetailsModeSwitchStyledComponents } from "../PersonalDetails.styles";
const { Container, SwitchStyled } = PersonalDetailsModeSwitchStyledComponents;

interface PersonalDetailsModeSwitchProps {
  mode: string;
  setMode: (mode: string) => void;
}

export default function PersonalDetailsModeSwitch(
  props: PersonalDetailsModeSwitchProps
) {
  const { mode, setMode } = props;

  const { state } = useCoverLetterResultsContext();
  const { isUsingLastUploadedResume } = state;

  const handleChange = () => {
    setMode(mode === "upload" ? "text" : "upload");
  };

  return (
    <Container
      style={{
        opacity: isUsingLastUploadedResume ? 0.3 : 1,
      }}
    >
      <Typography
        variant="personalDetailsSwitch"
        selected={mode === "upload"}
        ml={"3%"}
      >
        Upload
      </Typography>
      <SwitchStyled
        checked={mode === "text"}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography variant="personalDetailsSwitch" selected={mode === "text"}>
        Free Text
      </Typography>
    </Container>
  );
}
