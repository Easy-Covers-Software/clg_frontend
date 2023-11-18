import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';

const FormContainer = styled(Paper)`
  margin: 0 auto;
  overflow-x: hidden;
  border: 1px solid black;
  width: 96%;
  height: 92%;
  background-color: white;
  padding: 1%;
`;

const StatusContainer = styled(Paper)`
  margin: 0 auto;
  overflow-x: hidden;
  border: 1px solid black;
  width: 50%;
  height: 50%;
  background-color: white;
  margin-bottom: 20%;
`;

const Header = styled.h2`
  text-align: center;
  font-family: 'El Messiri', sans-serif;
`;

const InputField = styled(TextField)`
  height: 90%;
  background-color: #f8f8ff;
  background-color: white;
  border: 1px solid #006d4b;
  border-radius: 4px;
`;

export { FormContainer, StatusContainer, Header, InputField };
