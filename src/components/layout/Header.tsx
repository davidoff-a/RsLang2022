import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Logo from "./headerComponents/Logo";
import { UserMenu } from "./headerComponents/userMenu";
import MainMenu from "./headerComponents/MainMenu";


const Header = () =>{

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo/>
          <MainMenu/>
          <UserMenu/>
        </Toolbar>
      </Container>
    </AppBar>
  )
};
export default Header;