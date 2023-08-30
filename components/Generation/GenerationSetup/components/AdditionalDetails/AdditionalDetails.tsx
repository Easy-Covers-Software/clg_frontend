import AdditionalDetailsFreeText from './components/AdditionalDetailsFreeText';

import SimpleInput from './components/SimpleInput';

import { Container } from './AdditionalDetails.styles';

export default function AdditionalDetails() {
  return (
    <Container>
      <SimpleInput id={'1'} />

      <SimpleInput id={'2'} />

      <SimpleInput id={'3'} />

      <AdditionalDetailsFreeText />
    </Container>
  );
}
