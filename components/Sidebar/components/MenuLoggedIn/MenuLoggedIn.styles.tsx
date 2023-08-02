import styled from "@emotion/styled";
import { PrimaryButton, UnSelectedButton } from "@/components/Global/Global";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: -24%;
  color: #006d4b;
`;

const GenerationModeTab = styled(UnSelectedButton)`
  white-space: nowrap;
  &:active {
    border-bottom: 2px solid #87dbd0;
  }

  &:hover {
    border-bottom: 2px solid #87dbd0;
    background-color: #f5f5f5;
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
    // align-items: center;
    width: 100%;
    gap: 8px;
  `;

  export const HorizontalDivider = styled(Divider)`
    margin: 1% 3%;
    min-width: 94%;
  `;

  export const CoverLetterStatsContainer = styled(Grid)`
    width: 100%
    display: flex;
    flex-direction: column;
    gap: 3%;
  `;
  export const EmailGrid = styled(Grid)`
    width: 100%
    display: flex;
  `;

  export const StatContainer = styled(Grid)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    // padding: 3% 0;
    margin: 8% 0;
  `;
}

export { Container, GenerationModeTab, Tabs, SignedInDisplayStyledComponents };
