import styled from '@emotion/styled';
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Grid } from '@mui/material';

const Container = styled(Grid)`
  // height: calc(100vh - 98px);
  width: 22vw;
  min-width: 22vw;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1%;

  flex: 1;
  // margin: 0 0.2%;
  // padding: 0.3%;
  padding: 0.2%;

  background-color: white;

  border: 1px solid #006d4b;
  border-radius: 4px;
`;

const SubContainer = styled(Grid)`
  width: 100%;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3%;

  flex: 1;
  // margin: 0 0.2%;
  padding: 0.2%;
  // margin-bottom: 1%;

  border-radius: 4px;
  border: 1px solid #006d4b;
  background-color: #f8f8ff;
`;

namespace SavedLettersListStyledComponents {}

namespace SearchAndFilterStyledComponents {}

export { Container, SubContainer };
