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
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";

const EmptyListGrid = styled(Grid)`
  text-align: center;
  padding: 1%;
  margin-top: 5%;
`;

export default function SavedLettersList() {
  const {
    state,
    dispatch,
    getUsersSavedCoverLetters,
    deleteSavedCoverLetter,
    resetSelected,
  } = useSavedCoverLettersContext();

  const {
    savedCoverLetters,
    selectedCoverLetter,
    updateSavedCoverLettersList,
    getSavedLoading,
    search,
  } = state;

  const {
    state: authState,
    dispatch: authDispatch,
    updateSnackbar,
    openAlertDialogConfirm,
    user,
  } = useAuth();
  const { didConfirmAlert } = authState;
  const [selected, setSelected] = useState<any | null>(null);

  const handleToggle = (selectedCoverLetter) => () => {
    // if (selected !== null && selected.id === selectedCoverLetter.id) {
    // setSelected(null);
    // dispatch({ type: "SET_SELECTED_COVER_LETTER", payload: null });
    // } else {
    setSelected(selectedCoverLetter);
    dispatch({
      type: "SET_SELECTED_COVER_LETTER",
      payload: selectedCoverLetter,
    });
    // }
  };

  const confirmDelete = async () => {
    const response = await deleteSavedCoverLetter();
    console.log("delete response", response);

    if (response) {
      updateSnackbar(true, "success", "Cover Letter Deleted Successfully");
      resetSelected();
      await getUsersSavedCoverLetters();
    } else {
      updateSnackbar(true, "error", "Error Deleting Cover Letter");
    }
  };

  const [originalCoverLetters, setOriginalCoverLetters] = useState([]);
  const [filteredCoverLetters, setFilteredCoverLetters] = useState([]);

  // Assume you get your savedCoverLetters from somewhere
  useEffect(() => {
    setOriginalCoverLetters(savedCoverLetters);
    setFilteredCoverLetters(savedCoverLetters);
  }, [savedCoverLetters]);

  useEffect(() => {
    if (state.search !== "") {
      const lowerCaseSearchString = state.search.toLowerCase();
      const newFilteredCoverLetters = savedCoverLetters.filter((coverLetter) =>
        coverLetter.save_name.toLowerCase().includes(lowerCaseSearchString)
      );
      setFilteredCoverLetters(newFilteredCoverLetters);
    } else {
      setFilteredCoverLetters(originalCoverLetters);
    }
  }, [search]);

  useEffect(() => {
    if (didConfirmAlert !== null && didConfirmAlert) {
      authDispatch({ type: "SET_DID_CONFIRM_ALERT", payload: false });
      confirmDelete();
    }
  }, [didConfirmAlert]);

  useEffect(() => {
    if (selectedCoverLetter !== null) {
      authDispatch({
        type: "SET_MOBILE_MODE_SAVED",
        payload: "edit",
      });
    }
  }, [selectedCoverLetter]);

  const hamdleDelete = async () => {
    openAlertDialogConfirm(
      true,
      "Delete Cover Letter",
      "Are you sure you want to delete this cover letter?",
      "Delete"
    );
  };

  console.log("filteredCoverLetters", typeof filteredCoverLetters);
  console.log("selected", selected);

  if (getSavedLoading) return <CircularProgress />;

  return (
    <List className="saved-letters-list">
      {user !== undefined && user !== null ? (
        <EmptyListGrid>
          <Typography>
            Not signed in. Sign in to save cover letters and view them here.
          </Typography>
        </EmptyListGrid>
      ) : filteredCoverLetters.length === 0 && search === "" ? (
        <EmptyListGrid>
          <Typography>
            None Saved! Generate a cover letter and save to view on this page.
          </Typography>
        </EmptyListGrid>
      ) : filteredCoverLetters.length === 0 ? (
        <EmptyListGrid>
          <Typography>
            No cover letters found with that name. Try another search.
          </Typography>
        </EmptyListGrid>
      ) : (
        <>
          {filteredCoverLetters.length > 0 &&
            filteredCoverLetters?.map((coverLetter, i) => {
              console.log("coverLetter ==*", coverLetter);
              const labelId = `radio-list-label-${coverLetter.save_name}-${i}`;

              return (
                <ListItem
                  key={labelId}
                  style={{
                    borderBottom: "0.4px solid #006D4B",
                  }}
                  secondaryAction={
                    <>
                      {selected?.id === coverLetter.id && ( // Assuming coverLetter has an id property
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
                  onClick={handleToggle(coverLetter)} // Assuming coverLetter has an id property
                >
                  <IconButton disableRipple>
                    <Radio
                      edge="start"
                      checked={selected?.id === coverLetter.id} // Assuming coverLetter has an id property
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      style={{
                        color: "#006D4B",
                      }}
                    />
                  </IconButton>
                  <ListItemText
                    id={coverLetter.id}
                    primary={coverLetter.save_name}
                  />
                </ListItem>
              );
            })}
        </>
      )}
    </List>
  );
}
