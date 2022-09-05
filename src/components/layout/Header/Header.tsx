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
import StorageWrapper from "../../storageWrapper";

export const handleUserNameToAvatar = (str: string) =>
  str.substring(0, 1).toUpperCase();

export const getAvatar = (name: string) => {
  return name
    .split(" ")
    .map((namePart) => handleUserNameToAvatar(namePart))
    .join("");
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const storage = StorageWrapper.getInstance();
  const userName = storage.getSavedUserName();
  let initialAvatar = "";
  if (userName) initialAvatar = getAvatar(userName);
  const [userAva, setUserAVA] = useState(initialAvatar);
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
