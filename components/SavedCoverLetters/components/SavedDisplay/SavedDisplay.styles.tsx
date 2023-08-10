import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Container = styled(Grid)`
  height: calc(100vh - 98px);
  width: 25vw;
  min-width: 25vw;

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
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1%;

  flex: 1;
  margin: 0 0.2%;
  padding: 2%;

  background-color: #f8f8ff;

  border: 1px solid #13d0b7;
  border-radius: 4px;
`;

namespace SavedLettersListStyledComponents {}

namespace SearchAndFilterStyledComponents {}

export { Container, SubContainer };
