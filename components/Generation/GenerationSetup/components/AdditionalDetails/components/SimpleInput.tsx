import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useGenerationContext } from "@/context/GenerationContext";
import { SimpleInputStyledComponents } from "../AdditionalDetails.styles";
const { Container, InputField } = SimpleInputStyledComponents;

interface SimpleInputProps {
  id: string;
}

export default function SimpleInput(props: SimpleInputProps) {
  const { id } = props;
  const { state, dispatch } = useGenerationContext();
  const { additionalDetails } = state;

  const [inputValue, setInputValue] = useState("");

  const clearInput = () => {
    setInputValue("");
  };

  const updateCurrentInputState = (currentInput) => {
    for (const [key, inputValue] of Object.entries(additionalDetails)) {
      if (key === id) {
        setInputValue(currentInput);
        dispatch({
          type: "SET_ADDITIONAL_DETAILS",
          payload: { [key]: currentInput },
        });
      }
    }
  };

  return (
    <Container>
      <InputField
        id="email-input"
        variant="outlined"
        placeholder={
          id === "simpleInput1"
            ? "Years of relevant experience..."
            : id === "simpleInput2"
            ? "Relevant Awards / Skills / Certifications..."
            : "Relevant Projects / Publications..."
        }
        size="small"
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateCurrentInputState(event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={clearInput}
                edge="end"
                sx={{ opacity: "30%" }}
              >
                <HighlightOffIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {/* </FormInput> */}
      <Tooltip
        title={
          id === "simpleInput1"
            ? "The years you worked most recently worked in the field of the job you are applying for"
            : id === "simpleInput2"
            ? "Any awards, skills, or certifications that you might have left out of your résumé but are applicable to the job you are applying for."
            : "Any projects or publications that you might have left out of your résumé but are applicable to the job you are applying for."
        }
        placement="top"
      >
        <InfoOutlinedIcon fontSize="medium" sx={{ opacity: "40%" }} />
      </Tooltip>
    </Container>
  );
}
