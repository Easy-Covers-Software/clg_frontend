import { CandidateListItem } from '@/Types/CandidatesSection.types';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import Grid from '@mui/material/Grid';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { GreenSwitch } from '@/components/Global/components/GreenSwitch';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import { IconButton } from '@mui/material';
import styled from '@emotion/styled';

import {
  PersonalDetailsContainer,
  DetailsContainer,
  DetailsColumn,
  LabelsGrid,
  ValuesGrid,
} from './BasicInfo.styles';

import {
  SectionHeader,
  SubDivider,
} from '../../../ProfessionalDetailsPanel/ProfessionalDetailsPanel.styles';

interface Props {
  selectedCandidate: CandidateListItem;
}

const Container = styled(Grid2)`
  height: 14vh;
  // display: flex;
`;

const BasicInfo: React.FC<any> = ({ selectedCandidate }) => {
  //== For linked in and portfolio website ==//
  const openInNewTab = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('URL is undefined or empty');
    }
  };

  return (
    <Container>
      <SectionHeader>Basic Info</SectionHeader>
      <SubDivider />
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
    </Container>
  );
};

export default BasicInfo;
