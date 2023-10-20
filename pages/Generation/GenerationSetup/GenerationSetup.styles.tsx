// Global component import
import { UnSelectedButton } from '../../../components/Global/Global';

// Material UI related imports
import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const determineBorderRadius = (currPanel: string) => {
  switch (currPanel) {
    case 'panel1':
      return '4px 4px 0 0';
    case 'panel3':
      return '0 0 4px 4px';
    default:
      return 'none';
  }
};

// Accordion styles
const Accordion = muiStyled(
  (props: AccordionProps & { currPanel?: string }) => {
    const { currPanel, ...otherProps } = props;
    return <MuiAccordion disableGutters elevation={0} square {...otherProps} />;
  }
)(({ currPanel }) => ({
  backgroundColor: '#f8f8ff',
  border: '1px solid #006D4B',
  borderBottom: currPanel === 'panel3' ? '1px solid #006D4B' : 'none',
  borderRadius: determineBorderRadius(currPanel),
}));

const AccordionSummary = muiStyled(
  (
    props: AccordionSummaryProps & {
      isExpanded?: boolean;
      expanded?: string;
      tracker?: string;
    }
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
  }
)(() => ({
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5%',
  },
  height: '40px',
}));

// AccordionDetails styles
const AccordionDetails = muiStyled(MuiAccordionDetails)(() => ({
  padding: '0.2%',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  height: 'calc(100vh - 320px)',
  backgroundColor: 'white',
  overflow: 'auto',
}));

// Container styles
const Container = styled(Grid)`
  width: 30vw;
  min-width: 30vw;
  padding: 0.3%;
  height: calc(100vh - 98px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
  background-color: white;
  border: 1px solid #006d4b;
  border-radius: 4px;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 88px);
    justify-content: start;
    gap: 3%;
  }

  @media screen and (min-width: 600px) and (max-width: 900px) {
    width: 42%;
  }
`;

// SubContainer styles
const SubContainer = styled(Grid)`
  width: 100%;
`;

// // GenerateButton styles
const GenerateButton = styled(UnSelectedButton)`
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

const GenerateButtonDouble = styled(UnSelectedButton)`
  // height: 88%;
  width: 95%;
  margin: auto;

  background-color: #bacbba;
  color: white;
  font-size: 0.95rem;
  letter-spacing: 1px;
  white-space: nowrap;

  &:hover {
    background-color: #a5b4a5;
    color: white;
  }
  &:disabled {
    background-color: #e9e9e9;
    color: lightgray;
    border: 1px solid lightgray;
  }
`;

const CheckboxIconInComplete = styled(CheckCircleOutlineIcon)`
  color: #e9e9e9;
  opacity: 50%;
`;

const CheckboxIconComplete = styled(CheckCircleOutlineIcon)`
  color: limegreen;
  opacity: 1;
`;

export {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  SubContainer,
  GenerateButton,
  GenerateButtonDouble,
  CheckboxIconInComplete,
  CheckboxIconComplete,
};
