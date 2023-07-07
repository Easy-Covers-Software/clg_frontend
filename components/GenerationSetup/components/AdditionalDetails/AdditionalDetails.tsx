import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import AdditionalDetailsFreeText from "./components/AdditionalDetailsFreeText";
import styled from "@emotion/styled";

import SimpleInput from "./components/SimpleInput";

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2% 1% 1% 1%;
  gap: 3%;
`;

export default function AdditionalDetails() {
  return (
    <Container>
      {/* <Grid display={'flex'} flexDirection={'column'} gap={2} m={'0 2% 2% 2%'}> */}

      <Grid>
        <SimpleInput id={"simpleInput1"} />

        <SimpleInput id={"simpleInput2"} />
      </Grid>

      <Grid>
        <SimpleInput id={"simpleInput3"} />

        <SimpleInput id={"simpleInput4"} />
      </Grid>

      {/* </Grid> */}
      <AdditionalDetailsFreeText />
    </Container>
  );
}
