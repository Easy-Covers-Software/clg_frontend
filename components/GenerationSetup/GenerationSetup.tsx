"use client";

import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import JobPostingInput from "./components/JobPostingInput";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import AdditionalDetails from "./components/AdditionalDetails/AdditionalDetails";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import { PrimaryButton, UnSelectedButton } from "../Global";

import { uploadJobPosting, uploadResume } from "./api/generationSetupEndpoints";

import { useGenerationSetupContext } from "@/context/GenerationSetupContext";

import { useCoverLetterResultsContext } from "@/context/ResultsContext";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Accordion = styled((props: AccordionProps & { currPanel?: string }) => {
  const { currPanel, ...otherProps } = props;
  return <MuiAccordion disableGutters elevation={0} square {...otherProps} />;
})(({ currPanel }) => ({
  // backgroundColor: "#fff",
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

const AccordionSummary = styled(
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
  // backgroundColor: "rgba(255, 255, 255, .05)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    // marginLeft: "0.5%",
    display: "flex",
    gap: "1.5%",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: "0.2%",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  height: "calc(100vh - 320px)",
  backgroundColor: "white",
  overflow: "auto",
}));

// Want to eventually change this depending on if a generation has already occured or not
const Container = styled(Grid)`
  width: 46%;
  padding: 0.3%;
  // background-color: #f8f8ff;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #006d4b;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SubContainer = styled(Grid)`
  width: 100%;
  // height: 96%;
`;

const ButtonContainer = styled(Grid)`
  // margin: auto;
  display: flex;
  align-items: center;
  marting-top: 20%;
`;

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

export default function GenerationSetup() {
  const { state } = useGenerationSetupContext();

  const {
    jobPostingInput,
    uploadedResumeFile,
    freeTextPersonalDetails,
    additionalDetails,
  } = state;
  const { generateCoverLetter, getJobTitle, getCompanyName, getJobMatchScore } =
    useCoverLetterResultsContext();

  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [previousPanel, setPreviousPanel] = React.useState<string | false>(
    "panel1"
  );

  const [jobPostingLastSubmitted, setJobPostingLastSubmitted] =
    useState<string>("");
  const isDifferentJobPostingSinceLastSubmission = () => {
    if (jobPostingInput === jobPostingLastSubmitted) {
      return false;
    } else {
      return true;
    }
  };

  const [resumeLastUploaded, setResumeLastUploaded] = useState<any>({});
  const isDifferentResumeSinceLastSubmission = () => {
    if (jobPostingInput === jobPostingLastSubmitted) {
      return false;
    } else {
      return true;
    }
  };

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

  const handleResumeUpload = async () => {
    if (isDifferentResumeSinceLastSubmission) {
      try {
        await uploadResume(uploadedResumeFile);
      } catch (err) {
        console.error(err);
        // Handle error, for example by showing an error message in the UI
      }
      setResumeLastUploaded(uploadedResumeFile);
    }
  };

  const handleGenerateCoverLetter = async () => {
    try {
      await getJobTitle(jobPostingInput);
    } catch (err) {
      console.log("error getting job title");
      console.error(err);
    }

    try {
      await getCompanyName(jobPostingInput);
    } catch (err) {
      console.log("error getting job title");
      console.error(err);
    }

    try {
      await getJobMatchScore(jobPostingInput);
    } catch (err) {
      console.log("error getting job title");
      console.error(err);
    }

    try {
      await generateCoverLetter(
        jobPostingInput,
        uploadedResumeFile,
        freeTextPersonalDetails,
        additionalDetails
      );
    } catch (err) {
      console.error(err);
      // Handle error, for example by showing an error message in the UI
    }
  };

  const handleChange =
    (panel: string, nextPanel: string | false, tracker: string) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded(panel);
      } else if (nextPanel === "up") {
        if (panel === "panel2") {
          setExpanded("panel1");
        } else {
          setExpanded("panel2");
        }
      } else {
        if (!isExpanded && nextPanel !== false) {
          setExpanded(nextPanel);
        } else if (!isExpanded && panel === "panel3" && nextPanel === false) {
          setExpanded("panel2");
        } else {
          setExpanded(panel);
        }
      }
    };

  useEffect(() => {
    if (previousPanel === "panel1" && expanded !== "panel1") {
      handleJobPostingUpload();
    } else if (previousPanel === "panel2" && expanded !== "panel2") {
      // handleResumeUpload();
    } else {
      console.log("saveCurrentAdditionalDetails()");
      // saveCurrentAdditionalDetails()
    }
    setPreviousPanel(expanded);
  }, [expanded]);

  console.log("resume", uploadedResumeFile);

  return (
    <Container>
      <SubContainer>
        <Accordion
          expanded={expanded === "panel1"}
          currPanel="panel1"
          disableGutters
          onChange={handleChange(
            "panel1",
            "panel2",
            `1-${expanded === "panel1"}`
          )}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            isExpanded={expanded === "panel1"}
            expanded="panel1"
            tracker={`1-${expanded === "panel1"}`}
          >
            {jobPostingInput === "" ? (
              <CheckCircleOutlineIcon
                style={{
                  color: "#E9E9E9",
                  opacity: 0.5,
                }}
              />
            ) : (
              <CheckCircleOutlineIcon
                style={{
                  color: "lightgreen",
                  opacity: 1,
                }}
              />
            )}

            <Typography>Job Posting</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <JobPostingInput />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          currPanel="panel2"
          onChange={handleChange(
            "panel2",
            "panel3",
            `2-${expanded === "panel2"}`
          )}
        >
          <AccordionSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            isExpanded={expanded === "panel2"}
            expanded="panel2"
            tracker={`2-${expanded === "panel2"}`}
          >
            {uploadedResumeFile === null && freeTextPersonalDetails === "" ? (
              <CheckCircleOutlineIcon
                style={{
                  color: "#E9E9E9",
                  opacity: 0.5,
                }}
              />
            ) : (
              <CheckCircleOutlineIcon
                style={{
                  color: "lightgreen",
                  opacity: 1,
                }}
              />
            )}
            <Typography>Résumé Upload / Personal Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PersonalDetails />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          currPanel="panel3"
          onChange={handleChange("panel3", false, `3-${expanded === "panel3"}`)}
        >
          <AccordionSummary
            aria-controls="panel3d-content"
            id="panel3d-header"
            isExpanded={expanded === "panel3"}
            expanded="panel3"
            tracker={`3-${expanded === "panel3"}`}
          >
            {jobPostingInput === "" ||
            (uploadedResumeFile === null && freeTextPersonalDetails === "") ? (
              <CheckCircleOutlineIcon
                style={{
                  color: "#E9E9E9",
                  opacity: 0.5,
                }}
              />
            ) : (
              <CheckCircleOutlineIcon
                style={{
                  color: "lightgreen",
                  opacity: 1,
                }}
              />
            )}

            <Typography>Additional Details (optional)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdditionalDetails />
          </AccordionDetails>
        </Accordion>
      </SubContainer>

      <GenerateButton onClick={() => handleGenerateCoverLetter()}>
        Generate
      </GenerateButton>
    </Container>
  );
}
