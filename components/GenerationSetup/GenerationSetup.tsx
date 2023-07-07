'use client'

import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import JobPostingInput from './components/JobPostingInput';
import PersonalDetails from './components/PersonalDetails/PersonalDetails';
import AdditionalDetails from './components/AdditionalDetails/AdditionalDetails';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import IconButton from '@mui/material/IconButton';
import { PrimaryButton } from '../Global';

import { uploadJobPosting } from './api/generationSetupEndpoints';
import { useSession } from 'next-auth/react';

const Accordion = styled((props: AccordionProps & { currPanel?: string }) => {
  const { currPanel, ...otherProps } = props;
  return <MuiAccordion disableGutters elevation={0} square {...otherProps} />;
})(({ currPanel }) => ({
  backgroundColor: '#fff',
  border: '1px solid #006D4B',
  borderBottom: currPanel === 'panel3' ? '1px solid #006D4B' : 'none',
  borderRadius:
    currPanel === 'panel1'
      ? '8px 8px 0 0'
      : currPanel === 'panel3'
      ? '0 0 8px 8px'
      : 'none',
}));

const AccordionSummary = styled(
  (
    props: AccordionSummaryProps & {
      isExpanded?: boolean;
      expanded?: string;
      tracker?: string;
    },
  ) => {
    const { isExpanded, expanded, tracker, ...otherProps } = props;
    return (
      <MuiAccordionSummary
        expandIcon={
          isExpanded && expanded !== 'panel3' ? (
            <KeyboardDoubleArrowRightOutlinedIcon sx={{ fontSize: '0.9rem' }} />
          ) : (
            <KeyboardDoubleArrowLeftOutlinedIcon sx={{ fontSize: '0.9rem' }} />
          )
        }
        {...otherProps}
      />
    );
  },
)(() => ({
  backgroundColor: 'rgba(255, 255, 255, .05)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '10px',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0.2%',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  height: 'calc(100vh - 320px)',
}));

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 35vw;
  padding: 0.5%;
  background-color: #f8f8ff;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SubContainer = styled(Grid)`
  width: 100%;
  height: 100%;
`;

const GenerateButton = styled(PrimaryButton)`
  width: 55%;
  margin: 1% 0;
`;




export default function GenerationSetup() {

  const { data: session } = useSession();

  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [previousPanel, setPreviousPanel] = React.useState<string | false>('panel1');

  const [jobPostingInput, setJobPostingInput] = useState<string>('');
  const [jobPostingLastSubmitted, setJobPostingLastSubmitted] = useState<string>('');
  
  const [uploadedResume, setUploadedResume] = useState('');

  const isDifferentJobPostingSinceLastSubmission = () => {
    if (jobPostingInput === jobPostingLastSubmitted) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (previousPanel === 'panel1' && expanded !== 'panel1') {
      handleJobPostingUpload();
    }
    setPreviousPanel(expanded);
  }, [expanded]);

  const handleJobPostingUpload = async () => {
    if (isDifferentJobPostingSinceLastSubmission) {
      try {
        await uploadJobPosting(jobPostingInput);
      } catch (err) {
        console.error(err);
        // Handle error, for example by showing an error message in the UI
      }
      setJobPostingLastSubmitted(jobPostingInput);
    }
  };

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
          currPanel="panel1"
          disableGutters
          onChange={handleChange('panel1', 'panel2', `1-${expanded === 'panel1'}`)}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            isExpanded={expanded === 'panel1'}
            expanded="panel1"
            tracker={`1-${expanded === 'panel1'}`}
          >
            <Typography>Job Posting</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <JobPostingInput
              jobPostingInput={jobPostingInput}
              setJobPostingInput={setJobPostingInput}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel2'}
          currPanel="panel2"
          onChange={handleChange(
            'panel2',
            'panel3',
            `2-${expanded === 'panel2'}`,
          )}
        >
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            isExpanded={expanded === 'panel2'}
            expanded="panel2"
            tracker={`2-${expanded === 'panel2'}`}
          >
            <Grid
              p={0}
              mr={3}
              display={'flex'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Typography>Résumé Upload / Personal Details</Typography>
              {expanded === 'panel2' && (
                <IconButton
                  sx={{ padding: 0 }}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleChange('panel2', 'up', '')(e, true);
                  }}
                >
                  <KeyboardDoubleArrowUpOutlinedIcon
                    sx={{ fontSize: '0.9rem' }}
                  />
                </IconButton>
              )}
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <PersonalDetails />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === 'panel3'}
          currPanel="panel3"
          onChange={handleChange('panel3', false, `3-${expanded === 'panel3'}`)}
        >
          <AccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            isExpanded={expanded === 'panel3'}
            expanded="panel3"
            tracker={`3-${expanded === 'panel3'}`}
          >
            <Typography>Additional Details (optional)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdditionalDetails />
          </AccordionDetails>
        </Accordion>
      </SubContainer>

      {/* <Grid
        width={'100%'}
        height={'10vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      > */}
      <GenerateButton>Generate</GenerateButton>
      {/* </Grid> */}
    </Container>
  );
}
