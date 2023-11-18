import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { UnSelectedButton } from '@/components/Global/Global';

namespace GenerateButtonStyledComponents {
  export const Container = styled(Grid)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2%;
  `;
}

namespace OneModelAvailableButtonStyledComponents {
  export const Container = styled(Grid)`
    width: 100%;
    display: flex;
    padding: 0;
    margin: 0;
  `;

  export const GenerateButton = styled(UnSelectedButton)`
    background-color: #bacbba;
    color: white;
    font-size: 0.95rem;
    letter-spacing: 1px;
    margin: auto;
    margin-bottom: 0.5%;

    // width: 60%;

    &:hover {
      background-color: #a5b4a5;
      color: white;
    }

    &:disabled {
      background-color: #e9e9e9;
      color: lightgray;
      border: 1px solid lightgray;
    }

    @media screen and (max-width: 900px) {
      font-size: 0.9rem; // Adjust font size for smaller screens
      height: 12%;
    }
  `;
}

namespace TwoModelsAvailableButtonStyledComponents {
  export const Container = styled(Grid)`
    width: 100%;
    display: flex;
    padding: 0;
    margin: 0;
    background-color: white;
    margin-top: 0.5%;
  `;

  export const GenerateButton = styled(UnSelectedButton)`
    // height: 88%;
    width: 95%;
    margin: auto;

    background-color: #bacbba;
    color: white;
    font-size: 0.95rem;
    letter-spacing: 1px;
    white-space: nowrap;

    &:hover {
      background-color: #a5b4a5;
      color: white;
    }
    &:disabled {
      background-color: #e9e9e9;
      color: lightgray;
      border: 1px solid lightgray;
    }
  `;
}

export {
  GenerateButtonStyledComponents,
  OneModelAvailableButtonStyledComponents,
  TwoModelsAvailableButtonStyledComponents,
};
