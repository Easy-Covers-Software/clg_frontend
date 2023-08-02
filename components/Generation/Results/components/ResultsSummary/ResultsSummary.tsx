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
            <Typography className="job-summary-title">{job_title}</Typography>
            <Typography className="job-summary-company">
              {company_name}
            </Typography>
          </>
        )}
      </JobOverview>

      <JobMatchScore>
        <Typography className="job-summary-match-score-header">
          Match Score
        </Typography>
        {loadingMatchScore ? (
          <Grid>
            <CircularProgress color="success" />
          </Grid>
        ) : (
          <Typography className="job-summary-match-score">
            {match_score}
          </Typography>
        )}
      </JobMatchScore>
    </Container>
  );
}
