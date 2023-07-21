import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

const Container = styled(Grid)`
  display: flex;
  width: 100%;
  gap: 0.5%;
  // height: calc(100vh - 80vh);
  height: 90px;
  overflow: hidden; // Add this line
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 0.2% 0.75% 0 0.75%;
  // margin-top: -1%;
`;

const JobOverview = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
  margin: 0.3% 0;
  height: 90%;
`;

const JobMatchScore = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
  width: 8.8vw;
  margin: 0.3% 0;
  height: 90%;
`;

export { Container, JobOverview, JobMatchScore };
