import { Typography } from "@mui/material";

import { CircularProgress } from "@mui/material";

import { useGenerationContext } from "@/context/GenerationContext";

import { Container, JobOverview, JobMatchScore } from "./ResultsSummary.styles";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function ResultsSummary() {
  const { state } = useGenerationContext();
  const { jobDetails, loadingSummary, loadingMatchScore } = state;
  const { job_title, company_name, match_score } = jobDetails;

  console.log("jobDetails", jobDetails);

  return (
    <Container>
      <JobOverview>
        {loadingSummary ? (
          <Grid m={"auto"}>
            <CircularProgress color="success" />
          </Grid>
        ) : (
          <>
            <Typography variant="jobSummaryTitle">{job_title}</Typography>
            <Typography variant="jobSummaryCompany">{company_name}</Typography>
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
          <Typography variant="jobSummaryMatchScore">{match_score}</Typography>
        )}
      </JobMatchScore>
    </Container>
  );
}
