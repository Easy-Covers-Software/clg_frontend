import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { CandidateListItem } from '@/Types/CandidatesSection.types';

interface Props {
  selectedCandidate: CandidateListItem;
}

const CandidateProfessionalDetails: React.FC<Props> = ({
  selectedCandidate,
}) => {
  //== skill chips ==//
  const skillChips = selectedCandidate.skills
    ?.split(',')
    .map((skill, index) => (
      <Chip key={index} label={skill.trim()} style={{ margin: '2px' }} />
    ));

  //== For linked in and portfolio website ==//
  const openInNewTab = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.log('URL is undefined or empty');
    }
  };

  return (
    <Grid2
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height={'100%'}
      width={'100%'}
      position="relative"
      pb={0}
      mb={0}
      pl={1}
      pr={1}
      pt={1}
    >
      <Box position="absolute" top={0} right={2} pb={0}>
        <IconButton
          aria-label="linkedin"
          // href={linkedinUrl}
          // target='_blank'
          disabled={selectedCandidate.linkedin_profile === ''}
          style={{
            color: selectedCandidate.linkedin_profile === '' ? 'grey' : 'blue',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            openInNewTab(selectedCandidate.linkedin_profile);
          }}
        >
          <LinkedInIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="website"
          href={selectedCandidate.portfolio_website}
          target="_blank"
          disabled={selectedCandidate.portfolio_website === ''}
          style={{
            color:
              selectedCandidate.portfolio_website === '' ? 'grey' : '#FFD966',
          }}
          onClick={() => {
            openInNewTab(selectedCandidate.portfolio_website);
          }}
        >
          <FolderSharedIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box flexGrow={1} width={'100%'}>
        <Grid container spacing={2} width={'78%'}>
          <Grid item xs={12}>
            <Typography fontSize={'1.3rem'}>
              {selectedCandidate.current_title} at{' '}
              {selectedCandidate.current_employer}
            </Typography>
            <Typography fontSize={'1rem'}>
              {selectedCandidate.education_level} in{' '}
              {selectedCandidate.education_field}
            </Typography>
            <Typography fontSize={'1rem'}>
              {selectedCandidate.education_institution}
            </Typography>
            <Typography fontSize={'1rem'}>
              Years of Experience:{' '}
              {selectedCandidate.years_of_experience || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          overflowY: 'scroll',
        }}
        pb={1}
      >
        <Typography variant="body2">Skills:</Typography>
        <Box display="flex" flexWrap="nowrap" mt={0}>
          {skillChips?.length > 0 ? skillChips : 'N/A'}
        </Box>
      </Box>
    </Grid2>
  );
};

export default CandidateProfessionalDetails;
