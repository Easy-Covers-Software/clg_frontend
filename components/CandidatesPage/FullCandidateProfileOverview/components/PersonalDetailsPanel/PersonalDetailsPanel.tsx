import { CandidateListItem } from '@/Types/CandidatesSection.types';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import { GreenSwitch } from '@/components/Global/components/GreenSwitch';

import {
  PersonalDetailsGrid,
  PersonalDetailsPaper,
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
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 1.5%',
        }}
      >
        <Header>Personal Details</Header>
        <FormGroup
          sx={{
            marginRight: '1.5%',
          }}
        >
          <FormControlLabel
            control={<Switch color="success" />}
            label="Work Preferences"
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>

      <Divider />

      <DetailsContainer container>
        <DetailsColumn container spacing={1}>
          <LabelsGrid
            label1={'Name:'}
            label2={'Age:'}
            label3={'Phone:'}
            label4={'Email:'}
            size={2.5}
          />

          <ValuesGrid
            value1={selectedCandidate.name || 'N/A'}
            value2={selectedCandidate.age || 'N/A'}
            value3={selectedCandidate.phone_number || 'N/A'}
            value4={selectedCandidate.email || 'N/A'}
          />
        </DetailsColumn>

        <Divider orientation="vertical" flexItem />

        <DetailsColumn container spacing={1}>
          <LabelsGrid
            label1={'City:'}
            label2={'State:'}
            label3={'Country:'}
            label4={'Zip Code:'}
            size={3.5}
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
