import React from "react";

import { PrimaryButton, UnSelectedButton } from "@/components/Global/Global";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { ButtonGroup, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import { useCoverLetterResultsContext } from "@/context/ResultsContext";
import { useAuth } from "@/context/AuthContext";

import { SimpleReQueryButtonStyledComponents } from "../ReQueryOptions.styles";
const { Container, ButtonContainer } = SimpleReQueryButtonStyledComponents;

export default function SimpleReQueryButton({ buttonLabel }) {
  const { state, dispatch } = useAuth();
  const { makeSimpleAdjustment } = useCoverLetterResultsContext();

  const handleSimpleAdjustment = async (adjustmentType, buttonLabel) => {
    try {
      await makeSimpleAdjustment(adjustmentType, buttonLabel);
      dispatch({ type: "SET_UPDATE_USER", payload: state.updateUser });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Typography fontSize={"0.8rem"}>{buttonLabel}</Typography>
      <ButtonContainer>
        <IconButton
          onClick={() => {
            handleSimpleAdjustment("decrease", buttonLabel);
          }}
        >
          <RemoveCircleOutlineOutlinedIcon />
        </IconButton>

        <Divider orientation="vertical" />

        <IconButton
          onClick={() => {
            handleSimpleAdjustment("increase", buttonLabel);
          }}
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
}
