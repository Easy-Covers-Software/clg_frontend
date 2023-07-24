"use client";

// React-related imports
import React, { useState, useEffect } from "react";

import { Typography } from "@mui/material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  SubContainer,
  CheckboxIconInComplete,
  CheckboxIconComplete,
} from "./GenerationSetup.styles";

import GenerateButtons from "./components/GenerateButton";

// Custom Component Imports
import JobPostingInput from "./components/JobPostingInput/JobPostingInput";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import AdditionalDetails from "./components/AdditionalDetails/AdditionalDetails";

import { checkAdditionalDetails } from "@/context/utils";

// Context Imports
import { useAuth } from "@/context/AuthContext";
import { useGenerationContext } from "@/context/GenerationContext";

export default function GenerationSetup() {
  // Contexts
  const { state: authState, dispatch } = useAuth();
  const {
    state,
    generateCoverLetter,
    getJobTitle,
    getCompanyName,
    getJobMatchScore,
  } = useGenerationContext();
  const {
    isUsingLastUploadedResume,
    jobPosting,
    resume,
    freeText,
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
    jobPosting !== jobPostingLastSubmitted;
  const isDifferentResumeSinceLastSubmission = () =>
    jobPosting !== jobPostingLastSubmitted;

  // Upload handlers
  const handleJobPostingUpload = async () => {
    if (isDifferentJobPostingSinceLastSubmission()) {
      try {
        // await uploadJobPosting(jobPosting);
        setJobPostingLastSubmitted(jobPosting);
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
        setResumeLastUploaded(resume);
      } catch (err) {
        console.error(err);
        // Handle error, for example by showing an error message in the UI
      }
    }
  };

  // Cover Letter handler
  const handleGenerateCoverLetter = async () => {
    try {
      await getJobTitle(jobPosting);
      await getCompanyName(jobPosting);
      await getJobMatchScore(jobPosting);
      await generateCoverLetter(
        jobPosting,
        resume,
        freeText,
        additionalDetails
      );

      dispatch({
        type: "SET_UPDATE_USER",
        payload: authState.updateUser,
      });
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

  console.log("isUsingLastUploadedResume", isUsingLastUploadedResume);

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
            {jobPosting === "" ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            <Typography variant="accordionHeader">Job Posting</Typography>
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
            {resume === null &&
            freeText === "" &&
            !isUsingLastUploadedResume ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}
            <Typography variant="accordionHeader">
              Résumé Upload / Personal Details
            </Typography>
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
            {!checkAdditionalDetails(additionalDetails) ? (
              <CheckboxIconInComplete />
            ) : (
              <CheckboxIconComplete />
            )}

            <Typography variant="accordionHeader">
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
