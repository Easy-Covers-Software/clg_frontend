import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { UnSelectedButton } from '@/components/Global/Global';
import { IconButton } from '@mui/material';

namespace SimpleAdjustmentsStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    padding-right: 1%;
    height: 80px;
  `;

  export const MobileContainer = styled(Grid)`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 2% 3%;
  `;

  export const SimpleAdjustmentsContainer = styled(Grid)`
    display: flex;
    width: 70%;
  `;

  export const ToggleAdvancedAdjustmentsButton = styled(UnSelectedButton)`
    width: 25%;
    height: 60%;
    font-size: 0.75rem;
    background-color: #fff;
    padding: 0;
    margin: auto;
    margin-bottom: 1.4%;
    white-space: nowrap;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      font-size: 0.82rem;
      width: 50%;
      height: 7vh;
    }

    @media screen and (min-width: 600px) and (max-width: 900px) {
      font-size: 0.64rem;
      width: 40%;
      height: 6vh;
    }

    @media screen and (min-width: 900px) and (max-width: 950px) {
      font-size: 0.68rem;
    }

    @media screen and (min-width: 950px) and (max-width: 1000px) {
      font-size: 0.7rem;
    }

    @media screen and (min-width: 1000px) and (max-width: 1100px) {
      font-size: 0.72rem;
    }
  `;
}

namespace SimpleAdjustmentsButtonGroupStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 25%;
    height: 68%;
    margin: auto;
  `;

  export const ButtonContainer = styled(Grid)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    border: 1px solid #006d4b;
    border-radius: 4px;
    background-color: #fff;
    height: 66%;
    margin: auto;
    margin-bottom: 2%;
  `;
}

namespace SimpleAdjustmentsMobileStyledComponents {
  export const RestartIconButton = styled(IconButton)`
    background-color: white;
    border-radius: 4px;
    border: 1px solid red;
    padding: 0;
    margin: 0;
    width: 7vh;
    min-width: 7vh;
    height: 7vh;
    min-height: 7vh;
  `;
}

export {
  SimpleAdjustmentsStyledComponents,
  SimpleAdjustmentsButtonGroupStyledComponents,
  SimpleAdjustmentsMobileStyledComponents,
};
