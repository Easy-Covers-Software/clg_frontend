import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { UnSelectedButton } from "@/components/Global/Global";
import { FormControl, TextField } from "@mui/material";

const Container = styled(Grid)`
  width: 100%;
  display: flex;
  padding-right: 1%;
  height: 80px;
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

  @media screen and (min-width: 600px) and (max-width: 900px) {
    font-size: 0.64rem;
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

namespace CustomReQueryStyledComponents {
  export const SubmitButton = styled(UnSelectedButton)`
    // width: 96%;
    height: 4.3vh;
    margin-bottom: 2%;
    margin-top: -2%;

    font-size: 0.8rem;
    border: 1px solid #006d4b;
  `;

  export const CustomReQueryField = styled.textarea`
    width: 100%;
    height: 100%;
    min-height: 8vh
    resize: none;
    box-sizing: border-box;
    background-color: #fff;
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

namespace MediumReQueryInputStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    align-items: center;
    width: 14vw;
    gap: 16px;
    height: 100%;
    margin-top: 2%;
    // padding: 0 20%;

    @media screen and (min-width: 0px) and (max-width: 700px) {
      padding: 0 0;
    }

    @media screen and (min-width: 600px) and (max-width: 700px) {
      padding: 0 0;
    }

    @media screen and (min-width: 700px) and (max-width: 800px) {
      padding: 0 0;
    }

    @media screen and (min-width: 800px) and (max-width: 900px) {
      padding: 0 0;
    }

    @media screen and (min-width: 900px) and (max-width: 950px) {
      padding: 0 8%;
    }

    @media screen and (min-width: 950px) and (max-width: 1000px) {
      padding: 0 8%;
    }

    @media screen and (min-width: 1000px) and (max-width: 1100px) {
      padding: 0 8%;
    }

    @media screen and (min-width: 1100px) and (max-width: 1200px) {
      padding: 0 8%;
    }

    @media screen and (min-width: 1200px) and (max-width: 1300px) {
    }
  `;

  export const FormInput = styled(FormControl)`
    width: 100%;
    padding-right: 0;
  `;

  export const InputField = styled(TextField)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    // background-color: #f8f8ff;
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
    align-items: center;
    justify-content: space-between;
    // margin-top: 2%;
    width: fits-content;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      width: 80vw;
    }
    @media screen and (min-width: 600px) and (max-width: 900px) {
      // width: 100%;
    }
  `;

  export const MediumOptionsContainer = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 0 5%;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      padding: 0 0%;
    }
    @media screen and (min-width: 600px) and (max-width: 900px) {
      padding: 0 2%;
    }
  `;

  export const SubmitButton = styled(UnSelectedButton)`
    height: 4.3vh;
    margin-bottom: 2%;
    margin-top: -2%;

    font-size: 0.8rem;
    border: 1px solid #006d4b;
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
    // margin-bottom: 1%;
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
  CustomReQueryStyledComponents,
  MediumReQueryInputStyledComponents,
  MoreOptionsReQuerysStyledComponents,
  SimpleReQueryButtonStyledComponents,
};
