import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

import styled from "@emotion/styled";

import { useGenerationContext } from "@/context/GenerationContext";

import { MediumReQueryInputStyledComponents } from "../ReQueryOptions.styles";
const { Container, FormInput, QuestionContainer, InputField } =
  MediumReQueryInputStyledComponents;

export default function MediumReQueryInput({ label }) {
  const { state, dispatch } = useGenerationContext();

  const {
    addSkillInput,
    insertKeywordInput,
    removeRedundancyInput,
    disableGenerateButton,
  } = state;

  const clearInput = () => {
    if (label === "Add Skill") {
      dispatch({ type: "SET_ADD_SKILL_INPUT", payload: "" });
    } else if (label === "Insert Keyword") {
      dispatch({ type: "SET_INSERT_KEYWORD_INPUT", payload: "" });
    } else if (label === "Remove Redundancy") {
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
    } else if (label === "Remove Redundancy") {
      dispatch({
        type: "SET_REMOVE_REDUNDANCY_INPUT",
        payload: event.target.value,
      });
    }
  };

  return (
    <Container>
      <FormInput variant="outlined">
        <QuestionContainer>
          <Typography variant="mediumRequeryLabel">{label}</Typography>

          <Tooltip title="Delete" placement="top">
            <InfoOutlinedIcon fontSize="small" sx={{ opacity: "40%" }} />
          </Tooltip>
        </QuestionContainer>

        <InputField
          id="email-input"
          variant="outlined"
          placeholder={
            label === "Add Skill"
              ? "'excel', 'python', etc."
              : label === "Insert Keyword"
              ? "'big data', 'clinical', etc."
              : "'I feel', 'I believe', etc."
          }
          size="small"
          value={
            label === "Add Skill"
              ? addSkillInput
              : label === "Insert Keyword"
              ? insertKeywordInput
              : removeRedundancyInput
          }
          // sx={{ opacity: '30%' }}
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
