import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DialogContent from "@mui/material/DialogContent";
import Switch from "@mui/material/Switch";
import { UnSelectedButton } from "../Global/Global";

const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -8%;
  gap: 4px;
  // width: 100%;
`;

const FullLogo = styled.img`
  height: 180px;
  width: 50%;
  margin: 0 auto;
  margin-top: -3%;
`;

namespace ModelChoiceSwitchStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1%;
  `;

  export const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase": {
      color: "#13d0b7",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "white",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#13d0b7",
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
      backgroundColor: "#13d0b7",
      // opacity: 0.5, // You can control the color opacity when switch is not checked
    },
  }));
}

namespace UpgradeAccountOptionStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    border: 3px solid #13d0b7;
    border-radius: 8px;
  `;

  export const PackageNameContainer = styled(Grid)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 1%;
    margin-left: 5%;
    margin-top: 3%;
    width: 40%;
  `;
  export const PackageDetailsContainer = styled(Grid)`
    width: 60%;
    // height: 100%;
    display: flex;
    justify-content: center;
    // justify-content: flex-end;
    align-items: space-between;
    padding-bottom: 6%;
    padding-right: 5%;
    flex-grow: 1;
  `;

  export const FeatureList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%; // this makes sure the list takes up the full height of the parent container
    text-align: left;
    // align-items: center;
  `;

  export const PackageNameButtonSingle = styled(UnSelectedButton)`
    height: 40%;
    width: 100%;
    font-size: 0.7rem;
    white-space: nowrap;
  `;

  export const PackageNameButtonDouble = styled(UnSelectedButton)`
    height: 60%;
    width: 100%;
    font-size: 0.8rem;
    white-space: nowrap;
  `;

  export const ButtonWithLabel = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -2%;
  `;

  export const ListItem = styled.li`
    font-size: 0.65rem;
  `;

  export const PricingButtonContainer = styled(Grid)`
    display: flex;
    gap: 5%;
  `;
}

export {
  DialogContentContainer,
  FullLogo,
  ModelChoiceSwitchStyledComponents,
  UpgradeAccountOptionStyledComponents,
};
