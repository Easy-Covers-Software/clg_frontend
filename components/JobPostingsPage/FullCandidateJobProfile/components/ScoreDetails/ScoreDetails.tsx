// ScoreDetails.tsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { ScoreDetailsPaper } from '../../FullCandidateJobProfile.styles';
import LoadingScore from './components/LoadingScore';
import AwaitingCalculation from './components/AwaitingCalculation';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#006D4B',
  },
}));

const Container = styled(Grid2)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;

const ScoreDetails = ({
  page,
  jobPostingId,
  jobTitle,
  matchScoreDetails,
  loading,
  handleCalculate,
}) => {
  // Splitting scores into two columns
  const scoreEntries = Object.entries(matchScoreDetails);
  const midIndex = Math.ceil(scoreEntries.length / 2);
  const leftColumnScores = scoreEntries.slice(0, midIndex);
  const rightColumnScores = scoreEntries.slice(midIndex);

  const formatHeader = (header) => {
    if (header === 'long_term_commitment_match_score') {
      return 'Long term';
    }

    // Remove '_match_score' from the string
    let formattedHeader = header.replace('_match_score', '');

    // Capitalize the first word
    formattedHeader =
      formattedHeader.charAt(0).toUpperCase() + formattedHeader.slice(1);

    // Replace underscores with spaces for remaining words
    formattedHeader = formattedHeader.replace(/_/g, ' ');

    return formattedHeader;
  };

  const checkIsScoreField = (scoreName) => {
    return (
      scoreName === 'total_score' ||
      scoreName === 'weighted_score' ||
      scoreName === 'id' ||
      scoreName === 'recruiter' ||
      scoreName === 'candidate' ||
      scoreName === 'job_posting' ||
      scoreName === 'created_at' ||
      scoreName === 'updated_at' ||
      scoreName === 'job_status'
    );
  };

  const renderScores = (scores, lor) =>
    scores.map(([scoreName, scoreValue], i) => {
      if (checkIsScoreField(scoreName))
        return <div key={lor === 'l' ? i : i + 5}></div>;

      return (
        <Box
          key={lor === 'l' ? i : i + 5}
          sx={{
            width: '86%',
            margin:
              scoreName === 'skill_match_score' ||
              scoreName === 'problem_solving_match_score'
                ? '0'
                : '18% 0',
          }}
        >
          <Grid container justifyContent={'space-between'}>
            <Typography
              variant="subtitle1"
              flexWrap={'nowrap'}
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {formatHeader(scoreName)}
            </Typography>

            <Typography
              variant="subtitle1"
              flexWrap={'nowrap'}
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {scoreValue}/10
            </Typography>
          </Grid>
          <BorderLinearProgress
            variant="determinate"
            value={scoreValue * 10}
            sx={{
              height: 10,
              marginTop: '1%',
              color: '#13d0b7',
            }}
          />
        </Box>
      );
    });

  if (!matchScoreDetails) {
    if (loading) {
      return <LoadingScore jobTitle={jobTitle} />;
    } else {
      return (
        <AwaitingCalculation
          page={page}
          jobPostingId={jobPostingId}
          handleCalculate={handleCalculate}
        />
      );
    }
  }

  return (
    <Container>
      <ScoreDetailsPaper>
        <Grid2 container direction={'column'}>
          <Typography variant="h5" marginLeft={'5%'} marginTop={'3%'}>
            Weighted Score: {matchScoreDetails.weighted_score} / 10
          </Typography>
          <Typography variant="h6" marginLeft={'5%'} marginTop={'1%'}>
            Total Score: {matchScoreDetails.total_score} / 100
          </Typography>
        </Grid2>

        <Grid2
          container
          justifyContent={'center'}
          alignItems={'space-between'}
          spacing={2}
          m={'0 auto'}
          sx={{
            width: '96%',
            marginLeft: '2%',
            // marginBottom: '2%',
            overflow: 'scroll',
            border: '1px solid #13d0b7',
            borderRadius: '4px',
          }}
        >
          <Grid2>{renderScores(leftColumnScores, 'l')}</Grid2>
          <Grid2>{renderScores(rightColumnScores, 'r')}</Grid2>
        </Grid2>
      </ScoreDetailsPaper>
    </Container>
  );
};

export default ScoreDetails;
