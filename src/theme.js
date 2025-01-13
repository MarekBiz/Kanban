import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1D1f26"
        },
        primary: {
            main: "#db8d1f"
        }
    },
    typography: {
        fontFamily: "Lato, sans-serif",
        button: {
            textTransform: 'unset',
            fontWeight: 700,
        }
    },
    shape: {
        borderRadius: 7,
    }
})

export default theme