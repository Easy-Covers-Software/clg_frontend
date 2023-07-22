import React from "react";

import { Typography } from "@mui/material";

import { CircularProgress } from "@mui/material";

import { useCoverLetterResultsContext } from "@/context/ResultsContext";

import { Container, JobOverview, JobMatchScore } from "./ResultsSummary.styles";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function ResultsSummary() {
  const { state } = useCoverLetterResultsContext();
  const {
    jobTitle,
    companyName,
    matchScore,
    loadingSummary,
    loadingMatchScore,
  } = state;

  return (
    <Container>
      <JobOverview>
        {loadingSummary ? (
          <Grid m={"auto"}>
            <CircularProgress color="success" />
          </Grid>
        ) : (
          <>
            <Typography pl={3} pt={1.2} fontSize={"1.3rem"}>
              {jobTitle && jobTitle !== "" ? jobTitle : "Job Title"}
            </Typography>
            <Typography pl={3} pb={2} fontSize={"1rem"}>
              {companyName && companyName !== "" ? companyName : "Company Name"}
            </Typography>
          </>
        )}
      </JobOverview>

      <JobMatchScore>
        <Typography mt={0.5} whiteSpace={"nowrap"} fontSize={"0.9rem"}>
          Match Score
        </Typography>
        {loadingMatchScore ? (
          <Grid>
            <CircularProgress color="success" />
          </Grid>
        ) : (
          <Typography fontSize={"1.8rem"}>{matchScore}</Typography>
        )}
      </JobMatchScore>
    </Container>
  );
}
