'use client';

// React-related imports
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { UnSelectedButton } from '@/components/Global/Global';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  SubContainer,
  CheckboxIconInComplete,
  CheckboxIconComplete,
} from '@/components/GenerationPage/GenerationSetup.styles';

import JobPostingSelectionDataGrid from '@/components/GenerationPage/SetupSelectionDataGrids/JobPostingSelectionDataGrid';
import CandidateProfileSelectionDataGrid from '@/components/GenerationPage/SetupSelectionDataGrids/CandidateProfileSelectionDataGrid';
import GenerationSettings from '@/components/GenerationPage/GenerationSettings/GenerationSettings';

import { checkAdditionalDetails } from '@/Utils/utils';

import { generate } from '@/api/GenerationMethods';
import { fetchJobPostings } from '@/api/JobPostingsMethods';
import { fetchCandidateProfiles } from '@/api/CandidateProfileMethods';

// Context Imports
import { useAuth } from '@/context/AuthContext';
import { useGenerationContext } from '@/context/GenerationContext';

const Container = styled(Grid)`
  height: calc(100vh - 98px);
  width: 25vw;
  min-width: 25vw;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1%;

  flex: 1;
  margin: 0 0.2%;
  padding: 0.3%;

  background-color: white;

  border: 1px solid #13d0b7;
  border-radius: 4px;
`;

export const SecondButtonContainer = styled(Grid)`
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
`;

export const GenerateButton = styled(UnSelectedButton)`
  background-color: #bacbba;
  color: white;
  font-size: 0.95rem;
  letter-spacing: 1px;
  margin: auto;
  margin-bottom: 0.5%;

  // width: 60%;

  &:hover {
    background-color: #a5b4a5;
    color: white;
  }

  &:disabled {
    background-color: #e9e9e9;
    color: lightgray;
    border: 1px solid lightgray;
  }

  @media screen and (max-width: 900px) {
    font-size: 0.9rem; // Adjust font size for smaller screens
    height: 12%;
  }
`;

export default function GenerationSetupLists() {
  const { state: authState } = useAuth();
  const { loggedInProps, trackers, dialogProps, snackbar } = authState;

  // Contexts
  const { state, dispatch } = useGenerationContext();
  const { generationSetupState, bodyState } = state;

  // Component State
  const [expanded, setExpanded] = useState<string | false>('panel1');

  //=== Helpers ===//
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

  const handleJobPostingSelection = (jobPosting) => {
    generationSetupState.updateJobPostingSelectionState(
      'selectedJobPosting',
      jobPosting
    );
  };

  const handleCandidateProfileSelection = (candidateProfile) => {
    generationSetupState.updateCandidateSelectionState(
      'selectedCandidate',
      candidateProfile
    );
  };

  const toggleGenerationMode = () => {
    if (generationSetupState.mode === 'email') {
      generationSetupState.updateGenerationMode('cover_letter');
    } else {
      generationSetupState.updateGenerationMode('email');
    }
  };

  //=== API Methods ===//
  const getJobPostings = async (): Promise<void> => {
    const response = await fetchJobPostings();
    if (response.data) {
      generationSetupState.updateJobPostingSelectionState(
        'jobPostings',
        response.data
      );
      generationSetupState.updateJobPostingSelectionState(
        'filteredJobPostings',
        response.data
      );
    } else {
      snackbar.updateSnackbar(
        true,
        'Error fetching job postings',
        'Error! Could not find fetch job postings.'
      );
    }
  };

  const getCandidateProfiles = async (): Promise<void> => {
    const response = await fetchCandidateProfiles();
    if (response.data) {
      generationSetupState.updateCandidateSelectionState(
        'candidates',
        response.data
      );
      generationSetupState.updateCandidateSelectionState(
        'filteredCandidates',
        response.data
      );
    } else {
      snackbar.updateSnackbar(
        true,
        'Error fetching candidates',
        'Error! Could not find fetch candidates.'
      );
    }
  };

  const handleGenerate = async (): Promise<void> => {
    // 1. toggle loading to true
    bodyState.updateGenerationResultsState('loading', true);

    // 2. set job posting and candidate id for post request
    const jobPosting =
      generationSetupState.jobPostingSelectionState?.selectedJobPosting;
    const candidate =
      generationSetupState.candidateSelectionState?.selectedCandidate;

    // 3. make post request
    const response: any = await generate(
      generationSetupState.mode,
      jobPosting.id,
      candidate.id
    );

    if (response.data) {
      bodyState.updateGenerationResultsState('id', response.data.id);
      bodyState.updateGenerationResultsState('content', response.data.content);
      bodyState.updateGenerationResultsState('loading', false);
      loggedInProps.updateUser();
      snackbar.updateSnackbar(
        true,
        'success',
        'Success! Cover letter generated.'
      );
    } else {
      console.error(response.error.response.data);
      bodyState.updateGenerationResultsState('loading', false);
      snackbar.updateSnackbar(
        true,
        'error',
        `Error! ${response.error.response.data}`
      );
    }
  };

  useEffect(() => {
    if (loggedInProps.user) {
      getJobPostings();
      getCandidateProfiles();
    }
  }, [loggedInProps.user]);

  return (
    <Container>
      <SubContainer>
        <Accordion
          expanded={expanded === 'panel1'}
          currPanel="panel1"
          disableGutters
          onChange={handleChange(
            'panel1',
            'panel2',
            `1-${expanded === 'panel1'}`
          )}
        >
          <AccordionSummary
            isExpanded={expanded === 'panel1'}
            expanded="panel1"
            tracker={`1-${expanded === 'panel1'}`}
          >
            {/* {generationSetupState.selectedJobPosting !== null ? ( */}
            {/* {!generationSetupState.selectedJobPosting ? ( */}
            {!generationSetupState.jobPostingSelectionState
              ?.selectedJobPosting ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            {/* {!generationSetupState.selectedJobPosting ? ( */}
            {!generationSetupState.jobPostingSelectionState
              ?.selectedJobPosting ? (
              <Typography className="accordion-header">
                Select Job Posting
              </Typography>
            ) : (
              <Typography
                className="accordion-header"
                flexWrap={'nowrap'}
                whiteSpace={'nowrap'}
              >
                {/* {generationSetupState?.selectedJobPosting.job_title} <br />@
                {generationSetupState?.selectedJobPosting.company_name} */}
                {
                  generationSetupState.jobPostingSelectionState
                    ?.selectedJobPosting.job_title
                }{' '}
                <br />@
                {
                  generationSetupState.jobPostingSelectionState
                    ?.selectedJobPosting.company_name
                }
              </Typography>
            )}
          </AccordionSummary>

          <AccordionDetails>
            <JobPostingSelectionDataGrid
              jobPostings={
                generationSetupState.jobPostingSelectionState
                  ?.filteredJobPostings
              }
              selected={
                generationSetupState.jobPostingSelectionState
                  ?.selectedJobPosting?.id
              }
              handleSelectionChange={handleJobPostingSelection}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel2'}
          currPanel="panel2"
          onChange={handleChange(
            'panel2',
            'panel3',
            `2-${expanded === 'panel2'}`
          )}
        >
          <AccordionSummary
            isExpanded={expanded === 'panel2'}
            expanded="panel2"
            tracker={`2-${expanded === 'panel2'}`}
          >
            {/* {!generationSetupState?.selectedCandidate ? ( */}
            {!generationSetupState.candidateSelectionState
              ?.selectedCandidate ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            {!generationSetupState.candidateSelectionState
              ?.selectedCandidate ? (
              <Typography className="accordion-header">
                Select Candidate
              </Typography>
            ) : (
              <Typography className="accordion-header">
                {/* {generationSetupState?.selectedCandidate.name} <br />{' '}
                {generationSetupState?.selectedCandidate.current_title} */}
                {
                  generationSetupState.candidateSelectionState
                    ?.selectedCandidate.name
                }{' '}
                <br />{' '}
                {
                  generationSetupState.candidateSelectionState
                    ?.selectedCandidate.current_title
                }
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <CandidateProfileSelectionDataGrid
              // candidates={generationSetupState?.filteredCandidates}
              // selected={generationSetupProps?.selectedCandidate?.id}
              // search={generationSetupProps?.candidateSearch}
              candidates={
                generationSetupState.candidateSelectionState?.filteredCandidates
              }
              selected={
                generationSetupState.candidateSelectionState?.selectedCandidate
                  ?.id
              }
              handleSelectionChange={handleCandidateProfileSelection}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel3'}
          currPanel="panel3"
          onChange={handleChange('panel3', false, `3-${expanded === 'panel3'}`)}
        >
          <AccordionSummary
            isExpanded={expanded === 'panel3'}
            expanded="panel3"
            tracker={`3-${expanded === 'panel3'}`}
          >
            {!checkAdditionalDetails(
              generationSetupState.additionalDetailsState
            ) ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            <Typography className="accordion-header">
              Generation Settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenerationSettings
              mode={generationSetupState.mode}
              toggleMode={toggleGenerationMode}
            />
          </AccordionDetails>
        </Accordion>
      </SubContainer>

      <GenerateButton
        disabled={false}
        // disabled={disabled}
        onClick={() => {
          handleGenerate();
        }}
      >
        Generate
      </GenerateButton>
    </Container>
  );
}
