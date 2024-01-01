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
  // Container,
  SubContainer,
  CheckboxIconInComplete,
  CheckboxIconComplete,
} from '@/components/Generation/GenerationSetup.styles';

import JobPostingSelectionDataGrid from '@/components/Generation/SetupSelectionDataGrids/JobPostingSelectionDataGrid';
import CandidateProfileSelectionDataGrid from '@/components/Generation/SetupSelectionDataGrids/CandidateProfileSelectionDataGrid';
import GenerationSettings from '@/components/Generation/GenerationSettings/GenerationSettings';

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
  const {
    //== NEW ==//
    generationSetupState,
    emailGenerationSettings,
    coverLetterGenerationSettings,
    generationMode,
    generationResultsState,

    //== OLD ==//
    generationSetupProps,
    jobDetailsProps,
    coverLetterData,
    additionalDetails,
  } = state;

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

  const getJobPostings = async (): Promise<void> => {
    const response = await fetchJobPostings();
    if (response) {
      dispatch({
        type: 'UPDATE_JOB_POSTINGS',
        payload: response.data,
      });
      dispatch({
        type: 'UPDATE_FILTERED_JOB_POSTINGS',
        payload: response.data,
      });
    } else {
      snackbar.updateSnackbar(true, 'Error fetching job postings', 'error');
    }
  };

  const handleJobPostingSelection = (jobPosting) => {
    dispatch({
      type: 'UPDATE_SELECTED_JOB_POSTING',
      payload: jobPosting,
    });
  };

  const updateJobPostingSearch = (event) => {
    dispatch({
      type: 'UPDATE_JOB_POSTING_SEARCH',
      payload: event.target.value,
    });
  };

  const getCandidateProfiles = async (): Promise<void> => {
    const response = await fetchCandidateProfiles();
    if (response) {
      dispatch({
        type: 'UPDATE_CANDIDATES',
        payload: response.data,
      });
      dispatch({
        type: 'UPDATE_FILTERED_CANDIDATES',
        payload: response.data,
      });
    } else {
      snackbar.updateSnackbar(
        true,
        'Error fetching candidate profiles',
        'error'
      );
    }
  };

  const handleCandidateProfileSelection = (candidateProfile) => {
    dispatch({
      type: 'UPDATE_SELECTED_CANDIDATE',
      payload: candidateProfile,
    });
  };

  const updateCandidateProfileSearch = (event) => {
    dispatch({
      type: 'UPDATE_CANDIDATE_SEARCH',
      payload: event.target.value,
    });
  };

  const toggleGenerationMode = () => {
    dispatch({
      type: 'TOGGLE_GENERATION_MODE',
      payload: true,
    });
  };

  const handleGenerate = async (): Promise<void> => {
    coverLetterData.toggleLoadingCoverLetter();
    generationResultsState.toggleLoading();

    let mode = '';
    if (!generationMode) {
      mode = 'email';
    } else {
      mode = 'cover_letter';
    }

    const response = await generate(
      mode,
      generationSetupState?.selectedJobPosting?.id,
      generationSetupState?.selectedCandidate?.id
    );

    if (response) {
      console.log('generation response', response);
      generationResultsState.updateId(response.data.id);
      generationResultsState.updateContent(response.data.content);
      generationResultsState.toggleLoading();

      coverLetterData.updateCoverLetterId(response.data.id);
      coverLetterData.updateCoverLetterParts(response.data.content);
      coverLetterData.toggleLoadingCoverLetter();
      loggedInProps.updateUser();
      snackbar.updateSnackbar(
        true,
        'success',
        'Success! Cover letter generated.'
      );
    } else {
      console.error(response);
      coverLetterData.toggleLoadingCoverLetter();
      snackbar.updateSnackbar(
        true,
        'error',
        'Error generating cover letter. Please try again. If the problem persists, please contact us.'
      );
    }
  };

  useEffect(() => {
    getJobPostings();
    getCandidateProfiles();
  }, []);

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
            {!generationSetupState.selectedJobPosting ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            {!generationSetupState.selectedJobPosting ? (
              <Typography className="accordion-header">
                Select Job Posting
              </Typography>
            ) : (
              <Typography
                className="accordion-header"
                flexWrap={'nowrap'}
                whiteSpace={'nowrap'}
              >
                {generationSetupState?.selectedJobPosting.job_title} <br />@
                {generationSetupState?.selectedJobPosting.company_name}
              </Typography>
            )}
          </AccordionSummary>

          <AccordionDetails>
            <JobPostingSelectionDataGrid
              jobPostings={generationSetupState?.filteredJobPostings}
              selected={generationSetupProps?.selectedJobPosting?.id}
              search={generationSetupProps?.jobPostingSearch}
              handleSelectionChange={handleJobPostingSelection}
              updateSearch={updateJobPostingSearch}
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
            {!generationSetupState?.selectedCandidate ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            {!generationSetupState?.selectedCandidate ? (
              <Typography className="accordion-header">
                Select Candidate
              </Typography>
            ) : (
              <Typography className="accordion-header">
                {generationSetupState?.selectedCandidate.name} <br />{' '}
                {generationSetupState?.selectedCandidate.current_title}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <CandidateProfileSelectionDataGrid
              candidates={generationSetupState?.filteredCandidates}
              selected={generationSetupProps?.selectedCandidate?.id}
              search={generationSetupProps?.candidateSearch}
              handleSelectionChange={handleCandidateProfileSelection}
              updateSearch={updateCandidateProfileSearch}
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
            {!checkAdditionalDetails(additionalDetails) ? (
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
              mode={generationMode}
              toggleMode={toggleGenerationMode}
            />
          </AccordionDetails>
        </Accordion>
      </SubContainer>

      <GenerateButton
        disabled={false}
        // disabled={disabled}
        onClick={() => {
          trackers?.updateMobileMode('results');
          handleGenerate();
        }}
      >
        Generate
      </GenerateButton>
    </Container>
  );
}
