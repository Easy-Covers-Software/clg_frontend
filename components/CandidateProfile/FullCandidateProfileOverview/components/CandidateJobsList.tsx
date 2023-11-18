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

const CandidateJobsList = ({
  jobPostings,
  loadingId,
  updateSelectedJobPosting,
  handleCalculate,
}) => {
  console.log('loadingId');
  console.log(loadingId);
  return (
    <Box p={2}>
      <Grid container borderBottom='0.4px solid #006D4B'>
        <Typography textAlign={'center'}>Current Jobs</Typography>
      </Grid>
      <List component='nav'>
        {jobPostings?.map((jobPosting, index) => (
          <StyledListItem
            key={index}
            disabled={loadingId !== ''}
            onClick={() => {
              updateSelectedJobPosting(jobPosting);
            }}
          >
            <ListItemText
              primary={jobPosting.job_title}
              secondary={jobPosting.company_name}
            />
            <MatchScoreGrid xs='auto'>
              {jobPosting.match_score ? (
                <Typography variant='caption'>
                  {jobPosting.match_score['weighted_score']} / 10
                </Typography>
              ) : loadingId !== '' && loadingId === jobPosting.id ? (
                <CircularProgress style={{ color: '#13d0b7' }} />
              ) : (
                <IconButton
                  style={{
                    border: '1px solid #13d0b7',
                    backgroundColor: '#f5f5ff',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleCalculate(jobPosting.id);
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
  );
};

export default CandidateJobsList;
