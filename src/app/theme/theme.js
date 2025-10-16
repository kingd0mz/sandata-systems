import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6eb1bdff",        // dark gray for top bar & main accents
      light: "#b5eeffff",
      dark: "#02272eff",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#26a69a"         // teal for highlights or charts (keeps freshness)
    },
    background: {
      default: "#f5f7fb",
      paper: "#ffffff"
    },
    text: {
      primary: "#212121",
      secondary: "#555555"
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "system-ui", "sans-serif"].join(","),
    button: {
      textTransform: "none", // keeps buttons professional (no all-caps)
      fontWeight: 600
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          backgroundImage: "none"
        }
      }
    }
  }
});

export default theme;
