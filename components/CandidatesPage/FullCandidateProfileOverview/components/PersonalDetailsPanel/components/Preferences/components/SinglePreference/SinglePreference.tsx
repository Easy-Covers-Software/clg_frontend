import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Paper, Typography } from '@mui/material';

const Container = styled(Grid2)`
  // height: 10vh;
  // width: 18vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Typography)`
  // width: 100%;
  // height: 100%;

  position: relative;
  top: 3%;
  left: 3%;
`;

const SimplePreferencePaper = styled(Paper)`
  height: 7vh;
  width: 92%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #13d0b7;
`;

const PreferenceValue = styled(Typography)`
  font-size: 1.4rem;
`;

const SinglePreference = ({ type, value }) => {
  return (
    <Container>
      <Header>{type}</Header>
      <SimplePreferencePaper>
        <PreferenceValue>{value}</PreferenceValue>
      </SimplePreferencePaper>
    </Container>
  );
};

export default SinglePreference;
