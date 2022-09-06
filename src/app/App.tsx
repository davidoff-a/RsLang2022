import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createContext, useMemo, useState } from "react";

import { createTheme, PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import {AboutPage} from "../pages/AboutPage";
import {ErrorPage} from "../pages/ErrorPage";
import {TextbookPage} from "../pages/textbook/TextbookPage";
import {GamesPage} from "../pages/GamesPage";
import {GamePage} from "../pages/GamePage";
import { getTheme } from "../shared/getTheme";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header></Header>
          <Routes>
            <Route path="/" element={<TextbookPage />} />
            <Route path="textbook" element={<TextbookPage />} />
            <Route path="games" element={<GamesPage />}>
              <Route path=":gameId" element={<GamePage />} />
            </Route>
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer></Footer>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}
