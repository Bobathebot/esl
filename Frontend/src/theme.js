// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0044ff',   // example brand color (blue)
    },
    secondary: {
      main: '#ff9900',   // example accent color (orange)
    },
    background: {
      default: '#f5f7fa', // light gray background
      paper: '#ffffff',   // paper background (for cards)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 'bold',
    },
    // You can further customize e.g. h4, h5, body1, etc.
  },
});

export default theme;
