import { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';

import { useGenerationContext } from '@/context/GenerationContext';

import { IntermediateAdjustmentInputStyledComponents } from '../AdvancedAdjustments.styles';
const { Container, FormInput, QuestionContainer, InputField } =
  IntermediateAdjustmentInputStyledComponents;

interface Props {
  label: string;
  inputValue: string;
  intermediateAdjustmentProps: any;
  disabled: boolean;
}

const IntermediateAdjustmentInput: FC<any> = ({
  label,
  inputValue,
  intermediateAdjustmentProps,
  disabled,
}) => {
  const clearInput = () => {
    if (label === 'Add Skill') {
      intermediateAdjustmentProps?.updateAddSkillInput('');
      intermediateAdjustmentProps?.toggleDisableInsertKeyword();
      intermediateAdjustmentProps?.toggleDisableRemoveRedundancy();
    } else if (label === 'Insert Keyword') {
      intermediateAdjustmentProps?.updateInsertKeywordInput('');
      intermediateAdjustmentProps?.toggleDisableRemoveRedundancy();
      intermediateAdjustmentProps?.toggleDisableAddSkill();
    } else if (label === 'Remove') {
      intermediateAdjustmentProps?.updateRemoveRedundancyInput('');
      intermediateAdjustmentProps?.toggleDisableInsertKeyword();
      intermediateAdjustmentProps?.toggleDisableAddSkill();
    }
  };

  console.log('intermediateAdjustmentProps', intermediateAdjustmentProps);

  const handleChange = (event) => {
    if (label === 'Add Skill') {
      intermediateAdjustmentProps?.updateAddSkillInput(event.target.value);
      intermediateAdjustmentProps?.updateIntermediateType(label);
    } else if (label === 'Insert Keyword') {
      intermediateAdjustmentProps?.updateInsertKeywordInput(event.target.value);
      intermediateAdjustmentProps?.updateIntermediateType(label);
    } else if (label === 'Remove') {
      intermediateAdjustmentProps?.updateRemoveRedundancyInput(
        event.target.value
      );
      intermediateAdjustmentProps?.updateIntermediateType(label);
    }
  };

  const getPlaceholderForLabel = (label: string) => {
    switch (label) {
      case 'Add Skill':
        return "'excel', 'python', etc.";
      case 'Insert Keyword':
        return "'big data', 'clinical', etc.";
      default:
        return "Remove all 'I' statements. ";
    }
  };

  return (
    <Container>
      <FormInput variant="outlined">
        <QuestionContainer>
          <Typography className="medium-requery-label">{label}</Typography>

          <Tooltip title="Delete" placement="top">
            <InfoOutlinedIcon fontSize="small" sx={{ opacity: '40%' }} />
          </Tooltip>
        </QuestionContainer>

        <InputField
          disabled={disabled}
          id="email-input"
          variant="outlined"
          placeholder={getPlaceholderForLabel(label)}
          size="small"
          value={inputValue}
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
                  sx={{ opacity: '30%' }}
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
};

export default IntermediateAdjustmentInput;
