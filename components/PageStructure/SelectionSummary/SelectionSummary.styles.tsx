import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';

export const Container = styled(Grid2)`
  width: 100%;
  height: 12vh;
  min-height: 90px;
  margin: auto;

  display: flex;
  gap: 0.1%;
  border-radius: 4px;
`;

export const MainContentContainer = styled(Grid2)`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 1% 0 1% 2%; /* top right bottom left */

  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
`;

export const SupplementalInfoContainer = styled(Grid2)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #f8f8ff;
  min-width: 12vw;
  @media screen and (min-width: 0px) and (max-width: 500px) {
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
