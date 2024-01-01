import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { UnSelectedButton } from '@/components/Global/Global';
import { FormControl, TextField } from '@mui/material';

namespace IntermediateAdjustmentStyledComponents {
  export const Container = styled(Grid)`
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

namespace IntermediateAdjustmentInputStyledComponents {
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

namespace CustomAdjustmentStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    margin-top: 10%;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      padding: 0 1%;
      width: 100%;
      margin-top: 2%;
    }
  `;

  export const SubContainer = styled(Grid)`
    height: 100%;
    margin-bottom: 15%;
    width: 96%;

    @media screen and (min-width: 0px) and (max-width: 600px) {
      padding: 0 1%;
      width: 100%;
    }
  `;

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

namespace AdvancedAdjustmentsStyledComponents {
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

export {
  IntermediateAdjustmentStyledComponents,
  IntermediateAdjustmentInputStyledComponents,
  CustomAdjustmentStyledComponents,
  AdvancedAdjustmentsStyledComponents,
};
