import * as React from 'react';
// import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

import JobPostingInput from './components/JobPostingInput';
import PersonalDetails from './components/PersonalDetails/PersonalDetails';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  backgroundColor: '#fff',
  border: `1px solid black`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  backgroundColor: 'rgba(255, 255, 255, .05)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '10px',
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
  margin: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  height: 'calc(100vh - 280px)',
}));

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 45%;
  padding: 0.8%;
  background-color: #f8f8ff;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  // height: 100%;
`;

export default function GenerationSetup() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded || expanded !== panel) {
        setExpanded(panel);
      }
    };

  return (
    <Container>
      {/* Job Posting */}
      <Accordion
        expanded={expanded === 'panel1'}
        disableGutters
        onChange={handleChange('panel1')}
        style={{
          height: 'auto',
        }}
      >
        {/* ACCORDION LABEL */}
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Job Posting</Typography>
        </AccordionSummary>

        {/* ACCORDION CONTENT */}
        <AccordionDetails>
          <JobPostingInput />
        </AccordionDetails>
      </Accordion>

      {/* Resume Upload */}
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        {/* ACCORDION LABEL */}
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Résumé Upload / Personal Details</Typography>
        </AccordionSummary>

        {/* ACCORDION CONTENT */}
        <AccordionDetails>
          <PersonalDetails />
        </AccordionDetails>
      </Accordion>

      {/* Additional Details */}
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        {/* ACCORDION LABEL */}
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Additional Details</Typography>
        </AccordionSummary>

        {/* ACCORDION CONTENT */}
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
