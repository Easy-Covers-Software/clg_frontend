import { CandidateListItem } from '@/Types/CandidatesSection.types';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
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
import Preferences from './components/Preferences/Preferences';

import BasicInfo from './components/BasicInfo/BasicInfo';

import {
  PersonalDetailsGrid,
  PersonalDetailsPaper,
} from './PersonalDetailsPanel.styles';

interface Props {
  selectedCandidate: CandidateListItem;
}

const PersonalDetailsPanel: React.FC<any> = ({
  selectedCandidate,
  workPreferencesState,
}) => {
  //== For linked in and portfolio website ==//
  const openInNewTab = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('URL is undefined or empty');
    }
  };

  return (
    <PersonalDetailsGrid>
      <PersonalDetailsPaper>
        {/* <BasicInfo selectedCandidate={selectedCandidate} /> */}
        <Preferences workPreferencesState={workPreferencesState} />
      </PersonalDetailsPaper>
    </PersonalDetailsGrid>
  );
};

export default PersonalDetailsPanel;
