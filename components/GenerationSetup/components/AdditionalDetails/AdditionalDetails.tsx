import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import AdditionalDetailsFreeText from "./components/AdditionalDetailsFreeText";
import styled from "@emotion/styled";

import SimpleInput from "./components/SimpleInput";

import Typography from "@mui/material/Typography";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  width: 100%;
  height: 100%;
  padding: 2% 1% 1% 1%;
  gap: 3%;
`;

export default function AdditionalDetails() {
  return (
    <Container>
      <Grid m={"auto"}>
        <Typography fontSize={"0.8rem"} m={"auto"}>
          If you uploaded a resume and are confident with it, this generally
          isn't needed. Fill in as much or as little as you want.
        </Typography>
      </Grid>

      <SimpleInput id={"simpleInput1"} />

      <SimpleInput id={"simpleInput2"} />

      <SimpleInput id={"simpleInput3"} />

      {/* <SimpleInput id={"simpleInput4"} /> */}
      <AdditionalDetailsFreeText />
    </Container>
  );
}
