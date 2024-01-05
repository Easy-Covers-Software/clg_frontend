import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { IconButton, useMediaQuery, SwipeableDrawer, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import Sidebar from '../Sidebar/Sidebar';

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
  const isTablet = useMediaQuery('(max-width: 1100px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  console.log('isTablet', isTablet);

  const list = (
    <Box
      sx={{ width: 250, height: 'calc(100vh - 180px)' }}
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
              color: '#006d4b',
            }}
          >
            <MenuIcon
              style={{
                color: '#13d0b7',
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
