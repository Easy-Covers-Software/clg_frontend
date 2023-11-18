import { FC } from 'react';

import { Tooltip } from '@mui/material';

import { TwoModelsAvailableButtonStyledComponents } from '../GenerateButton.styles';
const { Container, GenerateButton } = TwoModelsAvailableButtonStyledComponents;

import { GenerationSetupProps } from '@/Types/GenerationContext.types';
import { LoggedInProps, Trackers } from '@/Types/AuthContext.types';

interface Props {
  generationSetupProps: GenerationSetupProps;
  loggedInProps: LoggedInProps;
  trackers: Trackers;
  handleGenerateCoverLetter: (model: string) => void;
  disabled: boolean;
}

const TwoModelsAvailableButton: FC<Props> = ({
  generationSetupProps,
  loggedInProps,
  trackers,
  handleGenerateCoverLetter,
  disabled,
}) => {
  return (
    <>
      <Tooltip
        sx={{
          fontSize: '1.2rem',
        }}
        title={
          disabled
            ? 'The Job Posting and Personal Details Sections are Required for Generation'
            : ''
        }
      >
        <Container>
          <GenerateButton
            onClick={() => {
              loggedInProps?.updateUser();
              trackers?.updateMobileMode('results');
              handleGenerateCoverLetter('gpt-3.5-turbo');
            }}
            disabled={disabled}
          >
            Generate GPT-3
          </GenerateButton>
        </Container>
      </Tooltip>

      <Tooltip
        style={{
          fontSize: '2rem',
        }}
        title={
          disabled
            ? 'The Job Posting and Personal Details Sections are Required for Generation'
            : ''
        }
      >
        <Container>
          <GenerateButton
            onClick={() => {
              loggedInProps?.updateUser();
              trackers?.updateMobileMode('results');
              handleGenerateCoverLetter('gpt-4');
            }}
            disabled={disabled}
          >
            Generate GPT-4
          </GenerateButton>
        </Container>
      </Tooltip>
    </>
  );
};

export default TwoModelsAvailableButton;
