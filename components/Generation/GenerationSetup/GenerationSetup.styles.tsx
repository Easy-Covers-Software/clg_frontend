// Global component import
import { UnSelectedButton } from "../../Global/Global";

// Material UI related imports
import { styled as muiStyled } from "@mui/material/styles";
import styled from "@emotion/styled";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import JobPostingInput from "./components/JobPostingInput/JobPostingInput";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";

// Accordion styles
const Accordion = muiStyled(
  (props: AccordionProps & { currPanel?: string }) => {
    const { currPanel, ...otherProps } = props;
    return <MuiAccordion disableGutters elevation={0} square {...otherProps} />;
  }
)(({ currPanel }) => ({
  backgroundColor: "#f8f8ff",
  border: "1px solid #006D4B",
  borderBottom: currPanel === "panel3" ? "1px solid #006D4B" : "none",
  borderRadius:
    currPanel === "panel1"
      ? "4px 4px 0 0"
      : currPanel === "panel3"
      ? "0 0 4px 4px"
      : "none",
}));

// AccordionSummary styles
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
          isExpanded && expanded !== "panel3" ? (
            <KeyboardDoubleArrowRightOutlinedIcon sx={{ fontSize: "0.9rem" }} />
          ) : (
            <KeyboardDoubleArrowLeftOutlinedIcon sx={{ fontSize: "0.9rem" }} />
          )
        }
        {...otherProps}
      />
    );
  }
)(() => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": { display: "flex", gap: "1.5%" },
}));

// AccordionDetails styles
const AccordionDetails = muiStyled(MuiAccordionDetails)(() => ({
  padding: "0.2%",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  height: "calc(100vh - 320px)",
  backgroundColor: "white",
  overflow: "auto",
}));

// Container styles
const Container = styled(Grid)`
  width: 46%;
  padding: 0.3%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

// SubContainer styles
const SubContainer = styled(Grid)`
  width: 100%;
`;

// // GenerateButton styles
const GenerateButton = styled(UnSelectedButton)`
  width: 55%;
  background-color: #bacbba;
  color: white;
  font-size: 0.95rem;
  letter-spacing: 1px;

  &:hover {
    background-color: #a5b4a5;
    color: white;
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

const TypographyColored = styled(Typography)`
  color: #006d4b;
`;

export {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  SubContainer,
  GenerateButton,
  CheckboxIconInComplete,
  CheckboxIconComplete,
  TypographyColored,
};
