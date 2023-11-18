import { createTheme } from '@mui/material/styles';
import '@fontsource/el-messiri';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5F5F5',
      nav: '#F8F8FF',
      white: '#fff',
      border_dark: '#006D4B',
      border_light: '#13d0b7',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00',
    },
    info: {
      light: '#4fc3f7',
      main: '#29b6f6',
      dark: '#0288d1',
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#388e3c',
    },
  },
  typography: {
    fontFamily: '"El Messiri", sans-serif',
    color: '#006D4B',
    spacing: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
});

export default theme;
