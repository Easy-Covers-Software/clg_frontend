"use client";

// React-related imports
import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  SubContainer,
  GenerateButton,
  CheckboxIconInComplete,
  CheckboxIconComplete,
  TypographyColored,
} from "./GenerationSetup.styles";

// Custom Component Imports
import JobPostingInput from "./components/JobPostingInput/JobPostingInput";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import AdditionalDetails from "./components/AdditionalDetails/AdditionalDetails";

// Context Imports
import { useGenerationSetupContext } from "@/context/GenerationSetupContext";
import { useCoverLetterResultsContext } from "@/context/ResultsContext";

export default function GenerationSetup() {
  // Contexts
  const { state } = useGenerationSetupContext();
  const { generateCoverLetter, getJobTitle, getCompanyName, getJobMatchScore } =
    useCoverLetterResultsContext();

  // State from Context
  const {
    jobPostingInput,
    uploadedResumeFile,
    freeTextPersonalDetails,
    additionalDetails,
  } = state;

  // Component State
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [previousPanel, setPreviousPanel] = React.useState<string | false>(
    "panel1"
  );
  const [jobPostingLastSubmitted, setJobPostingLastSubmitted] =
    useState<string>("");
  const [resumeLastUploaded, setResumeLastUploaded] = useState<any>({});

  // Helper functions
  const isDifferentJobPostingSinceLastSubmission = () =>
    jobPostingInput !== jobPostingLastSubmitted;
  const isDifferentResumeSinceLastSubmission = () =>
    jobPostingInput !== jobPostingLastSubmitted;

  // Upload handlers
  const handleJobPostingUpload = async () => {
    if (isDifferentJobPostingSinceLastSubmission()) {
      try {
        // await uploadJobPosting(jobPostingInput);
        setJobPostingLastSubmitted(jobPostingInput);
      } catch (err) {
        console.error(err);
        // Handle error, for example by showing an error message in the UI
      }
    }
  };

  const handleResumeUpload = async () => {
    if (isDifferentResumeSinceLastSubmission()) {
      try {
        // await uploadResume(uploadedResumeFile);
        setResumeLastUploaded(uploadedResumeFile);
      } catch (err) {
        console.error(err);
        // Handle error, for example by showing an error message in the UI
      }
    }
  };

  // Cover Letter handler
  const handleGenerateCoverLetter = async () => {
    try {
      await getJobTitle(jobPostingInput);
      await getCompanyName(jobPostingInput);
      await getJobMatchScore(jobPostingInput);
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

  // Panel change handler
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

  // Upload handlers
  useEffect(() => {
    if (previousPanel === "panel1" && expanded !== "panel1") {
      handleJobPostingUpload();
    } else if (previousPanel === "panel2" && expanded !== "panel2") {
      handleResumeUpload();
    } else {
      console.log("saveCurrentAdditionalDetails()");
      // saveCurrentAdditionalDetails()
    }
    setPreviousPanel(expanded);
  }, [expanded]);

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
            isExpanded={expanded === "panel1"}
            expanded="panel1"
            tracker={`1-${expanded === "panel1"}`}
          >
            {jobPostingInput === "" ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            <TypographyColored>Job Posting</TypographyColored>
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
            isExpanded={expanded === "panel2"}
            expanded="panel2"
            tracker={`2-${expanded === "panel2"}`}
          >
            {uploadedResumeFile === null && freeTextPersonalDetails === "" ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}
            <TypographyColored>
              Résumé Upload / Personal Details
            </TypographyColored>
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
            isExpanded={expanded === "panel3"}
            expanded="panel3"
            tracker={`3-${expanded === "panel3"}`}
          >
            {jobPostingInput === "" ||
            (uploadedResumeFile === null && freeTextPersonalDetails === "") ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            <TypographyColored>Additional Details (optional)</TypographyColored>
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
