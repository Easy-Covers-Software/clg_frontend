import * as React from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { useSavedCoverLettersContext } from "@/context/SavedCoverLettersContext";
import { useAuth } from "@/context/AuthContext";
import { DownloadUtils } from "@/Utils/utils";
const { generatePDF, generateDOCX } = DownloadUtils;

export default function DownloadDropdown() {
  const { state, toggleIsDownloadDropdownOpen } = useSavedCoverLettersContext();
  const {
    isDownloadDropdownOpen,
    selectedCoverLetterParts,
    saveName,
    selectedCoverLetterHtml,
    updateCoverLetter,
    updateCoverLetterParts,
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

  const handlePDFDownload = async () => {
    let success = false;
    if (updateCoverLetter !== null) {
      success = await generatePDF(updateCoverLetterParts, saveName);
    } else {
      success = await generatePDF(selectedCoverLetterParts, saveName);
    }
    if (success) {
      updateSnackbar(
        true,
        "success",
        "Successfully Exported Cover Letter as PDF"
      );
    } else {
      updateSnackbar(true, "error", "Error Exporting Cover Letter as PDF");
    }
    handleCloseDownload();
  };

  const handleDOCXDownload = async () => {
    let success = false;
    if (updateCoverLetter !== null) {
      success = await generateDOCX(saveName, updateCoverLetter);
    } else {
      success = await generateDOCX(saveName, selectedCoverLetterHtml);
    }
    if (success) {
      updateSnackbar(
        true,
        "success",
        "Successfully Exported Cover Letter as DOCX"
      );
    } else {
      updateSnackbar(true, "error", "Error Saving Cover Letter as DOCX");
    }
    handleCloseDownload();
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
        <MenuItem onClick={handlePDFDownload} disableRipple>
          <ListItemIcon>
            <PictureAsPdfOutlinedIcon />
          </ListItemIcon>
          <ListItemText> Download as PDF</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDOCXDownload} disableRipple>
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Download as DOCX</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
