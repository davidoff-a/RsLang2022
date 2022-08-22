import { PaletteMode } from "@mui/material";
import { cyan, grey } from "@mui/material/colors";

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        primary: cyan,
        divider: cyan[200],
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
      }
      : {
        primary: grey,
        divider: grey[700],
        background: {
          default: grey[900],
          paper: grey[900],
        },
        text: {
          primary: "#fff",
          secondary: grey[500],
        },
      }),
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
});


