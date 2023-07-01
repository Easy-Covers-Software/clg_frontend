import React from 'react';
// import { styled } from '@mui/material/styles';
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
import AdditionalDetails from './components/AdditionalDetails/AdditionalDetails';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
import IconButton from '@mui/material/IconButton';
import { PrimaryButton } from '../Global';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))((props) => ({
  backgroundColor: '#fff',
  border: '1px solid #006D4B',
  borderBottom: props.currPanel === 'panel3' ? '1px solid #006D4B' : 'none',
  borderRadius:
    props.currPanel === 'panel1'
      ? '8px 8px 0 0'
      : props.currPanel === 'panel3'
      ? '0 0 8px 8px'
      : 'none',

  // '&:before': {
  //   display: 'none',
  // },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      props.isExpanded && props.expanded !== 'panel3' ? (
        <KeyboardDoubleArrowRightOutlinedIcon sx={{ fontSize: '0.9rem' }} />
      ) : (
        <KeyboardDoubleArrowLeftOutlinedIcon sx={{ fontSize: '0.9rem' }} />
      )
    }
    {...props}
  />
))(() => ({
  backgroundColor: 'rgba(255, 255, 255, .05)',
  // flexDirection: 'row-reverse',
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
  height: 'calc(100vh - 340px)',
}));

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 35vw;
  padding: 0.8%;
  background-color: #f8f8ff;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  // height: 100%;
`;

const GenerateButton = styled(PrimaryButton)`
  width: 70%;
`;

export default function GenerationSetup() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string, nextPanel: string | false) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (nextPanel === 'up') {
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
      <Accordion
        expanded={expanded === 'panel1'}
        currPanel="panel1"
        disableGutters
        onChange={handleChange('panel1', 'panel2')}
        style={{
          height: 'auto',
        }}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          isExpanded={expanded === 'panel1'}
          expanded="panel1"
        >
          <Typography>Job Posting</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <JobPostingInput />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        currPanel="panel2"
        onChange={handleChange('panel2', 'panel3')}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          isExpanded={expanded === 'panel2'}
          expanded="panel2"
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
                  handleChange('panel2', 'up')(e, true);
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
        onChange={handleChange('panel3', false)}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          isExpanded={expanded === 'panel3'}
          expanded="panel3"
        >
          <Typography>Additional Details (optional)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AdditionalDetails />
        </AccordionDetails>
      </Accordion>

      <Grid
        width={'100%'}
        height={'8.8vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <GenerateButton>Generate</GenerateButton>
      </Grid>
    </Container>
  );
}
