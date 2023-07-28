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
import { Tooltip } from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";

import { DownloadUtils } from "@/Utils/utils";
const { generatePDF, generateDOCX } = DownloadUtils;

const Container = styled(Grid)`
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20%",
`;

export default function DownloadDropdown() {
  const { state, toggleIsDownloadDropdownOpen } = useSavedCoverLettersContext();

  const {
    isDownloadDropdownOpen,
    selectedCoverLetterParts,
    saveName,
    selectedCoverLetterHtml,
    updateCoverLetter,
  } = state;

  const { updateSnackbar } = useAuth();

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
    toggleIsDownloadDropdownOpen();
  };

  const handleCloseDownload = () => {
    setDownloadMenuAnchor(null);
    toggleIsDownloadDropdownOpen();
  };

  console.log("selectedCoverLetterParts", selectedCoverLetterParts);

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
        <MenuItem
          onClick={() => {
            if (updateCoverLetter !== null) {
              generatePDF(updateCoverLetter);
            } else {
              generatePDF(selectedCoverLetterParts);
            }
          }}
          disableRipple
        >
          <ListItemIcon>
            <PictureAsPdfOutlinedIcon />
          </ListItemIcon>
          <ListItemText> Download as PDF</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => generateDOCX(saveName, selectedCoverLetterHtml)}
          disableRipple
        >
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Download as DOCX</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
