import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CalculateIcon from '@mui/icons-material/Calculate';
import { CircularProgress } from '@mui/material';

import {
  StyledPaper,
  JobPostingsListGrid,
} from '../FullCandidateProfileOverview.styles';

// Define a custom Grid that will hold the match score
const MatchScoreGrid = styled(Grid)(({ theme }) => ({
  width: '90%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const StyledListItem = styled(ListItem)`
  border-bottom: 1px solid #13d0b7;
  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: #f5f5ff;
  }
`;

const splitString = (inputString) => {
  if (inputString?.length > 32) {
    return inputString.substring(0, 32) + '...';
  } else {
    return inputString;
  }
};

const CandidateJobsList = ({
  currentJobs,
  updateSelectedJobPosting,
  handleCalculate,
}) => {
  return (
    <JobPostingsListGrid xs={12}>
      <StyledPaper elevation={3}>
        <Box p={2}>
          <Grid container borderBottom="0.4px solid #006D4B">
            <Typography textAlign={'center'}>Current Jobs</Typography>
          </Grid>
          <List component="nav">
            {currentJobs?.map((job, index) => (
              <StyledListItem
                key={index}
                onClick={() => {
                  updateSelectedJobPosting(job);
                }}
              >
                <ListItemText
                  primary={splitString(job.job_posting.position_title)}
                  secondary={job?.job_posting?.company?.name}
                />
                <MatchScoreGrid xs="auto">
                  {job.match_score && job.match_score[0] ? (
                    <Typography variant="caption">
                      {job.match_score[0]['weighted_score']} / 10
                    </Typography>
                  ) : (
                    <IconButton
                      style={{
                        border: '1px solid #13d0b7',
                        backgroundColor: '#f5f5ff',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleCalculate(job.id);
                      }}
                    >
                      <CalculateIcon />
                    </IconButton>
                  )}
                </MatchScoreGrid>
              </StyledListItem>
            ))}
          </List>
        </Box>
      </StyledPaper>
    </JobPostingsListGrid>
  );
};

export default CandidateJobsList;
