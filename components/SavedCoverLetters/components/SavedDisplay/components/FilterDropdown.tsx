import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";

export default function FilterDropdown() {
  const { state, toggleFilterDropdownIsOpen } = useSavedCoverLettersContext();
  const { isFilterDropdownOpen } = state;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleFilterDropdownIsOpen();
  };
  const handleClose = () => {
    setAnchorEl(null);
    toggleFilterDropdownIsOpen();
  };

  console.log("isFilterDropdownOpen", isFilterDropdownOpen);

  return (
    <Grid>
      <IconButton onClick={handleClick}>
        <TuneOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isFilterDropdownOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Date Created</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Grid>
  );
}
