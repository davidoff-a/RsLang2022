import { PaletteMode } from '@mui/material';
import { cyan, grey } from '@mui/material/colors';

export const getTheme = (mode: PaletteMode) => {
  const lightTheme = {
    primary: cyan,
    divider: cyan[200],
    text: {
      primary: grey[900],
      secondary: grey[800],
    },
  };
  const darkTheme = {
    primary: grey,
    divider: grey[700],
    background: {
      default: grey[900],
      paper: grey[900],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },
  };
  return {
    palette: {
      mode,
      ...(mode === 'light' ? lightTheme : darkTheme),
    },
    typography: {
      fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
    },
  };
};
