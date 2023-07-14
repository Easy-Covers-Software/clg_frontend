import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

import Button from "@mui/material/Button";

import styled from "@emotion/styled";

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

const Container = styled(Grid)`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const FormInput = styled(FormControl)`
  width: 100%;
  padding-right: 0;
`;

const InputField = styled(TextField)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  background-color: #f8f8ff;
`;

const QuestionContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
`;

interface SimpleInputProps {
  id: string;
}

export default function SimpleInput(props: SimpleInputProps) {
  const { id } = props;
  const { additionalDetails, setAdditionalDetails } =
    useGenerationSetupContext();

  const [inputValue, setInputValue] = React.useState("");

  const clearInput = () => {
    setInputValue("");
  };

  const updateCurrentInputState = (currentInput) => {
    for (const [key, inputValue] of Object.entries(additionalDetails)) {
      if (key === id) {
        setInputValue(currentInput);
        setAdditionalDetails({ ...additionalDetails, [key]: currentInput });
      }
    }
  };

  return (
    <Container>
      {/* <FormInput variant="outlined"> */}
      <QuestionContainer>
        <Typography fontSize={"0.7rem"} mt={0.5}>
          {/* Years of your most relevant experience */}
          {id}
        </Typography>

        <Tooltip title="Delete" placement="top">
          <InfoOutlinedIcon fontSize="small" sx={{ opacity: "40%" }} />
        </Tooltip>
      </QuestionContainer>

      <InputField
        id="email-input"
        variant="outlined"
        placeholder="2021-present"
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
    </Container>
  );
}
