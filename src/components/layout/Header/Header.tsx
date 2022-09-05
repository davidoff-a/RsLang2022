import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "./headerComponents/Logo";
import { UserMenu } from "./headerComponents/userMenu";
import MainMenu from "./headerComponents/MainMenu";

import "./_header.scss";
import { FormDialog } from "./headerComponents/RegForm";
import * as React from "react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [userAva, setUserAVA] = useState("");
  const handleUserAva = (userAvaLabel: string) => {
    setUserAVA(userAvaLabel);
  };

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <MainMenu />
          <UserMenu
            toggleModal={toggleModal}
            userAva={userAva}
            handleUserAva={handleUserAva}
          />
          <FormDialog
            toggleModal={toggleModal}
            open={open}
            handleUserAva={handleUserAva}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;