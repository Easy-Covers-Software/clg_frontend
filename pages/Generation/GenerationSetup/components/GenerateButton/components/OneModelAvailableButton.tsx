import { FC } from 'react';

import { Tooltip } from '@mui/material';

import { OneModelAvailableButtonStyledComponents } from '../GenerateButton.styles';
const { Container, GenerateButton } = OneModelAvailableButtonStyledComponents;

import { GenerationSetupProps } from '@/Types/GenerationContext.types';
import { LoggedInProps, Trackers } from '@/Types/AuthContext.types';

const getModelAvailable = (
  isAuthenticated,
  num_gpt3_generations_available,
  num_gpt4_generations_available
) => {
  if (!isAuthenticated) {
    return '-1';
  } else if (num_gpt3_generations_available > 0) {
    return 'gpt-3.5-turbo';
  } else if (num_gpt4_generations_available > 0) {
    return 'gpt-4';
  } else {
    return '0';
  }
};

interface Props {
  generationSetupProps: GenerationSetupProps;
  loggedInProps: LoggedInProps;
  trackers: Trackers;
  handleGenerateCoverLetter: (model: string) => void;
  disabled: boolean;
}

const OneModelAvailableButton: FC<Props> = ({
  generationSetupProps,
  loggedInProps,
  trackers,
  handleGenerateCoverLetter,
  disabled,
}) => {
  return (
    <>
      <Tooltip
        style={{
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
            disabled={disabled}
            onClick={() => {
              trackers?.updateMobileMode('results');
              handleGenerateCoverLetter(
                getModelAvailable(
                  loggedInProps?.isAuthenticated,
                  loggedInProps?.gpt3_generations_available,
                  loggedInProps?.gpt4_generations_available
                )
              );
            }}
          >
            Generate
          </GenerateButton>
        </Container>
      </Tooltip>
    </>
  );
};

export default OneModelAvailableButton;
