import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

const Container = styled(Grid)`
  display: flex;
  width: 100%;
  gap: 0.5%;
  height: 14vh;
  min-height: 90px;

  overflow: hidden; // Add this line
  border-radius: 4px 4px 0 0;
  padding: 0.2% 0.75% 0 0.75%;
  margin-bottom: 0.25%;
`;

const MainContent = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
  margin: 0.3% 0;
  padding: 1.5%;
  overflow: hidden;

  @media screen and (min-width: 0px) and (max-width: 700px) {
    padding: 2.25% 3%;
  }
`;

const ExtraInfo = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
  min-width: 12vw;
  margin: 0.3% 0;
  padding: 1% @media screen and (min-width: 0px) and (max-width: 500px) {
    width: 32vw;
  }

  @media screen and (min-width: 500px) and (max-width: 600px) {
    width: 32vw;
  }

  @media screen and (min-width: 600px) and (max-width: 700px) {
    width: 28vw;
  }

  @media screen and (min-width: 700px) and (max-width: 800px) {
    width: 24vw;
  }

  @media screen and (min-width: 800px) and (max-width: 900px) {
    width: 19vw;
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

export { Container, MainContent, ExtraInfo };
