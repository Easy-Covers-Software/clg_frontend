import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';

const Container = styled(Grid)`
  width: 96%;
  height: 100%;
  margin: 0 auto;
  overflow-x: hidden;
`;

const Header = styled.h2`
  text-align: center;
  font-family: 'El Messiri', sans-serif;
`;

const InputField = styled(TextField)`
  background-color: white;
  height: 90%;
`;

export { Container, Header, InputField };
