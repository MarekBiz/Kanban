import { AppBar, Toolbar, Stack, IconButton, Typography } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";

function BoardTopbar() {
  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: "5px solid",
        borderColor: "white",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1} alignItems="center" direction="row">
          <IconButton>
            <BackIcon />
          </IconButton>
          <Typography variant="h6">Board name</Typography>
        </Stack>
        <Stack spacing={2} alignItems="center" direction="row">
          <Typography variant="body2">
            Last updatego 5/5/5/5/5 /5/5/5/5
          </Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default BoardTopbar;
