import { useGenerationContext } from "@/context/GenerationContext";
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

  const { state } = useGenerationContext();
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
        className={`personal-details-switch ${
          mode === "upload" ? "selected" : ""
        }`}
      >
        Upload
      </Typography>
      <SwitchStyled
        checked={mode === "text"}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography
        className={`personal-details-switch ${
          mode === "text" ? "selected" : ""
        }`}
      >
        Free Text
      </Typography>
    </Container>
  );
}
