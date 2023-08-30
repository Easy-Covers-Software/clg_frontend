'use client';

// React-related imports
import { useState, useEffect } from 'react';

import { Typography } from '@mui/material';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  SubContainer,
  CheckboxIconInComplete,
  CheckboxIconComplete,
} from './GenerationSetup.styles';

import GenerateButtons from './components/GenerateButton/GenerateButton';

// Custom Component Imports
import JobPostingInput from './components/JobPostingInput/JobPostingInput';
import PersonalDetails from './components/PersonalDetails/PersonalDetails';
import AdditionalDetails from './components/AdditionalDetails/AdditionalDetails';

import { Helpers } from '@/Utils/utils';
const { checkAdditionalDetails } = Helpers;

// Context Imports
import { useAuth } from '@/context/AuthContext';
import { useGenerationContext } from '@/context/GenerationContext';

export default function GenerationSetup() {
  // Contexts
  const { state } = useGenerationContext();
  const { generationSetupProps, additionalDetails } = state;

  // Component State
  const [expanded, setExpanded] = useState<string | false>('panel1');

  // Panel change handler
  const handleChange =
    (panel: string, nextPanel: string | false, tracker: string) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded(panel);
      } else if (nextPanel === 'up') {
        if (panel === 'panel2') {
          setExpanded('panel1');
        } else {
          setExpanded('panel2');
        }
      } else {
        if (!isExpanded && nextPanel !== false) {
          setExpanded(nextPanel);
        } else if (!isExpanded && panel === 'panel3' && nextPanel === false) {
          setExpanded('panel2');
        } else {
          setExpanded(panel);
        }
      }
    };

  return (
    <Container>
      <SubContainer>
        <Accordion
          expanded={expanded === 'panel1'}
          currPanel='panel1'
          disableGutters
          onChange={handleChange(
            'panel1',
            'panel2',
            `1-${expanded === 'panel1'}`
          )}
        >
          <AccordionSummary
            isExpanded={expanded === 'panel1'}
            expanded='panel1'
            tracker={`1-${expanded === 'panel1'}`}
          >
            {generationSetupProps?.jobPosting === '' ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            <Typography className='accordion-header'>Job Posting</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <JobPostingInput />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel2'}
          currPanel='panel2'
          onChange={handleChange(
            'panel2',
            'panel3',
            `2-${expanded === 'panel2'}`
          )}
        >
          <AccordionSummary
            isExpanded={expanded === 'panel2'}
            expanded='panel2'
            tracker={`2-${expanded === 'panel2'}`}
          >
            {generationSetupProps?.resume === null &&
            generationSetupProps?.freeText === '' &&
            !generationSetupProps?.isUsingPreviousResume ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}
            <Typography className='accordion-header'>
              Résumé Upload / Personal Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PersonalDetails />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel3'}
          currPanel='panel3'
          onChange={handleChange('panel3', false, `3-${expanded === 'panel3'}`)}
        >
          <AccordionSummary
            isExpanded={expanded === 'panel3'}
            expanded='panel3'
            tracker={`3-${expanded === 'panel3'}`}
          >
            {!checkAdditionalDetails(additionalDetails) ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            <Typography className='accordion-header'>
              Additional Details (optional)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdditionalDetails />
          </AccordionDetails>
        </Accordion>
      </SubContainer>

      <GenerateButtons />
    </Container>
  );
}
