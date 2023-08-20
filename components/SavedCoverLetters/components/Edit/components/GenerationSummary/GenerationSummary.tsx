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

  const getJobTitle = () => {
    if (selectedCoverLetterJobPosting?.job_title) {
      if (selectedCoverLetterJobPosting?.job_title.includes("Not Included")) {
        return "";
      } else if (selectedCoverLetterJobPosting?.job_title !== "") {
        return selectedCoverLetterJobPosting?.job_title;
      }
    } else {
      return "Job Title";
    }
  };

  const getCompanyName = () => {
    if (selectedCoverLetterJobPosting?.company_name) {
      if (
        selectedCoverLetterJobPosting?.company_name.includes("Not Included")
      ) {
        return "";
      } else if (selectedCoverLetterJobPosting?.company_name !== "") {
        return selectedCoverLetterJobPosting?.company_name;
      }
    } else {
      return "Company Name";
    }
  };

  const getMatchScore = () => {
    if (selectedCoverLetter?.match_score !== "") {
      return selectedCoverLetter?.match_score;
    } else {
      return "0";
    }
  };

  return (
    <Container>
      <JobOverview>
        <Typography className="job-summary-title">{getJobTitle()}</Typography>
        <Typography className="job-summary-company">
          {getCompanyName()}
        </Typography>
      </JobOverview>

      <JobMatchScore>
        <Typography className="job-summary-match-score-header">
          Match Score
        </Typography>
        <Typography className="job-summary-match-score">
          {getMatchScore()}
        </Typography>
      </JobMatchScore>
    </Container>
  );
}
