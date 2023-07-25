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
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";

import { TextField } from "@mui/material";
import { UnSelectedButton } from "@/components/Global/Global";

const Container = styled(Grid)`
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20%",
`;

export default function DownloadDropdown() {
  const { state, toggleIsDownloadDropdownOpen, generatePDF, generateDOCX } =
    useGenerationContext();

  const { isDownloadDropdownOpen } = state;

  const { updateSnackbar } = useAuth();

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleIsDownloadDropdownOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDownloadMenuAnchor(null);
    // toggleIsDownloadDropdownOpen();
  };

  console.log("isDownloadDropdownOpen", isDownloadDropdownOpen);

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
    toggleIsDownloadDropdownOpen();
  };
  const handleDownloadPDF = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };
  const handleDownloadDOCX = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };
  const handleCloseDownload = () => {
    setDownloadMenuAnchor(null);
    toggleIsDownloadDropdownOpen();
  };

  return (
    <>
      <Tooltip title="Download">
        <IconButton onClick={handleDownload}>
          <DownloadForOfflineOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={downloadMenuAnchor}
        open={isDownloadDropdownOpen}
        onClose={handleCloseDownload}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
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
        <MenuItem onClick={generatePDF} disableRipple>
          <ListItemIcon>
            <PictureAsPdfOutlinedIcon />
          </ListItemIcon>
          <ListItemText> Download as PDF</ListItemText>
        </MenuItem>

        <MenuItem onClick={generateDOCX} disableRipple>
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Download as DOCX</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
