import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";

const Container = styled(Grid)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullLogo = styled.img`
  height: 60%;
  width: 70%;
  // margin: 0 auto;
  margin-top: -5%;
`;

const WelcomePaper = styled(Paper)`
  width: 50%;
  height: 50%;
  box-shadow: 3px 3px 3px 3px lightgray;
  margin-bottom: 12%;

  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  background-color: #f8f8ff;
  border: 3px solid #13d0b7;
`;

const Header = styled(Typography)`
  margin-top: -5%;
`;

const SubHeader = styled(Typography)`
  text-align: center;
  margin-top: 1%;
  margin-bottom: 5%;
`;

export { Container, FullLogo, WelcomePaper, Header, SubHeader };
