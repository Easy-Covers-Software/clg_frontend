import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 196px);
  min-height: calc(100vh - 196px);
  max-height: calc(100vh - 196px);
  margin: 0% 1%;
  background-color: white;
  background-color: #f8f8ff;
  // background-color: white;
  border-top: none;
  // width: 58%;
  border-radius: 4px;
  border: 1px solid #006d4b;
  margin-bottom: 0.5%;
  margin-top: -1%;

  // overflow: auto;
`;

const SubContainer = styled(Grid)`
  height: calc(100vh - 264px);
  min-height: calc(100vh - 264px);
  max-height: calc(100vh - 264px);
  display: flex;
  // justify-content: center;
  margin: 0 auto;
  width: 100%;
`;

const ContentWrapper = styled(Grid)`
  overflow: scroll; // Set overflow as needed
  flex: 1;
`;

namespace DownloadOptionsMenuStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 55%;
    border: 1px solid #006d4b;
    background-color: #f5f5f5;
    border-radius: 4px;
    width: 100%;
    margin: 0;
    marginleft: 3%;
  `;
}

export {
  Container,
  SubContainer,
  ContentWrapper,
  DownloadOptionsMenuStyledComponents,
};
