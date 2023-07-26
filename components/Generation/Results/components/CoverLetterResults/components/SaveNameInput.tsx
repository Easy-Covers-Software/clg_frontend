import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import styled from "@emotion/styled";
import { useAuth } from "@/context/AuthContext";
import { useGenerationContext } from "@/context/GenerationContext";
import { Tooltip } from "@mui/material";

import { TextField } from "@mui/material";
import { UnSelectedButton } from "@/components/Global/Global";

const Container = styled(Grid)`
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20%",
`;

export default function SaveNameInput() {
  const { state, dispatch, saveCoverLetterResults, toggleIsSavedDropdownOpen } =
    useGenerationContext();

  const { companyName, isSavedDropdownOpen } = state;

  console.log("companyName", companyName);

  const { updateSnackbar } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleIsSavedDropdownOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleIsSavedDropdownOpen();
  };

  const handleSave = async () => {
    const response = await saveCoverLetterResults();

    console.log("response", response);

    console.log("response", response);
    if (response === "success") {
      updateSnackbar(
        true,
        "success",
        `Cover Letter Saved Successfully as: '${companyName}'`
      );
    } else {
      updateSnackbar(true, "error", `Error saving cover letter: ${response}`);
    }
  };

  const handleInputChange = (event) => {
    console.log("event.target.value", event.target.value);

    dispatch({ type: "SET_SAVE_NAME", payload: event.target.value });
  };

  return (
    <>
      <Tooltip title="Save">
        <IconButton onClick={handleClick}>
          <SaveOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isSavedDropdownOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          marginTop: "1%",
        }}
      >
        <Grid m={"3%"}>
          <TextField
            variant="outlined"
            margin="dense"
            defaultValue={companyName}
            onChange={handleInputChange}
          />
          <UnSelectedButton onClick={handleSave}>Save</UnSelectedButton>
        </Grid>
      </Menu>
    </>
  );
}
