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

import { useGenerationContext } from "@/context/GenerationContext";
import { useAuth } from "@/context/AuthContext";

import SaveNameInput from "./SaveNameInput";
import DownloadDropdown from "./DownloadDropdown";
import { DownloadOptionsMenuStyledComponents } from "../CoverLetterResults.styles";
const { Container } = DownloadOptionsMenuStyledComponents;

export default function DownloadOptionsMenu() {
  const { saveCoverLetterResults, generatePDF, generateDOCX } =
    useGenerationContext();
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

  // const handleSave = async () => {
  //   const response = await saveCoverLetterResults();
  //   if (response.status === 200) {
  //     updateSnackbar(true, "success", "Cover Letter Saved Successfully");
  //   } else {
  //     updateSnackbar(true, "error", `Error saving cover letter: ${response}`);
  //   }
  // };

  return (
    <Container>
      <SaveNameInput />

      <Divider orientation="vertical" flexItem />
      <DownloadDropdown />
    </Container>
  );
}
