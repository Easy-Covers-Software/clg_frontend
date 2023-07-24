import AdditionalDetailsFreeText from "./components/AdditionalDetailsFreeText";

import SimpleInput from "./components/SimpleInput";

import { Container } from "./AdditionalDetails.styles";

export default function AdditionalDetails() {
  return (
    <Container>
      {/* <Grid m={"auto"}>
        <Typography variant="additionalDetailsInfo">
          If you uploaded a resume and are confident with it, this generally
          isn't needed.
        </Typography>
      </Grid> */}

      <SimpleInput id={"simpleInput1"} />

      <SimpleInput id={"simpleInput2"} />

      <SimpleInput id={"simpleInput3"} />

      <AdditionalDetailsFreeText />
    </Container>
  );
}
