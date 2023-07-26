import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function SavedLettersList() {
  const { state, dispatch, deleteSavedCoverLetter, resetSelected } =
    useSavedCoverLettersContext();
  const {
    savedCoverLetters,
    selectedCoverLetter,
    updateSavedCoverLettersList,
  } = state;

  const {
    state: authState,
    updateSnackbar,
    openAlertDialogConfirm,
  } = useAuth();
  const { didConfirmAlert } = authState;

  console.log("savedCoverLetters", selectedCoverLetter);
  console.log("state", state);

  const [selected, setSelected] = useState<number | null>(null);

  const handleToggle = (value: number) => () => {
    if (selected !== value) {
      setSelected(value);
      dispatch({
        type: "SET_SELECTED_COVER_LETTER",
        payload: value,
      });
    } else {
      setSelected(null);
    }
  };

  const confirmDelete = async () => {
    const response = await deleteSavedCoverLetter();
    console.log("attempted delete", response);

    if (response === "success") {
      updateSnackbar(true, "success", "Cover Letter Deleted Successfully");
      resetSelected();
      dispatch({
        type: "SET_UPDATE_SAVED_COVER_LETTERS_LIST",
        payload: !updateSavedCoverLettersList,
      });
    } else {
      updateSnackbar(true, "error", "Error Deleting Cover Letter");
    }
  };

  useEffect(() => {
    if (didConfirmAlert !== null && didConfirmAlert) {
      confirmDelete();
    }
  }, [didConfirmAlert]);

  const hamdleDelete = async () => {
    openAlertDialogConfirm(
      true,
      "Delete Cover Letter",
      "Are you sure you want to delete this cover letter?"
    );
  };

  return (
    <List
      sx={{
        width: "94%",
        height: "100%",
        bgcolor: "#fff",
        borderRadius: "4px",
        border: "1px solid #006D4B",
        paddingTop: "0px",
        padding: "0 3%",
      }}
    >
      {!savedCoverLetters && <CircularProgress />}

      {savedCoverLetters.map((value) => {
        console.log("value", value);
        const labelId = `radio-list-label-${value.save_name}`;

        return (
          <ListItem
            key={labelId}
            style={{
              borderBottom: "1px solid #006D4B",
            }}
            secondaryAction={
              <>
                {selected === value && (
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={hamdleDelete}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                )}
              </>
            }
            disablePadding
            onClick={handleToggle(value)}
            // dense
          >
            <IconButton disableRipple>
              <Radio
                edge="start"
                checked={selected === value}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                style={{
                  color: "#006D4B",
                }}
              />
            </IconButton>
            <ListItemText id={labelId} primary={value.save_name} />
          </ListItem>
        );
      })}
    </List>
  );
}
