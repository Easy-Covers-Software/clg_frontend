import styled from '@emotion/styled';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, Avatar, IconButton } from '@mui/material';
import { deepPurple, lightGreen } from '@mui/material/colors';
import { Stack, Rating, Paper } from '@mui/material';
import MarkUnreadChatAltTwoToneIcon from '@mui/icons-material/MarkUnreadChatAltTwoTone';

const determineMarginTop = (lor, index) => {
  console.log('lor:', lor, 'index:', index);

  if (index === 0) {
    if (lor === 'l') {
      return '3%';
    } else {
      return '8%';
    }
  } else {
    return 0;
  }
};

interface CustomProps {
  side: string; // or a union like: 'left' | 'right'
  index: number;
}

const Container = styled(Grid2)<CustomProps>`
  height: 26vh;
  max-height: 26vh;
  width: 24vw;
  display: flex;
  flex-direction: column;
  margin-top: ${({ side, index }) => determineMarginTop(side, index)};

  // if hover change cursor
  &:hover {
    cursor: pointer;
  }
`;

const FeedbackOverview = styled(Grid2)`
  height: 4vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 1%;
  margin: auto;
`;

const FeedbackContent = styled(Paper)`
  height: 15vh;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #006d4b;
  padding: 0.8%;
`;

const FeedbackContentText = styled(Typography)`
  font-size: 0.85rem;
  color: #006d4b;
`;

const FeedbackRating = styled(Grid2)`
  height: 4vh;
  width: 100%;
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const FeedbackTitle = styled(Typography)`
  font-size: 1.25rem;
  margin-bottom: -2.5%;
`;

const HeaderGroup = styled(Grid2)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 1%;
  width: 4.2vw;
`;

const FeedbackCard = ({
  lor,
  index,
  feedbackDetails,
  handleNewFeedbackSelection,
}) => {
  return (
    <Container
      side={lor}
      index={index}
      onClick={() => handleNewFeedbackSelection(feedbackDetails)}
    >
      {/* 1. FeedbackOverview */}
      <FeedbackOverview>
        {lor === 'l' ? (
          <>
            <FeedbackTitle>{feedbackDetails.message_subject}</FeedbackTitle>
            {/* <HeaderGroup> */}
            <IconButton
              sx={{
                margin: 0,
                padding: 0,
              }}
            >
              <MarkUnreadChatAltTwoToneIcon />
            </IconButton>
            {/* </HeaderGroup> */}
          </>
        ) : (
          <>
            {/* <HeaderGroup> */}
            <IconButton
              sx={{
                margin: 0,
                padding: 0,
              }}
            >
              <MarkUnreadChatAltTwoToneIcon />
            </IconButton>
            {/* </HeaderGroup> */}
            <FeedbackTitle>{feedbackDetails.message_subject}</FeedbackTitle>
          </>
        )}
      </FeedbackOverview>

      {/* 2/ FeedbackContent */}
      <FeedbackContent>
        <FeedbackContentText>{feedbackDetails.message}</FeedbackContentText>
      </FeedbackContent>

      {/* 3. FeedbackRating */}
      <FeedbackRating>
        {/* <IconButton>
          <MarkUnreadChatAltTwoToneIcon />
        </IconButton> */}

        <Rating value={2.5} />
        <Avatar
          sx={{
            bgcolor: '#f8f8ff',
            height: 26,
            width: 26,
            fontSize: '0.8rem',
            border: '1px solid #006d4b',
            color: '#006d4b',
          }}
        >
          DS
        </Avatar>
      </FeedbackRating>
    </Container>
  );
};

export default FeedbackCard;
