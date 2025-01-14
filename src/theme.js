import { createTheme } from "@mui/material";

export const colors = [
  "#F49DDD",
  "#FFD166",
  "#ff9939",
  "#E85A4F",
  "#8ABEB7",
  "#247BA0",
];

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1D1f26",
    },
    primary: {
      main: "#db8d1f",
    },
  },
  components: {
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          fontWeight: 600,
          textTransform: "capitalize",
        },
      },
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 7,
  },
});

export default theme;
