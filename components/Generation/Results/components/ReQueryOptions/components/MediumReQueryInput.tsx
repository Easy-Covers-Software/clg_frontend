import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

import { useGenerationContext } from "@/context/GenerationContext";

import { MediumReQueryInputStyledComponents } from "../ReQueryOptions.styles";
const { Container, FormInput, QuestionContainer, InputField } =
  MediumReQueryInputStyledComponents;

export default function MediumReQueryInput({ label }) {
  const { state, dispatch } = useGenerationContext();

  const { addSkillInput, insertKeywordInput, removeRedundancyInput } = state;

  const clearInput = () => {
    if (label === "Add Skill") {
      dispatch({ type: "SET_ADD_SKILL_INPUT", payload: "" });
    } else if (label === "Insert Keyword") {
      dispatch({ type: "SET_INSERT_KEYWORD_INPUT", payload: "" });
    } else if (label === "Remove") {
      dispatch({ type: "SET_REMOVE_REDUNDANCY_INPUT", payload: "" });
    }
  };

  const handleChange = (event) => {
    if (label === "Add Skill") {
      dispatch({ type: "SET_ADD_SKILL_INPUT", payload: event.target.value });
    } else if (label === "Insert Keyword") {
      dispatch({
        type: "SET_INSERT_KEYWORD_INPUT",
        payload: event.target.value,
      });
    } else if (label === "Remove") {
      dispatch({
        type: "SET_REMOVE_REDUNDANCY_INPUT",
        payload: event.target.value,
      });
    }
  };

  const getPlaceholderForLabel = (label: string) => {
    switch (label) {
      case "Add Skill":
        return "'excel', 'python', etc.";
      case "Insert Keyword":
        return "'big data', 'clinical', etc.";
      default:
        return "'I feel', 'I believe', etc.";
    }
  };

  const getValueForLabel = (label: string) => {
    switch (label) {
      case "Add Skill":
        return addSkillInput;
      case "Insert Keyword":
        return insertKeywordInput;
      default:
        return removeRedundancyInput;
    }
  };

  return (
    <Container>
      <FormInput variant="outlined">
        <QuestionContainer>
          <Typography className="medium-requery-label">{label}</Typography>

          <Tooltip title="Delete" placement="top">
            <InfoOutlinedIcon fontSize="small" sx={{ opacity: "40%" }} />
          </Tooltip>
        </QuestionContainer>

        <InputField
          id="email-input"
          variant="outlined"
          placeholder={getPlaceholderForLabel(label)}
          size="small"
          value={getValueForLabel(label)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
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
      </FormInput>
    </Container>
  );
}
