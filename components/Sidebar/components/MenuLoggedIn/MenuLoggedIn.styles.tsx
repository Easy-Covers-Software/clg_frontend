import styled from "@emotion/styled";
import { PrimaryButton, UnSelectedButton } from "@/components/Global";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: -24%;
  color: ${(props) => props.theme.palette.primary.border_dark};
`;

const GenerationModeTab = styled(UnSelectedButton)`
  ${({ selected }) => (selected ? "background-color: #f5faf5;" : "white")}
  ${({ selected }) =>
    selected
      ? "none"
      : "box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"}
  // border-bottom: 2px solid #E6EAE6;
  &:hover {
    ${({ selected }) =>
      selected
        ? "none"
        : "background-color: #f5faf5;"}// background-color: #e0e0e0;
    // border-bottom: 2px solid #00bfa6;;;;;;;;;;;;;;;;;;
  }
  &:active {
    border-bottom: 2px solid #87dbd0;
  }
`;

const Tabs = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

namespace SignedInDisplayStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
  `;

  export const UserProfileInfo = styled(Grid)`
    width: 100%
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding: 0 2% 0 0;

  `;

  export const HorizontalDivider = styled(Divider)`
    margin: 1% 3%;
  `;

  export const CoverLetterStatsContainer = styled(Grid)`
    width: 100%
    display: flex;
    flex-direction: column;
    padding: 1% 5%;
    margin-bottom: 3%;
  `;

  export const StatContainer = styled(Grid)`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `;
}

export { Container, GenerationModeTab, Tabs, SignedInDisplayStyledComponents };
