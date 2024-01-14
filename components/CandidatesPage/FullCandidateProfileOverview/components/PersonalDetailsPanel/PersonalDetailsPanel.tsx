import { CandidateListItem } from '@/Types/CandidatesSection.types';
import { PersonalDetailsGrid } from '../../FullCandidateProfileOverview.styles';
import { PersonalDetailsPaper } from '../../FullCandidateProfileOverview.styles';
import Divider from '@mui/material/Divider';

import {
  Header,
  DetailsContainer,
  DetailsColumn,
  LabelsGrid,
  ValuesGrid,
} from './PersonalDetailsPanel.styles';

interface Props {
  selectedCandidate: CandidateListItem;
}

const PersonalDetailsPanel: React.FC<Props> = ({ selectedCandidate }) => (
  <PersonalDetailsGrid xs={12}>
    <PersonalDetailsPaper elevation={3}>
      <Header>Personal Details</Header>

      <Divider />

      <DetailsContainer container>
        <DetailsColumn container spacing={1}>
          <LabelsGrid
            label1={'Name:'}
            label2={'Age:'}
            label3={'Phone:'}
            label4={'Email:'}
            size={3.2}
          />

          <ValuesGrid
            value1={selectedCandidate.name || 'N/A'}
            value2={selectedCandidate.age || 'N/A'}
            value3={selectedCandidate.phone_number || 'N/A'}
            value4={selectedCandidate.email || 'N/A'}
          />
        </DetailsColumn>

        <DetailsColumn container spacing={1}>
          <LabelsGrid
            label1={'City:'}
            label2={'State:'}
            label3={'Country:'}
            label4={'Zip Code:'}
            size={4.5}
          />

          <ValuesGrid
            value1={selectedCandidate.city || 'N/A'}
            value2={selectedCandidate.state || 'N/A'}
            value3={selectedCandidate.country || 'N/A'}
            value4={selectedCandidate.zip_code || 'N/A'}
          />
        </DetailsColumn>
      </DetailsContainer>
    </PersonalDetailsPaper>
  </PersonalDetailsGrid>
);

export default PersonalDetailsPanel;
