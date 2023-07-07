import React from "react";

import { PrimaryButton, UnSelectedButton } from "@/components/Global";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { ButtonGroup, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 16%;
  height: 68%;
  margin: auto;
  // margin-bottom: 1%;
`;
const ButtonContainer = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  border: 1px solid #006d4b;
  border-radius: 4px;
  background-color: #fff;
  height: 72%;
  margin: auto;
  margin-bottom: 2%;
`;

export default function SimpleReQueryButton({ buttonLabel }) {
  return (
    <Container>
      <Typography fontSize={"0.8rem"}>{buttonLabel}</Typography>
      <ButtonContainer>
        <IconButton>
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>

        <Divider orientation="vertical" />

        <IconButton>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
}
