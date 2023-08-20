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
  @media screen and (min-width: 0px) and (max-width: 600px) {
    padding: 0 2%;
    align-items: center;
  }
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
  @media screen and (min-width: 0px) and (max-width: 600px) {
    // padding: 0 2%;
    width: 90%;
    margin: auto;
  }
  @media (max-width: 1000px) and (min-width: 900px) {
    font-size: 0.68rem;
  }
  @media (max-width: 1100px) and (min-width: 1000px) {
    font-size: 0.75rem;
  }
`;

const Tabs = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    // gap: 140%;
    // margin-top: -16%;
    // padding: 0 8%;
    width: 100%;
  }
`;

namespace SignedInDisplayStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    // align-items: center;
    width: 100%;
    gap: 8px;
    @media screen and (max-width: 1100px) {
      // gap: 140%;
      // margin-top: -16%;
      padding: 0 2%;
    }
  `;

  export const HorizontalDivider = styled(Divider)`
    margin: 1% 3%;
    min-width: 94%;
    @media screen and (max-width: 1100px) {
      // gap: 140%;
      // margin-top: -16%;
      // padding: 0 2%;
    }
  `;

  export const CoverLetterStatsContainer = styled(Grid)`
    width: 100%
    display: flex;
    flex-direction: column;
    gap: 3%;
    @media screen and (max-width: 1100px) {
      // gap: 140%;
      // margin-top: -16%;
      padding: 0 4%;
    }
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
