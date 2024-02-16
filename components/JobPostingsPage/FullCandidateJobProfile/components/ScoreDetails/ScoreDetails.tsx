// ScoreDetails.tsx
import React from 'react';

import LoadingScore from './components/LoadingScore';
import AwaitingCalculation from './components/AwaitingCalculation';
import { ScoreDetailsPaper } from './ScoreDetails.styles';
import { Divider } from '@mui/material';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import {
  Header,
  ScoreTypeContainer,
  ScoreHeaderBox,
  ScoreHeader,
  ScoreDetailsContainer,
  ScoreDetailsBox,
  ScoreBox,
  ScoreValueBox,
  ScoreValue,
  ScoreVisualProgress,
} from './ScoreDetails.styles';

const ScoreDetails = ({
  page,
  jobPostingId,
  jobTitle,
  matchScoreDetails,
  loading,
  handleCalculate,
  //new
  scoreMode,
  updateScoreMode,
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
        <ScoreBox key={lor === 'l' ? i : i + 5} scoreName={scoreName}>
          <ScoreValueBox>
            <ScoreValue>{formatHeader(scoreName)}</ScoreValue>

            <ScoreValue>{scoreValue}/10</ScoreValue>
          </ScoreValueBox>

          <ScoreVisualProgress variant="determinate" value={scoreValue * 10} />
        </ScoreBox>
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

  // new
  const setScoreModeToWeighted = () => {
    updateScoreMode('weighted');
  };

  const setScoreModeToTotal = () => {
    updateScoreMode('total');
  };

  return (
    // <>
    //   <Header>Score Details</Header>

    <ScoreDetailsPaper>
      <ScoreTypeContainer>
        <ScoreHeaderBox
          isSelected={scoreMode === 'weighted'}
          onClick={() => {
            setScoreModeToWeighted();
          }}
        >
          <ScoreHeader isSelected={scoreMode === 'weighted'}>
            Weighted Score: {matchScoreDetails.weighted_score} / 10
          </ScoreHeader>
        </ScoreHeaderBox>

        <Divider orientation="vertical" flexItem />

        <ScoreHeaderBox
          isSelected={scoreMode === 'total'}
          onClick={() => {
            setScoreModeToTotal();
          }}
        >
          <ScoreHeader isSelected={scoreMode === 'total'}>
            Total Score: {matchScoreDetails.total_score} / 100
          </ScoreHeader>
        </ScoreHeaderBox>
      </ScoreTypeContainer>

      <ScoreDetailsContainer>
        <ScoreDetailsBox>{renderScores(leftColumnScores, 'l')}</ScoreDetailsBox>
        <ScoreDetailsBox>
          {renderScores(rightColumnScores, 'r')}
        </ScoreDetailsBox>
      </ScoreDetailsContainer>
    </ScoreDetailsPaper>
    // </>
  );
};

export default ScoreDetails;
