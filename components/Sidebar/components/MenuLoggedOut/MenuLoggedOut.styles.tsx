import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { UnSelectedButton } from "@/components/Global";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: -24%;
`;

const HorizontalDivider = styled(Divider)`
  margin: 5%;
`;

const GenerationModeTab = styled(UnSelectedButton)`
  background-color: #f5f5f5;
  border-bottom: 2px solid #13d0b7;
  &:hover {
    background-color: #e0e0e0;
    border-bottom: 2px solid #00bfa6;
  }
  &:active {
    border-bottom: 2px solid #87dbd0;
  }
`;

export { Container, HorizontalDivider, GenerationModeTab };
