import { Typography } from "@mui/material";

import { CircularProgress } from "@mui/material";

import { useGenerationContext } from "@/context/GenerationContext";

import { Container, JobOverview, JobMatchScore } from "./ResultsSummary.styles";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function ResultsSummary() {
  const { state } = useGenerationContext();
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
            <Typography variant="jobSummaryTitle">
              {jobTitle && jobTitle !== "" ? jobTitle : "Job Title"}
            </Typography>
            <Typography variant="jobSummaryCompany">
              {companyName && companyName !== "" ? companyName : "Company Name"}
            </Typography>
          </>
        )}
      </JobOverview>

      <JobMatchScore>
        <Typography variant="jobSummaryMatchScoreHeader">
          Match Score
        </Typography>
        {loadingMatchScore ? (
          <Grid>
            <CircularProgress color="success" />
          </Grid>
        ) : (
          <Typography variant="jobSummaryMatchScore">{matchScore}</Typography>
        )}
      </JobMatchScore>
    </Container>
  );
}
