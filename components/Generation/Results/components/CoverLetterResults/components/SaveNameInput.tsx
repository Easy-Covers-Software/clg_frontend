import { useState, MouseEvent } from "react";
import Menu from "@mui/material/Menu";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useAuth } from "@/context/AuthContext";
import { useGenerationContext } from "@/context/GenerationContext";
import { Tooltip } from "@mui/material";
import { TextField } from "@mui/material";
import { UnSelectedButton } from "@/components/Global/Global";
import { useMediaQuery } from "@mui/material";

export default function SaveNameInput() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { state, dispatch, saveCoverLetterResults, toggleIsSavedDropdownOpen } =
    useGenerationContext();

  const { jobDetails, isSavedDropdownOpen, disableSavedButton, saveName } =
    state;

  const { updateSnackbar } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleIsSavedDropdownOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleIsSavedDropdownOpen();
  };

  const handleSave = async () => {
    const response = await saveCoverLetterResults();

    if (response?.id !== "") {
      updateSnackbar(
        true,
        "success",
        `Cover Letter Saved Successfully as: '${saveName}'`
      );
    } else {
      updateSnackbar(
        true,
        "error",
        `Error saving cover letter: ${response.type}`
      );
    }
  };

  const handleInputChange = (event) => {
    console.log("event.target.value", event.target.value);

    dispatch({ type: "SET_SAVE_NAME", payload: event.target.value });
  };

  return (
    <>
      <Tooltip title="Save">
        <IconButton
          onClick={handleClick}
          disableRipple
          disableFocusRipple
          style={{
            margin: isMobile ? "auto" : "none",
          }}
          disabled={disableSavedButton}
        >
          <SaveOutlinedIcon fontSize="medium" />
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
            defaultValue={jobDetails.company_name}
            onChange={handleInputChange}
          />
          <UnSelectedButton onClick={handleSave}>Save</UnSelectedButton>
        </Grid>
      </Menu>
    </>
  );
}
