import { FC } from 'react';
import Divider from '@mui/material/Divider';
import { Typography, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

import { useGenerationContext } from '@/context/GenerationContext';
import { useAuth } from '@/context/AuthContext';

import { isOriginalGenerationEdited } from '@/Utils/utils';

import { SimpleAdjustmentsButtonGroupStyledComponents } from '../SimpleAdjustments.styles';
const { Container, ButtonContainer } =
  SimpleAdjustmentsButtonGroupStyledComponents;

/*
  buttonLabel (this probably needs to be updated):
    - "1" = "Years of relevant experience"
    - "2" = "Relevant Awards / Skills / Certifications"
    - "3" = "Projects / Publications / Languages"
*/

interface Props {
  buttonLabel: string;
  disabled: boolean;
  handleDecreaseSimpleAdjustment: (buttonLabel: string) => Promise<void>;
  handleIncreaseSimpleAdjustment: (buttonLabel: string) => void;
}

const SimpleAdjustmentButtonGroup: FC<Props> = ({
  buttonLabel,
  disabled,
  handleDecreaseSimpleAdjustment,
  handleIncreaseSimpleAdjustment,
}) => {
  return (
    <Container>
      <Typography className="simple-adjustment-label">{buttonLabel}</Typography>
      <ButtonContainer>
        <IconButton
          disabled={disabled}
          onClick={() => {
            handleDecreaseSimpleAdjustment(buttonLabel);
          }}
        >
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>

        <Divider orientation="vertical" />

        <IconButton
          disabled={disabled}
          onClick={() => {
            handleIncreaseSimpleAdjustment(buttonLabel);
          }}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
};

export default SimpleAdjustmentButtonGroup;
