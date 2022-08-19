import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "./headerComponents/Logo";
import { UserMenu } from "./headerComponents/userMenu";
import MainMenu from "./headerComponents/MainMenu";

import "./_header.scss";
import RegForm from "./headerComponents/RegForm";
// import { useState } from "React";
// import { MouseEvent } from "React";
import * as React from "react";

// export interface regFormCb {
//   opened: (e: MouseEvent) => void;
// }

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggleModal = () => {
    setOpen((open) => !open);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <MainMenu />
          <UserMenu toggleModal={toggleModal} />
          <RegForm toggleModal={toggleModal} open={open} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;