import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
  Box,
  Grid,
  Typography,
  FormLabel,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CalculateIcon from '@mui/icons-material/Calculate';

// Define a custom Grid for match score
const MatchScoreGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const FilterMenu = styled(FormControl)`
  margin-bottom: 5%;
  width: 98%;
`;

const StyledListItem = styled(ListItem)`
  border-bottom: 1px solid #13d0b7;
  background-color: white;
  padding-left: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5ff;
  }
`;

const CandidateRankings = ({
  candidateProfiles,
  jobPostingId,
  loadingId,
  updateSelectedCandidate,
  handleCalculate,
  handleListFilterChange,
  handleScoreFilterChange,
}) => {
  const [listFilterState, setListFilterState] = useState('rankings');
  const [scoreFilterState, setScoreFilterState] = useState('weighted');

  const handleListChange = (event) => {
    setListFilterState(event.target.value);
    handleListFilterChange(event);
  };

  const handleScoreFiltChange = (event) => {
    setScoreFilterState(event.target.value);
    handleScoreFilterChange(event);
  };

  const getScoreBasedOnFilter = (candidate) => {
    if (scoreFilterState === 'weighted') {
      return candidate.match_score[0]?.weighted_score;
    } else {
      return candidate.match_score[0]?.total_score;
    }
  };

  return (
    <Box p={2}>
      <Grid2
        container
        justifyContent={'space-between'}
        width={'100%'}
        height={'100%'}
        flexWrap={'nowrap'}
        whiteSpace={'nowrap'}
        gap={'1%'}
      >
        <FilterMenu>
          <FormLabel
            component="legend"
            sx={{
              position: 'relative',
              top: '8%',
              left: 0,
              fontSize: '0.9rem',
            }}
          >
            List Filter
          </FormLabel>
          <Select value={listFilterState} onChange={(e) => handleListChange(e)}>
            <MenuItem value="rankings">Rankings</MenuItem>
            <MenuItem value="all">All Candidates</MenuItem>
            <MenuItem value="unscored">Unscored Candidates</MenuItem>
          </Select>
        </FilterMenu>
        <FilterMenu>
          <FormLabel
            component="legend"
            sx={{
              position: 'relative',
              top: '8%',
              left: 0,
              fontSize: '0.9rem',
            }}
          >
            Score Filter
          </FormLabel>
          <Select
            value={scoreFilterState}
            onChange={(e) => handleScoreFiltChange(e)}
          >
            <MenuItem value="weighted">Weighted</MenuItem>
            <MenuItem value="total">Total</MenuItem>
          </Select>
        </FilterMenu>
      </Grid2>

      <Box>
        <Grid2 container justifyContent={'space-between'}>
          <Typography>Candidate</Typography>
          {scoreFilterState === 'weighted' ? (
            <Grid2 container alignItems={'center'}>
              <Typography>Score </Typography>
              <Typography fontSize={'0.75rem'}>&nbsp;(1-10)</Typography>
            </Grid2>
          ) : (
            <Grid2 container>
              <Typography>Score</Typography>
              <Typography fontSize={'0.75rem'}>&nbsp;(1-100)</Typography>
            </Grid2>
          )}
        </Grid2>

        <List component="nav">
          {candidateProfiles?.map((candidate, index) => (
            <StyledListItem
              key={index}
              onClick={() => updateSelectedCandidate(candidate)}
              style={{
                borderBottom:
                  index === candidateProfiles.length - 1
                    ? '0.4px solid #006D4B'
                    : 'none',
                borderTop: '0.4px solid #006D4B',
                cursor: loadingId ? 'wait' : 'pointer',
              }}
              disabled={loadingId ? true : false}
            >
              {listFilterState === 'rankings' && (
                <ListItemIcon
                  sx={{
                    minWidth: '30px',
                  }}
                >
                  <Typography variant="body1">{index + 1}</Typography>
                </ListItemIcon>
              )}
              {console.log('candidate', candidate)}
              <ListItemText
                primary={candidate.candidate}
                secondary={candidate.current_title}
              />
              <MatchScoreGrid>
                {candidate.match_score ? (
                  <Typography variant="caption">
                    {getScoreBasedOnFilter(candidate)}
                  </Typography>
                ) : loadingId && loadingId === candidate.id ? (
                  <CircularProgress style={{ color: '#13d0b7' }} />
                ) : (
                  <IconButton
                    disabled={loadingId !== null}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleCalculate(candidate.id);
                    }}
                    style={{
                      border: '1px solid #13d0b7',
                      backgroundColor: '#f5f5ff',
                      cursor: loadingId !== '' ? 'wait' : 'pointer',
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
    </Box>
  );
};

export default CandidateRankings;
