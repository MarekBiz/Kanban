import { Grid, Stack, Typography, IconButton, Icon } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";

const BoardTab = () => {
  return (
    <Grid item xs={4}>
          <Stack p={3} bgcolor="#000">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontWeight={400} variant="h6">
                Todos
              </Typography>
              <IconButton>
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
  )
}

export default BoardTab