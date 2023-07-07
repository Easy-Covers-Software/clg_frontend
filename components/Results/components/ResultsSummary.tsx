import React from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Container = styled(Grid)`
  display: flex;
  width: 100%;
  height: 100px;
  overflow: hidden; // Add this line
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 0.2% 0.75% 0 0.75%;
`;

const JobOverviewContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80.5%;
`;

const JobMatchScoreContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const JobOverview = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 99%;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #fff;
`;

const JobMatchScore = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
  // padding: 1% 10%;
  // padding: 0 0 1% 0;
  width: 8.8vw;
  height: 94%;
  background-color: #fff;
`;

export default function ResultsSummary() {
  return (
    <Container>
      <JobOverviewContainer>
        <JobOverview>
          <Typography pl={2} pt={2} fontSize={"1.3rem"}>
            Full Stack Software Engineer
          </Typography>
          <Typography pl={2} pb={2} fontSize={"1rem"}>
            CompanyXYZ Inc.
          </Typography>
        </JobOverview>
      </JobOverviewContainer>

      <JobMatchScoreContainer>
        <JobMatchScore>
          <Typography mt={0.5} whiteSpace={"nowrap"} fontSize={"0.9rem"}>
            Match Score
          </Typography>
          <Typography fontSize={"1.8rem"}>8.3</Typography>
        </JobMatchScore>
      </JobMatchScoreContainer>
    </Container>
  );
}
