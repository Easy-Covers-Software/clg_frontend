import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { UnSelectedButton } from "@/components/Global/Global";
import { FormControl, IconButton, TextField } from "@mui/material";

const Container = styled(Grid)`
  display: flex;
  padding-right: 1%;
  height: 80px;
`;

const MobileMoreOptionsContainer = styled(Grid)`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 2% 3%;
`;

const MoreOptions = styled(UnSelectedButton)`
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

const RestartIconButton = styled(IconButton)`
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

namespace CustomReQueryStyledComponents {
  export const CustomReQueryField = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 8vh
    resize: none;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1px solid #006d4b;
    border-radius: 4px;
    ::placeholder {
      color: #e2e2e2; // Change this to the color you want
    }
  `;
  export const SubmitButton = styled(UnSelectedButton)`
    width: 90%;
    height: 4.3vh;
    margin-bottom: 5%;

    font-size: 0.8rem;
    border: 1px solid #006d4b;

    background-color: #bacbba;
    color: white;

    &:hover {
      background-color: #a5b4a5;
      color: white;
    }

    &:disabled {
      background-color: #e9e9e9;
      color: lightgray;
      border: 1px solid lightgray;
      cursor: not-allowed;
    }

    @media screen and (min-width: 0px) and (max-width: 600px) {
      width: 50%;
    }
  `;
}

namespace MediumReQueryInputStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    align-items: center;
    gap: 16px;
    height: 100%;
    margin-top: 2%;
    padding: 0 2%;
  `;

  export const FormInput = styled(FormControl)`
    width: 100%;
  `;

  export const InputField = styled(TextField)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
  `;

  export const QuestionContainer = styled(Grid)`
    display: flex;
    justify-content: space-between;
    margin: 0 5px;
  `;
}

namespace MoreOptionsReQuerysStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 42%;
    overflow: scroll;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      width: 100%;
    }
  `;

  export const MediumOptionsContainer = styled(Grid)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      padding: 0 2%;
      gap: 4px;
    }
    @media screen and (min-width: 600px) and (max-width: 900px) {
      padding: 0 2%;
    }
  `;

  export const SubmitButton = styled(UnSelectedButton)`
    height: 4.3vh;
    margin-bottom: 2%;

    font-size: 0.8rem;
    border: 1px solid #006d4b;

    cursor: pointer;

    width: 90%;
    margin: auto;
    background-color: #bacbba;
    color: white;

    &:hover {
      background-color: #a5b4a5;
      color: white;
    }

    &:disabled {
      background-color: #e9e9e9;
      color: lightgray;
      border: 1px solid lightgray;
      cursor: not-allowed;
    }

    @media screen and (min-width: 0px) and (max-width: 600px) {
      margin-top: 2%;
      width: 50%;
      margin-bottom: 0.5%;
    }
  `;
}

namespace SimpleReQueryButtonStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 16%;
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

export {
  Container,
  MoreOptions,
  MobileMoreOptionsContainer,
  RestartIconButton,
  CustomReQueryStyledComponents,
  MediumReQueryInputStyledComponents,
  MoreOptionsReQuerysStyledComponents,
  SimpleReQueryButtonStyledComponents,
};
