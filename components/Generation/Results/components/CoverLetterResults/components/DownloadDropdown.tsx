import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
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
import { DownloadUtils } from "@/Utils/utils";
const { generatePDF, generateDOCX } = DownloadUtils;

const Container = styled(Grid)`
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20%",
`;

export default function DownloadDropdown() {
  const { state, toggleIsDownloadDropdownOpen } = useGenerationContext();

  const {
    saveName,
    isDownloadDropdownOpen,
    coverLetter,
    coverLetterParts,
    updateCoverLetterParts,
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

  const handlePDFDownload = async () => {
    let success = false;
    if (updateCoverLetterParts !== null) {
      success = await generatePDF(updateCoverLetterParts, saveName);
    } else {
      success = await generatePDF(coverLetterParts, saveName);
    }

    console.log("success", success);

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
      success = await generateDOCX(saveName, coverLetter);
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
