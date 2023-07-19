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

import { useCoverLetterResultsContext } from "@/context/ResultsContext";

const Container = styled(Grid)`
  display: flex;
  align-items: center;
  width: 14vw;
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
  // background-color: #f8f8ff;
`;

const QuestionContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
`;

export default function MediumReQueryInput({ label }) {
  const {
    makeIntermediateAdjustment,
    addSkillInput,
    insertKeywordInput,
    removeRedundancyInput,
    setAddSkillInput,
    setInsertKeywordInput,
    setRemoveRedundancyInput,
  } = useCoverLetterResultsContext();

  const [value, setValue] = useState("");

  const clearInput = () => {
    if (label === "Add Skill") {
      setAddSkillInput("");
    } else if (label === "Insert Keyword") {
      setInsertKeywordInput("");
    } else if (label === "Remove Redundancy") {
      setRemoveRedundancyInput("");
    }
  };

  const handleChange = (event) => {
    if (label === "Add Skill") {
      setAddSkillInput(event.target.value);
    } else if (label === "Insert Keyword") {
      setInsertKeywordInput(event.target.value);
    } else if (label === "Remove Redundancy") {
      setRemoveRedundancyInput(event.target.value);
    }
  };

  return (
    <Container>
      <FormInput variant="outlined">
        <QuestionContainer>
          <Typography fontSize={"0.7rem"} mt={0.5}>
            {label}
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
