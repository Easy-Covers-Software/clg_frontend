import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Tooltip } from "@mui/material";

import { useCoverLetterResultsContext } from "@/context/ResultsContext";
import { useAuth } from "@/context/AuthContext";

import { DownloadOptionsMenuStyledComponents } from "../CoverLetterResults.styles";
const { Container } = DownloadOptionsMenuStyledComponents;

export default function DownloadOptionsMenu() {
  const { saveCoverLetterResults, generatePDF, generateDOCX } =
    useCoverLetterResultsContext();
  const { updateSnackbar } = useAuth();

  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const openDownload = Boolean(downloadMenuAnchor);

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };
  const handleDownloadPDF = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };
  const handleDownloadDOCX = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };
  const handleCloseDownload = () => {
    setDownloadMenuAnchor(null);
  };

  const handleSave = async () => {
    const response = await saveCoverLetterResults();
    if (response.status === 200) {
      updateSnackbar(true, "success", "Cover Letter Saved Successfully");
    } else {
      updateSnackbar(true, "error", `Error saving cover letter: ${response}`);
    }
  };

  return (
    <>
      <Container>
        <Tooltip title="Save">
          <IconButton
            onClick={handleSave}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 20%",
            }}
          >
            <SaveOutlinedIcon sx={{ fontSize: "1.7rem" }} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />
        <Tooltip title="Download">
          <IconButton onClick={handleDownload} sx={{ padding: "0 20%" }}>
            <DownloadForOfflineOutlinedIcon sx={{ fontSize: "1.7rem" }} />
          </IconButton>
        </Tooltip>
      </Container>

      <Menu
        id="basic-menu"
        anchorEl={downloadMenuAnchor}
        open={openDownload}
        onClose={handleCloseDownload}
        MenuListProps={{
          "aria-labelledby": "basic-button",
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
