import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const CommentsDialog = ({ selectedFeedback, open, handleClose }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Feedback Summary
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {selectedFeedback?.message_subject}
          </Typography>
          <DialogContentText>{selectedFeedback?.message}</DialogContentText>
          <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
            Comments:
          </Typography>
          <List>
            {selectedFeedback?.comments.map((comment, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={comment.comment}
                  secondary={`Commented on: ${new Date(
                    comment.created_at
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CommentsDialog;
