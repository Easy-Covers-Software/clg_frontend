import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import AdditionalDetailsFreeText from "./components/AdditionalDetailsFreeText";

import SimpleInput from "./components/SimpleInput";

import Typography from "@mui/material/Typography";

import { Container } from "./AdditionalDetails.styles";

export default function AdditionalDetails() {
  return (
    <Container>
      <Grid m={"auto"}>
        <Typography fontSize={"0.8rem"} m={"auto"}>
          If you uploaded a resume and are confident with it, this generally
          isn't needed.
        </Typography>
      </Grid>

      <SimpleInput id={"simpleInput1"} />

      <SimpleInput id={"simpleInput2"} />

      <SimpleInput id={"simpleInput3"} />

      <AdditionalDetailsFreeText />
    </Container>
  );
}
