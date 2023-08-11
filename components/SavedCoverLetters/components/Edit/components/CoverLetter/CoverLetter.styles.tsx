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

  // gap: 3%;

  background-color: #f8f8ff;

  border-top: none;
  border-radius: 4px;
  border: 1px solid #006d4b;
  margin-bottom: 0.5%;
  margin-top: -1%;

  // overflow: auto;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
  }
`;

const SubContainer = styled(Grid)`
  height: calc(100vh - 264px);
  min-height: calc(100vh - 264px);
  max-height: calc(100vh - 264px);
  display: flex;
  // justify-content: center;
  margin: 0 auto;
  width: 100%;
  background-color: #f8f8ff;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    height: calc(100vh - 250px);
    max-height: calc(100vh - 250px);
  }
`;

const ContentWrapper = styled(Grid)`
  overflow: scroll; // Set overflow as needed
  flex: 1;
`;

namespace DownloadOptionsMenuStyledComponents {
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
}

export {
  Container,
  SubContainer,
  ContentWrapper,
  DownloadOptionsMenuStyledComponents,
};
