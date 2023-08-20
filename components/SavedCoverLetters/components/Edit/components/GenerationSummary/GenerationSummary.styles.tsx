import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

const Container = styled(Grid)`
  display: flex;
  width: 100%;
  gap: 0.5%;
  height: 12vh;
  min-height: 90px;

  overflow: hidden; // Add this line
  border-radius: 4px 4px 0 0;
  padding: 0.2% 0.75% 0 0.75%;
  margin-bottom: 0.25%;
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
  padding: 1% 3% 2.5% 3%;
  margin: 0.3% 0;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    padding: 2.25% 3%;
  }

  @media screen and (min-width: 600px) and (max-width: 700px) {
    padding: 2.5% 5% 3% 5%;
  }

  @media screen and (min-width: 700px) and (max-width: 800px) {
    padding: 2.5% 5% 3% 5%;
  }

  @media screen and (min-width: 800px) and (max-width: 900px) {
    padding: 2.1% 3% 2.5% 3%;
  }

  @media screen and (min-width: 900px) and (max-width: 950px) {
    padding: 1.95% 3% 2.5% 3%;
  }

  @media screen and (min-width: 950px) and (max-width: 1000px) {
    padding: 1.8% 3% 2.5% 3%;
  }

  @media screen and (min-width: 1000px) and (max-width: 1100px) {
    padding: 1.5% 3% 2.5% 3%;
  }

  @media screen and (min-width: 1100px) and (max-width: 1200px) {
    padding: 1.2% 3% 2.5% 3%;
  }
`;

const JobMatchScore = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
  width: 10vw;
  margin: 0.3% 0;

  @media screen and (min-width: 0px) and (max-width: 500px) {
    width: 34vw;
  }

  @media screen and (min-width: 500px) and (max-width: 600px) {
    width: 34vw;
  }

  @media screen and (min-width: 600px) and (max-width: 700px) {
    width: 26vw;
  }

  @media screen and (min-width: 700px) and (max-width: 800px) {
    width: 24vw;
  }

  @media screen and (min-width: 800px) and (max-width: 900px) {
    width: 22vw;
  }

  @media screen and (min-width: 900px) and (max-width: 950px) {
    width: 18vw;
  }

  @media screen and (min-width: 950px) and (max-width: 1000px) {
    width: 16vw;
  }

  @media screen and (min-width: 1000px) and (max-width: 1100px) {
    width: 14vw;
  }

  @media screen and (min-width: 1100px) and (max-width: 1200px) {
    width: 12vw;
  }

  @media screen and (min-width: 1200px) and (max-width: 1300px) {
    width: 11vw;
  }
`;

export { Container, JobOverview, JobMatchScore };
