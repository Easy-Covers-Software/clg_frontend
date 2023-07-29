import AdditionalDetailsFreeText from "./components/AdditionalDetailsFreeText";

import SimpleInput from "./components/SimpleInput";

import { Container } from "./AdditionalDetails.styles";

export default function AdditionalDetails() {
  return (
    <Container>
      <SimpleInput id={"simpleInput1"} />

      <SimpleInput id={"simpleInput2"} />

      <SimpleInput id={"simpleInput3"} />

      <AdditionalDetailsFreeText />
    </Container>
  );
}
