import styled from '@emotion/styled';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Grid } from '@mui/material';

const Container = styled(Grid)`
  height: calc(100vh - 98px);
  width: 25vw;
  min-width: 25vw;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1%;

  flex: 1;
  margin: 0 0.2%;
  padding: 0.3%;

  background-color: white;

  border: 1px solid #13d0b7;
  border-radius: 4px;
`;

const SubContainer = styled(Grid)`
  height: calc(100vh - 98px);
  width: 20vw;
  min-width: 20vw;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1%;

  flex: 1;
  margin: 0 0.2%;
  padding: 0.3%;
  

  background-color: #f8f8ff;

  border: 1px solid #13d0b7;
  border-radius: 4px;

  width: 100%;
`;

namespace SavedLettersListStyledComponents {}

namespace SearchAndFilterStyledComponents {}

export { Container, SubContainer };
