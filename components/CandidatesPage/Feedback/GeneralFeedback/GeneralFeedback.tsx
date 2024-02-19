import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import FeedbackCard from '../componenets/FeedbackCard';

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

const GeneralFeedback = ({ feedback }) => {
  // Assuming 'feedbacks' is an array of feedback data
  return (
    <Container>
      <FeedbackColumn
        style={{
          marginRight: '1%',
        }}
      >
        <FeedbackCard lor={'l'} index={0} />
        {/* <FeedbackCard lor={'l'} style={{ marginTop: '1%' }} /> */}
        <FeedbackCard lor={'l'} index={1} />
        <FeedbackCard lor={'l'} index={2} />

        {/* Map through left feedback items and render LeftFeedbackCard for each */}
        {/* {feedback.left.map((feedbackCard, index) => (
          <LeftFeedbackCard key={index} {...feedbackCard} />
        ))} */}
      </FeedbackColumn>

      <FeedbackColumn
        style={{
          marginLeft: '1%',
        }}
      >
        <FeedbackCard lor={'r'} index={0} />
        {/* <FeedbackCard lor={'r'} style={{ marginTop: '16%' }} /> */}

        <FeedbackCard lor={'r'} index={1} />
        <FeedbackCard lor={'r'} index={2} />

        {/* Map through right feedback items and render RightFeedbackCard for each */}
        {/* {feedback.right.map((feedbackCard, index) => (
          <RightFeedbackCard key={index} {...feedbackCard} />
        ))} */}
      </FeedbackColumn>
    </Container>
  );
};

export default GeneralFeedback;
