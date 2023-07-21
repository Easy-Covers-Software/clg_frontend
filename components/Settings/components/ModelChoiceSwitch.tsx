import * as React from "react";
import Switch from "@mui/material/Switch";
import { Typography } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

import { ModelChoiceSwitchStyledComponents } from "../SettingsDialog.styles";
const { Container, GreenSwitch } = ModelChoiceSwitchStyledComponents;

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Container>
      <Typography fontSize={"0.75rem"}>GPT-3.5</Typography>
      <GreenSwitch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        style={{ color: "#13d0b7" }}
      />
      <Typography fontSize={"0.75rem"}>GPT-4</Typography>
    </Container>
  );
}
