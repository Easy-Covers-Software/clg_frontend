import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { PrimaryButton } from "../Global/Global";
import { Box, FormControl, TextField, DialogContent } from "@mui/material";

const DialogContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin-top: -25%;
  gap: 24px;
  overflow: hidden;
`;

const CreateAccountContainer = styled(Grid)`
  padding: 5%;
`;

const DividerContainer = styled(Grid)`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5%;
`;

const SignInButton = styled(PrimaryButton)`
  width: 80%;
  padding: 12px 0;
  font-size: 1.2rem;
  margin: 0 auto;
`;

const FullLogo = styled.img`
  height: 300px;
  width: 100%;
  margin-top: 3%;
  margin-right: 4%;
`;

namespace LoginInputsStyledComponents {
  export const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin-top: -22%
  `;

  export const FormInput = styled(FormControl)`
    width: 95%;
    padding-right: 0;
  `;

  export const InputField = styled(TextField)`
    width: 95%;
    border-radius: 4px;
    border: 1px solid #006d4b;
    background-color: #fff;
    // padding: 2% 0;
  `;
}

namespace CreateAccountOptionsStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    justify-content: space-evenly;
    padding: 12px 0px;
  `;

  export const IconContainer = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid #006d4b;
    cursor: pointer;
    height: 10vh;
  `;

  export const GoogleSignInIcon = styled.img`
    height: 40px;
    width: 40px;
  `;

  export const EasyCoversSignInIcon = styled.img`
    height: 130px;
    width: 130px;
  `;
}

export {
  DialogContentContainer,
  CreateAccountContainer,
  DividerContainer,
  SignInButton,
  FullLogo,
  LoginInputsStyledComponents,
  CreateAccountOptionsStyledComponents,
};
