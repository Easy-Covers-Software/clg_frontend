import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import { styled as muiStyled } from "@mui/material/styles";
import { Switch } from "@mui/material";
import Typography from "@mui/material/Typography";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 2%;
  height: ${({ mode }) => (mode === "upload" ? "auto" : "100%")};
  background-color: white;
  border: none;
  resize: none;
  z-index: -10;
`;

const TypographyColored = styled(Typography)`
  color: #006d4b;
  text-decoration: ${({ selected }) => (selected ? "underline" : "none")};
`;

namespace FreeTextInputStyledComponents {
  export const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    resize: none;
    box-sizing: border-box;
    background-color: white;
    padding: 2%;
    border-top: 1px solid #006d4b;
    border-radius: 4px;
    margin-bottom: 2%;
    ::placeholder {
      color: #e2e2e2; // Change this to the color you want
    }
  `;
}

namespace PersonalDetailsModeSwitchStyledComponents {
  export const Container = styled(Grid)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #006d4b;
    border-left: 1px solid #006d4b;
    border-right: 1px solid #006d4b;
    border-radius: 8px 8px 0 0;
    padding: 0.5%;
    width: 50%;
    white-space: nowrap;
    background-color: #f8f8ff;
    // background-color: white;
    z-index: 1;
    border-bottom: 0;
  `;

  export const SwitchStyled = muiStyled(Switch)(() => ({
    width: 70,
    height: 26,
    padding: 0,
    margin: 8,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(42px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#13d0b7",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: "lightgray",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#13d0b7",
      opacity: 1,
    },
  }));
}

namespace ResumeUploadStyledComponents {
  export const Container = styled(Grid)`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    padding: 0 2%;
  `;

  export const DragDropContainer = styled(Grid)`
    height: 32vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2%;
    border-radius: 4px;
    border: 1px solid #006d4b;
    background-color: #f8f8ff;
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.1);
  `;
}

namespace UploadOptionStyledComponents {
  export const Container = styled(Grid)`
    height: 100%;
    width: 100%;
    border: 2px dashed #888;
    display: flex;
    background-color: white;
    border-radius: 4px;
  `;

  export const FileUploadInput = styled.input`
    display: none;
  `;

  export const Dropzone = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    cursor: pointer;
    :hover {
      background-color: #f5f5f5;
    }
  `;

  export const Label = styled.label`
    width: 100%;
    height: 100%;
    display: flex;
    white-space: nowrap;
  `;
}

export {
  Container,
  TypographyColored,
  FreeTextInputStyledComponents,
  PersonalDetailsModeSwitchStyledComponents,
  ResumeUploadStyledComponents,
  UploadOptionStyledComponents,
};
