import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

export const Container = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
  height: 4vh;
  margin: 1.5%;
  border: 1px solid #006d4b;
  background-color: #f5f5f5;
  border-radius: 4px;
  width: 100%;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 33%;
    height: 7vh;
    margin: 0;
    padding: 0;
  }
`;
