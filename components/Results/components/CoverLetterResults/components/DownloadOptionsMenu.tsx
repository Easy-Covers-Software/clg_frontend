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

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

const Container = styled(Grid)`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 55%;
  border: 1px solid #006d4b;
  background-color: #f5f5f5;
  border-radius: 4px;
  width: 100%;
  margin: 0;
`;

export default function DownloadOptionsMenu() {
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

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {};

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
        <MenuItem onClick={handleCloseDownload} disableRipple>
          <ListItemIcon>
            <PictureAsPdfOutlinedIcon />
          </ListItemIcon>
          <ListItemText> Download as PDF</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleCloseDownload} disableRipple>
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Download as DOCX</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
