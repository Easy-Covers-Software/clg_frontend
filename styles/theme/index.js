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
    accessStats: {
      fontSize: "1rem",
      color: "#006D4B",
    },
    personalDetailsSwitch: {
      fontSize: "1rem",
      letterSpacing: "0.05rem",
      color: "#006D4B",
    },
    profileEmail: {
      fontSize: "1.25rem",
      letterSpacing: "0.095rem",
      textAlign: "center",
      width: "100%",
      color: "#006D4B",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      margin: "0 auto",
      paddingLeft: "1%",
    },
    additionalDetailsInfo: {
      fontSize: "0.85rem",
      // margin: "auto",
      textAlign: "center",
      color: "#006D4B",
      letterSpacing: "0.05rem",
      paddingLeft: "3%",
      paddingRight: "3%",
      whiteSpace: "nowrap",
    },
    additionalDetailsAnythingElse: {
      fontSize: "1.1rem",
      color: "#006D4B",
      letterSpacing: "0.03rem",
      marginLeft: "1%",
      marginBottom: "-2%",
    },
    customAdjustmentHeading: {
      fontSize: "0.95rem",
      color: "#006D4B",
      letterSpacing: "0.05rem",
      marginLeft: "1%",
      marginBottom: "-5%",
    },
    mediumRequeryLabel: {
      fontSize: "0.9rem",
      color: "#006D4B",
      letterSpacing: "0.05rem",
      marginTop: "0.5%",
    },
    simpleAdjustmentLabel: {
      fontSize: "0.85rem",
      color: "#006D4B",
      letterSpacing: "0.05rem",
      marginBottom: "0.5%",
    },
    jobSummaryTitle: {
      fontSize: "1.25rem",
      color: "#006D4B",
      letterSpacing: "0.08rem",
      paddingLeft: "5%",
      paddingTop: "1.5%",
    },
    jobSummaryCompany: {
      fontSize: "1.1rem",
      color: "#006D4B",
      letterSpacing: "0.05rem",
      paddingLeft: "5%",
      paddingBottom: "2.8%",
    },
    jobSummaryMatchScoreHeader: {
      fontSize: "1.1rem",
      color: "#006D4B",
      letterSpacing: "0.05rem",
      marginTop: "3%",
      whiteSpace: "nowrap",
    },
    jobSummaryMatchScore: {
      fontSize: "2.2rem",
      color: "#006D4B",
      marginTop: "3%",
    },
    accordionHeader: {
      fontSize: "1rem",
      color: "#006D4B",
      letterSpacing: "0.08rem",
      paddingTop: "0.5%",
      marginLeft: "1%",
    },
    useLastResume: {
      fontSize: "1.1rem",
      whiteSpace: "nowrap",
      color: "#006D4B",
    },
    dragDrop: {
      fontSize: "1.05rem",
      color: "#006D4B",
      display: "flex",
    },
    homeHeader: {
      marginTop: "-5%",
    },
    homeSubHeader: {
      textAlign: "center",
      marginTop: "1%",
      marginBottom: "5%",
    },
    savedHeader: {
      fontSize: "1.25rem",
      color: "#006D4B",
      textAlign: "center",
    },
    alertDialogButton: {
      color: "#006D4B",
      letterSpacing: "0.05rem",
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
