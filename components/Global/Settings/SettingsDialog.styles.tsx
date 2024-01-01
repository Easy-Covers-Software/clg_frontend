import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import DialogContent from '@mui/material/DialogContent';
import Switch from '@mui/material/Switch';
import { UnSelectedButton } from '../Global';

const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: -8%;
  gap: 4px;

  @media screen and (min-width: 0px) and (max-width: 600px) {
    margin-top: -25%;
    gap: 1px;
    align-items: center;
  }
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
    // margin-top: 1%;

    // @media screen and (min-width: 0px) and (max-width: 600px) {
    //   margin-top: 0;
    // }
  `;

  export const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
      color: '#13d0b7',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: 'white',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#13d0b7',
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
      backgroundColor: '#13d0b7',
      // opacity: 0.5, // You can control the color opacity when switch is not checked
    },
  }));
}

namespace UpgradeAccountOptionStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    // gap: 12px;
    width: 82%;
    // max-width: 100%;
    border: 3px solid #13d0b7;
    border-radius: 8px;
    height: 10%;
    min-height: 10vh;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      gap: 1px;
      width: 100%;
      border: 1px solid #13d0b7;
      padding: 0;
      margin-top: 1%;
      justify-content: space-around;
    }
  `;

  export const PackageNameContainer = styled(Grid)`
    display: flex;
    flex-direction: row;
    gap: 10%;
    width: 40%;
    height: 60%;
    margin-left: 5%;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      gap: 1%;
      width: 50%;
      margin-left: 2%;
    }
  `;
  export const PackageDetailsContainer = styled(Grid)`
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: space-between;
    margin: auto;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      width: 30%;
      padding: 0;
    }
  `;

  export const FeatureList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100%;
    // text-align: left;
    // align-items: center;
    white-space: nowrap;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      margin-right: 35%;
      flex-direction: column;
    }
  `;

  export const PackageNameButtonSingle = styled(UnSelectedButton)`
    height: 40%;
    width: 100%;
    font-size: 0.7rem;
    white-space: nowrap;
  `;

  export const PackageNameButtonDouble = styled(UnSelectedButton)`
    height: 60%;
    // width: 60%;
    font-size: 0.8rem;
    white-space: nowrap;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      height: 80%;
      width: 20%;
      padding: 0 2px;
      font-size: 0.7rem;
    }
  `;

  export const ButtonWithLabel = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-top: -2%;
    widtth: 100%;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      width: 80%;
    }
  `;

  export const ListItem = styled.li`
    font-size: 0.65rem;
  `;

  export const PricingButtonContainer = styled(Grid)`
    display: flex;
    gap: 10%;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      gap: 10%;
    }
  `;
}

export {
  DialogContentContainer,
  FullLogo,
  ModelChoiceSwitchStyledComponents,
  UpgradeAccountOptionStyledComponents,
};
