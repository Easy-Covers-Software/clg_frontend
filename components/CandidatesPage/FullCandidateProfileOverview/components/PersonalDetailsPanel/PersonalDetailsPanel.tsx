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

const PersonalDetailsPanel: React.FC<any> = ({ selectedCandidate }) => {
  //== For linked in and portfolio website ==//
  const openInNewTab = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('URL is undefined or empty');
    }
  };

  return (
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
          <Grid>
            <IconButton
              onClick={() => openInNewTab(selectedCandidate.linkedin_link)}
              disabled={selectedCandidate.linkedin_link === null}
            >
              <LinkedInIcon
                sx={{
                  color:
                    selectedCandidate.linkedin_link === null
                      ? 'disabled'
                      : 'blue',
                }}
              />
            </IconButton>

            <IconButton
              onClick={() => openInNewTab(selectedCandidate.portfolio_link)}
              disabled={selectedCandidate.linkedin_link === null}
            >
              <FolderCopyIcon
                sx={{
                  color:
                    selectedCandidate.portfolio_link === null
                      ? 'disabled'
                      : '#f1c27d',
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => openInNewTab(selectedCandidate.github_link)}
              disabled={selectedCandidate.linkedin_link === null}
            >
              <GitHubIcon
                sx={{
                  color:
                    selectedCandidate.github_link === null
                      ? 'disabled'
                      : 'black',
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => openInNewTab(selectedCandidate.facebook_link)}
              disabled={selectedCandidate.linkedin_link === null}
            >
              <FacebookIcon
                sx={{
                  color:
                    selectedCandidate.facebook_link === null
                      ? 'disabled'
                      : '#3b5998',
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => openInNewTab(selectedCandidate.twitter_link)}
              disabled={selectedCandidate.linkedin_link === null}
            >
              <TwitterIcon
                sx={{
                  color:
                    selectedCandidate.twitter_link === null
                      ? 'disabled'
                      : '#1DA1F2',
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => openInNewTab(selectedCandidate.instagram_link)}
              disabled={selectedCandidate.linkedin_link === null}
            >
              <InstagramIcon
                sx={{
                  color:
                    selectedCandidate.instagram_link === null
                      ? 'disabled'
                      : '#C13584',
                }}
              />
            </IconButton>
          </Grid>
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
};

export default PersonalDetailsPanel;
