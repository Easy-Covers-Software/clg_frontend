import { Typography } from "@mui/material";

import { CircularProgress } from "@mui/material";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";

import {
  Container,
  JobOverview,
  JobMatchScore,
} from "./GenerationSummary.styles";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function GenerationSummary() {
  const { state } = useSavedCoverLettersContext();
  const { selectedCoverLetter, selectedCoverLetterJobPosting } = state;

  console.log("selectedCoverLetter", selectedCoverLetterJobPosting);

  return (
    <Container>
      <JobOverview>
        <Typography className="job-summary-title">
          {selectedCoverLetterJobPosting?.job_title !== ""
            ? selectedCoverLetterJobPosting?.job_title
            : "Job Title"}
        </Typography>
        <Typography className="job-summary-company">
          {selectedCoverLetterJobPosting?.company_name !== ""
            ? selectedCoverLetterJobPosting?.company_name
            : "Company Name"}
        </Typography>
      </JobOverview>

      <JobMatchScore>
        <Typography className="job-summary-match-score-header">
          Match Score
        </Typography>
        <Typography className="job-summary-match-score">
          {selectedCoverLetter?.match_score !== ""
            ? selectedCoverLetter?.match_score
            : "0"}
        </Typography>
      </JobMatchScore>
    </Container>
  );
}
