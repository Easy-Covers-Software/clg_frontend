import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Sidebar from "../Sidebar/Sidebar";

const Logo = styled.img`
  height: 75px;
  width: 75px;
  margin-right: 1%;

  @media screen and (min-width: 0px) and (max-width: 500px) {
    height: 50px;
    width: 50px;
  }
  @media screen and (min-width: 500px) and (max-width: 600px) {
    height: 56px;
    width: 56px;
  }
  @media screen and (min-width: 600px) and (max-width: 700px) {
    height: 60px;
    width: 60px;
  }
  @media screen and (min-width: 700px) and (max-width: 800px) {
    height: 64px;
    width: 64px;
  }
  @media screen and (min-width: 800px) and (max-width: 900px) {
    height: 68px;
    width: 68px;
  }
`;

const HeaderContainer = styled(Grid)`
  display: none;
  width: 100%;
  margin-left: 1%;
  @media screen and (max-width: 1100px) {
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    padding: 10px;
  }
`;

export default function Header() {
  const theme = useTheme();
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  console.log("isTablet", isTablet);

  const list = (
    <Box
      sx={{ width: 250, height: "calc(100vh - 180px)" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Sidebar />
    </Box>
  );

  return (
    <>
      {isTablet && (
        <HeaderContainer>
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{
              color: "#006d4b",
            }}
          >
            <MenuIcon
              style={{
                color: "#13d0b7",
              }}
            />
          </IconButton>
        </HeaderContainer>
      )}
      <SwipeableDrawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>

      <Logo src="/easy-covers-logo.svg" alt="Description of Image" />
    </>
  );
}
