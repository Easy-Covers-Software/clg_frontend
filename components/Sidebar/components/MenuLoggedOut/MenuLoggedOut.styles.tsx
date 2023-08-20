import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { UnSelectedButton } from "@/components/Global/Global";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  // gap: 24px;
  margin-top: -24%;

  @media screen and (max-width: 1100px) {
    // gap: 140%;
    // margin-top: -16%;
    padding: 0 8%;
  }
`;

const HorizontalDivider = styled(Divider)`
  margin: 5%;
`;

const GenerationModeTab = styled(UnSelectedButton)`
  white-space: nowrap;

  &:active {
    border-bottom: 2px solid #87dbd0;
  }

  font-size: 0.8rem;

  @media (max-width: 1000px) and (min-width: 900px) {
    font-size: 0.68rem;
  }
  @media (max-width: 1100px) and (min-width: 1000px) {
    font-size: 0.75rem;
  }
`;

export { Container, HorizontalDivider, GenerationModeTab };
