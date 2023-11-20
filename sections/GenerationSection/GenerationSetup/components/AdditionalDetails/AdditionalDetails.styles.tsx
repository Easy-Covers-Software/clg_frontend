// Material UI related imports
import { styled as muiStyled } from "@mui/material/styles";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2% 1% 1% 1%;
  gap: 3%;
`;

namespace AdditionalDetailsFreeTextStyledComponents {
  export const AdditionalDetailsFreeTextField = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    box-sizing: border-box;
    background-color: white;
    padding: 2%;
    min-width: 100%;
    max-width: 100%;
    border-top: 1px solid #006d4b;
    border-radius: 4px;
    ::placeholder {
      color: #e2e2e2; // Change this to the color you want
    }
  `;
}

namespace SimpleInputStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 98%;
  `;

  export const InputField = styled(TextField)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    // background-color: white;
  `;
}

export {
  Container,
  AdditionalDetailsFreeTextStyledComponents,
  SimpleInputStyledComponents,
};
