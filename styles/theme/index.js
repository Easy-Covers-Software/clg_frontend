import { createTheme } from "@mui/material/styles";
import "@fontsource/el-messiri";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F5F5F5",
      nav: "#F8F8FF",
      white: "#fff",
      border_dark: "#006D4B",
      border_light: "#13d0b7",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
    },
    warning: {
      light: "#ffb74d",
      main: "#ffa726",
      dark: "#f57c00",
    },
    info: {
      light: "#4fc3f7",
      main: "#29b6f6",
      dark: "#0288d1",
    },
    success: {
      light: "#81c784",
      main: "#66bb6a",
      dark: "#388e3c",
    },
  },
  typography: {
    fontFamily: '"El Messiri", sans-serif',
    color: "#006D4B",
    h1: {
      fontSize: "1.4rem", // largest font size
    },
    h2: {
      fontSize: "1.33rem",
    },
    h3: {
      fontSize: "1.26rem",
    },
    h4: {
      fontSize: "1.19rem",
    },
    h5: {
      fontSize: "1.12rem",
    },
    h6: {
      fontSize: "1.05rem",
    },
    body1: {
      fontSize: "0.98rem",
    },
    body2: {
      fontSize: "0.91rem",
    },
    subtitle1: {
      fontSize: "0.84rem",
    },
    subtitle2: {
      fontSize: "0.77rem",
    },
    button: {
      fontSize: "0.7rem",
    },
    caption: {
      fontSize: "0.63rem",
    },
    overline: {
      fontSize: "0.5rem",
    },
    profileEmail: {
      fontSize: "1.25rem",
      letterSpacing: "0.05rem",
      textAlign: "center",
    },
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
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
  },
});

export default theme;
