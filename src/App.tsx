// import logo from "./logo.svg";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Link from "@mui/material/Link";
// import ProTip from "./ProTip";
import "./App.scss";
import Main from "./Games/sprint/Main";
// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}.
//     </Typography>
//   );
// }
function App() {
  return (
    <div>
      <Main />
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <Button variant="contained">Hello World</Button>
    //   </header>
    //   <Container maxWidth="sm">
    //     <Box sx={{my: 4}}>
    //       <Typography variant="h4" component="h1" gutterBottom>
    //         Create React App example with styled-components and TypeScript
    //       </Typography>
    //       <ProTip />
    //       <Copyright />
    //     </Box>
    //   </Container>
    // </div>
  );
}

export default App;
