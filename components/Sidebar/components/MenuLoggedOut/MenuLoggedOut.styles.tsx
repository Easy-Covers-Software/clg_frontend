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
  gap: 24px;
  margin-top: -24%;
`;

const HorizontalDivider = styled(Divider)`
  margin: 5%;
`;

const GenerationModeTab = styled(UnSelectedButton)`
  white-space: nowrap;
  ${({ selected }) => (selected ? "background-color: #f5faf5;" : "white")}
  ${({ selected }) =>
    selected
      ? "none"
      : "box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"}
&:hover {
    ${({ selected }) =>
      selected
        ? "none"
        : "background-color: #f5faf5;"}background-color: #e0e0e0;
  }
  &:active {
    border-bottom: 2px solid #87dbd0;
  }
`;

export { Container, HorizontalDivider, GenerationModeTab };
