import { useState } from 'react';
import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import FeedbackCard from '../componenets/FeedbackCard/FeedbackCard';
import CommentsDialog from '../componenets/CommentsDialog/CommentsDialog';

const Container = styled(Grid2)`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 0 1%;
  // justify-content: center;
`;

const FeedbackColumn = styled(Grid2)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  // height: 100%;
  gap: 2%;
`;

const GeneralFeedback = ({
  feedback,
  updateFeedbackState,
  selectedFeedback,
}) => {
  console.log('feedback', feedback);

  const midpoint = Math.ceil(feedback.length / 2);
  const leftFeedback = feedback.slice(0, midpoint);
  const rightFeedback = feedback.slice(midpoint);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewFeedbackSelection = (feedback) => {
    updateFeedbackState('selectedFeedback', feedback);
    handleClickOpen();
  };

  // Assuming 'feedbacks' is an array of feedback data
  return (
    <>
      <Container>
        <FeedbackColumn
          style={{
            marginRight: '1%',
          }}
        >
          {/* Map through left feedback items and render LeftFeedbackCard for each */}
          {leftFeedback?.map((feedbackDetails, index) => (
            <FeedbackCard
              key={index}
              lor={'l'}
              index={index}
              feedbackDetails={feedbackDetails}
              handleNewFeedbackSelection={handleNewFeedbackSelection}
            />
          ))}
        </FeedbackColumn>

        <FeedbackColumn
          style={{
            marginLeft: '1%',
          }}
        >
          {/* Map through right feedback items and render RightFeedbackCard for each */}
          {rightFeedback?.map((feedbackDetails, index) => (
            <FeedbackCard
              key={index}
              lor={'r'}
              index={index}
              feedbackDetails={feedbackDetails}
              handleNewFeedbackSelection={handleNewFeedbackSelection}
            />
          ))}
        </FeedbackColumn>
      </Container>

      <CommentsDialog
        selectedFeedback={selectedFeedback}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default GeneralFeedback;
