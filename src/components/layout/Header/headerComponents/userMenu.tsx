import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MouseEvent, useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../../../app/App";
// import RegForm from "./RegForm";

export function UserMenu({ toggleModal }: { toggleModal: () => void }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // const handleOpen = () => setOpen(true);

  const handleUserMenuItem = () => {
    // const target = e.target as HTMLElement;
    toggleModal();
    handleCloseUserMenu();
  };

  const settings = ["Profile", "Dashboard", "Logout"];
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const menuItemData: string[] = localStorage.getItem("utoken")
    ? settings
    : ["Log In"];

  const addMenuItems = (menuItems: string[]) => {
    return menuItems.map((item, index) => (
      <MenuItem key={index} data-item={item} onClick={handleUserMenuItem}>
        <Typography textAlign="center">{item}</Typography>
      </MenuItem>
    ));
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {addMenuItems(menuItemData)}
      </Menu>
    </Box>
  );
}