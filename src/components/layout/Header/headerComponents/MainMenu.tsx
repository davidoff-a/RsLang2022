import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { MouseEvent, useState } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";

export default function MainMenu() {
  const pages = ["Textbook", "Games", "About", "Team"];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const menuItems = pages.map((page) => (
    <MenuItem
      key={page}
      onClick={handleCloseNavMenu}
      component={Link}
      to={`/${page.toLowerCase()}`}
    >
      <Typography textAlign="center">{page}</Typography>
    </MenuItem>
  ));

  const mainMenuItems = (data: string[]) => {
    return pages.map((page) => (
      <Button
        key={page}
        onClick={handleCloseNavMenu}
        sx={{
          my: 2,
          fontFamily: "Roboto",
          fontWeight: 700,
          fontSize: "1.4rem",
          color: "white",
          display: "block",
        }}
        component={Link}
        to={`/${page.toLowerCase()}`}
      >
        {page}
      </Button>
    ));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {menuItems}
        </Menu>
      </Box>
      <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "Roboto",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: { xs: "none", md: "flex" },
        }}
      >
        {mainMenuItems(pages)}
      </Box>
    </>
  );
}